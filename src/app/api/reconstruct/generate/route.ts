import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import {
  chatCompletion,
  extractCode,
  extractJsonObject,
  openRouterConfigured,
  openRouterModel,
} from "@/lib/ai/openrouter";

export const maxDuration = 60;

type GenerateBody = {
  name?: string;
  repositoryUrl?: string;
  branch?: string;
  presetKey?: string;
  screenshots?: Array<{ name?: string; dimensions?: string; url?: string }>;
};

function normalizeFiles(input: unknown, fallbackCode?: string) {
  const files: Record<string, string> = {};

  if (input && typeof input === "object") {
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      if (typeof value !== "string" || !value.trim()) continue;
      const path = key.startsWith("/") ? key : `/${key}`;
      files[path] = value;
    }
  }

  if (!files["/App.tsx"] && fallbackCode) {
    files["/App.tsx"] = fallbackCode;
  }

  return files;
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  if (!openRouterConfigured()) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is missing.", fallback: true },
      { status: 503 }
    );
  }

  const body = (await request.json()) as GenerateBody;
  const screenshots = (body.screenshots || [])
    .map((shot, index) => {
      const url = shot.url?.startsWith("http") ? shot.url : undefined;
      return `- ${shot.name || `screenshot-${index + 1}`} (${shot.dimensions || "unknown size"})${url ? ` ${url}` : ""}`;
    })
    .join("\n");

  const system = `You are Repliq, an expert UI reconstruction engine.
Return ONLY valid JSON with this shape:
{
  "files": { "/App.tsx": "full react component source" },
  "detectedTokens": {
    "theme": "string",
    "layout": "string",
    "colors": { "bg": "#050505", "panel": "#101012", "accent": "#8B5CF6", "text": "#F5F5F5" },
    "components_detected": ["string"]
  }
}
Rules for /App.tsx:
- Default export a single React function component
- Use react and lucide-react only
- Use Tailwind utility classes
- Dark cinematic UI, cream/white accents allowed
- Keep the page complete but compact (under 250 lines)
- Return raw JSON only. Do not wrap it in markdown.`;

  const userPrompt = `Reconstruct this interface.
Project: ${body.name || "Untitled"}
Repository: ${body.repositoryUrl || "unknown"} @ ${body.branch || "main"}
Preset: ${body.presetKey || "custom"}
Screenshots:
${screenshots || "- none provided"}

Model: ${openRouterModel()}`;

  try {
    const content = await chatCompletion(
      [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      4096
    );

    let files: Record<string, string> = {};
    let detectedTokens: Record<string, unknown> = {};

    try {
      const parsed = extractJsonObject(content);
      files = normalizeFiles(parsed.files, undefined);
      if (parsed.detectedTokens && typeof parsed.detectedTokens === "object") {
        detectedTokens = parsed.detectedTokens as Record<string, unknown>;
      }
    } catch {
      files = normalizeFiles(undefined, extractCode(content));
    }

    if (!files["/App.tsx"]) {
      return NextResponse.json(
        { error: "Model did not return /App.tsx", fallback: true },
        { status: 502 }
      );
    }

    return NextResponse.json({
      files,
      detectedTokens,
      model: openRouterModel(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("[reconstruct/generate]", message);
    return NextResponse.json({ error: message, fallback: true }, { status: 502 });
  }
}

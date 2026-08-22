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

type EditBody = {
  prompt?: string;
  files?: Record<string, string>;
  activeFile?: string;
};

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  if (!openRouterConfigured()) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is missing." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as EditBody;
  const prompt = body.prompt?.trim();
  const files = body.files || {};
  const activeFile = body.activeFile && files[body.activeFile] ? body.activeFile : "/App.tsx";
  const source = files[activeFile];

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }
  if (!source) {
    return NextResponse.json({ error: "No source file to edit." }, { status: 400 });
  }

  const system = `You are Repliq's reconstruction editor.
Apply the user's instruction to the React + Tailwind source.
Return ONLY JSON: { "files": { "${activeFile}": "full updated source" } }
Keep lucide-react and Tailwind. Do not add other dependencies.`;

  try {
    const content = await chatCompletion(
      [
        { role: "system", content: system },
        {
          role: "user",
          content: `Instruction:\n${prompt}\n\nCurrent ${activeFile}:\n\`\`\`tsx\n${source}\n\`\`\``,
        },
      ],
      4096
    );

    let nextFiles = { ...files };

    try {
      const parsed = extractJsonObject(content);
      const parsedFiles = parsed.files;
      if (parsedFiles && typeof parsedFiles === "object") {
        for (const [key, value] of Object.entries(parsedFiles as Record<string, unknown>)) {
          if (typeof value === "string" && value.trim()) {
            const path = key.startsWith("/") ? key : `/${key}`;
            nextFiles[path] = value;
          }
        }
      }
    } catch {
      nextFiles[activeFile] = extractCode(content);
    }

    if (!nextFiles[activeFile]) {
      return NextResponse.json({ error: "Model did not return updated source." }, { status: 502 });
    }

    return NextResponse.json({ files: nextFiles, model: openRouterModel() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Edit failed";
    console.error("[reconstruct/edit]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

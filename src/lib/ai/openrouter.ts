const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export function openRouterConfigured() {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export function openRouterModel() {
  return process.env.OPENROUTER_MODEL || "qwen/qwen3-coder";
}

export function openRouterFallbackModel() {
  const primary = openRouterModel();
  if (primary.endsWith(":free")) return primary;
  if (primary === "qwen/qwen3-coder") return "qwen/qwen3-coder:free";
  return `${primary}:free`;
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterError = {
  message?: string;
  code?: number | string;
  metadata?: { raw?: string; provider_name?: string };
};

type OpenRouterPayload = {
  error?: OpenRouterError | string;
  choices?: Array<{
    finish_reason?: string;
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
};

function payloadErrorMessage(payload: OpenRouterPayload, status: number) {
  const err = payload.error;
  if (typeof err === "string" && err.trim()) return err;
  if (err && typeof err === "object") {
    const parts = [err.message, err.metadata?.raw].filter(Boolean);
    if (parts.length) return parts.join(" — ");
  }
  return `OpenRouter request failed (${status})`;
}

function choiceContent(payload: OpenRouterPayload) {
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part.text || ""))
      .join("")
      .trim();
  }
  return "";
}

async function requestCompletion(model: string, messages: ChatMessage[], maxTokens: number) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "Repliq AI",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.25,
      max_tokens: maxTokens,
    }),
  });

  let payload: OpenRouterPayload;
  try {
    payload = (await res.json()) as OpenRouterPayload;
  } catch {
    throw new Error(`OpenRouter returned a non-JSON response (${res.status})`);
  }

  if (!res.ok || payload.error) {
    const error = new Error(payloadErrorMessage(payload, res.status)) as Error & {
      status?: number;
      code?: number | string;
    };
    error.status = res.status;
    error.code = typeof payload.error === "object" ? payload.error.code : res.status;
    throw error;
  }

  const content = choiceContent(payload);
  if (!content) {
    throw new Error("OpenRouter returned an empty response");
  }

  return content;
}

export async function chatCompletion(messages: ChatMessage[], maxTokens = 4096) {
  const primary = openRouterModel();
  try {
    return await requestCompletion(primary, messages, maxTokens);
  } catch (error) {
    const status = (error as { status?: number; code?: number | string }).status;
    const code = (error as { code?: number | string }).code;
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    const fallback = openRouterFallbackModel();
    const shouldRetryFree =
      fallback !== primary &&
      (status === 402 ||
        code === 402 ||
        status === 403 ||
        message.includes("credit") ||
        message.includes("afford") ||
        message.includes("can only afford"));

    if (!shouldRetryFree) throw error;

    console.warn(`[openrouter] ${primary} failed (${status}). Retrying ${fallback}`);
    return await requestCompletion(fallback, messages, maxTokens);
  }
}

export function extractJsonObject(text: string): Record<string, unknown> {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced?.[1] ?? text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Model did not return JSON");
  }
  return JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
}

export function extractCode(text: string) {
  const fenced = text.match(/```(?:tsx|jsx|ts|js)?\s*([\s\S]*?)```/i);
  return (fenced?.[1] ?? text).trim();
}

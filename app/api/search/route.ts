import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import type { Classification, SearchRequest, SearchResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return text.trim();
}

export async function POST(req: NextRequest): Promise<NextResponse<SearchResponse>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  let body: SearchRequest;
  try {
    body = (await req.json()) as SearchRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const query = (body.query || "").trim();
  const countries = (body.countries || []).filter(Boolean);
  const locale = body.locale === "en" ? "en" : "ko";

  if (!query) {
    return NextResponse.json({ ok: false, error: "제품 설명을 입력해 주세요." }, { status: 400 });
  }
  if (countries.length === 0) {
    return NextResponse.json({ ok: false, error: "비교할 국가를 한 곳 이상 선택해 주세요." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const startedAt = Date.now();

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserPrompt(query, countries, locale) }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock && textBlock.type === "text" ? textBlock.text : "";
    const jsonText = extractJson(raw);

    let parsed: Classification;
    try {
      parsed = JSON.parse(jsonText) as Classification;
    } catch {
      return NextResponse.json(
        { ok: false, error: "AI 응답을 해석하지 못했습니다. 다시 시도해 주세요." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      result: parsed,
      model: MODEL,
      latencyMs: Date.now() - startedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

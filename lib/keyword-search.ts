import { HS_DB, type HsEntry } from "./hs-database";
import { COUNTRIES, getCountry } from "./countries";
import type { Classification } from "./types";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s\-_/().,]+/g, " ")
    .trim();
}

function tokenize(s: string): string[] {
  const norm = normalize(s);
  // 한글은 공백 기준 + 2~5자 슬라이딩 윈도우(부분 일치 보강)
  const parts = norm.split(/\s+/).filter(Boolean);
  const grams: string[] = [];
  for (const p of parts) {
    grams.push(p);
    if (/[가-힣]/.test(p) && p.length >= 2) {
      for (let len = 2; len <= Math.min(p.length, 5); len++) {
        for (let i = 0; i + len <= p.length; i++) grams.push(p.slice(i, i + len));
      }
    }
  }
  return Array.from(new Set(grams));
}

function score(entry: HsEntry, queryTokens: string[]): number {
  const haystack = [
    ...entry.keywords.map(normalize),
    ...entry.keywordsKo,
    normalize(entry.title),
    entry.titleKo,
  ];
  let s = 0;
  for (const t of queryTokens) {
    if (!t) continue;
    for (const h of haystack) {
      if (!h) continue;
      if (h === t) s += 5;                  // 정확 일치
      else if (h.includes(t)) s += 2;       // 부분 일치
      else if (t.length >= 3 && t.includes(h)) s += 1;
    }
  }
  return s;
}

function padNationalCode(hs6: string, digits: number): string {
  if (digits <= 6) return hs6.slice(0, digits);
  return hs6 + "0".repeat(digits - 6);
}

export function keywordSearch(
  query: string,
  countries: string[],
  locale: "ko" | "en",
): Classification {
  const tokens = tokenize(query);
  const ranked = HS_DB
    .map((e) => ({ e, s: score(e, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  const isKo = locale === "ko";

  if (ranked.length === 0) {
    return {
      primary: {
        hs6: "—",
        title: isKo ? "일치하는 항목 없음" : "No match",
        description: isKo
          ? "내장 사전에서 일치하는 HS 코드를 찾지 못했습니다. 키워드를 바꾸거나, 환경변수 ANTHROPIC_API_KEY 를 설정하면 AI 분류로 전환됩니다."
          : "No entry matched. Try different keywords, or set ANTHROPIC_API_KEY to enable AI classification.",
        section: "—",
        chapter: "—",
        heading: "—",
        subheading: "—",
        confidence: 0,
      },
      rationale: isKo
        ? "내장 사전(약 50개 대표 품목) 기반 키워드 매칭 결과입니다."
        : "Result from built-in keyword database (~50 common items).",
      alternates: [],
      national: countries.map((c) => ({
        country: c.toUpperCase(),
        code: "—",
        title: "—",
        notes: isKo ? "AI 모드에서만 제공" : "Available in AI mode",
      })),
      warnings: [
        isKo
          ? "이 결과는 키 없이 동작하는 빠른 사전 검색입니다. 정확도는 AI 모드보다 낮습니다."
          : "Quick dictionary search (no AI). Accuracy is lower than AI mode.",
      ],
    };
  }

  const top = ranked[0].e;
  const topScore = ranked[0].s;
  const altList = ranked.slice(1, 4).map((r) => ({
    hs6: r.e.hs6,
    title: isKo ? r.e.titleKo : r.e.title,
    reason: isKo
      ? `유사 키워드 점수 ${r.s}`
      : `Similar-keyword score ${r.s}`,
  }));

  const confidence = Math.min(0.85, 0.35 + topScore * 0.06);

  const national = countries.map((c) => {
    const cc = c.toUpperCase();
    const meta = getCountry(cc) ?? COUNTRIES[0];
    return {
      country: cc,
      code: padNationalCode(top.hs6, meta.digits),
      title: isKo ? top.titleKo : top.title,
      notes: isKo
        ? `${meta.schedule} 자릿수에 맞춰 6자리 + 0 패딩한 근사값. 정확한 세번은 ${meta.authority} 사이트에서 확인 필요.`
        : `Approximate: 6-digit padded with zeros to match ${meta.schedule}. Verify with ${meta.authority}.`,
    };
  });

  return {
    primary: {
      hs6: top.hs6,
      title: isKo ? top.titleKo : top.title,
      description: isKo
        ? `${top.section}, 류 ${top.chapter}. 입력하신 키워드(${tokens.slice(0, 5).join(", ")})와 가장 잘 매칭된 품목입니다.`
        : `${top.section}, Chapter ${top.chapter}. Best match for tokens: ${tokens.slice(0, 5).join(", ")}.`,
      section: top.section,
      chapter: top.chapter,
      heading: top.hs6.slice(0, 4),
      subheading: top.hs6,
      confidence,
    },
    rationale: isKo
      ? "내장 HS 사전의 한·영 키워드와 입력 단어를 비교해 가장 높은 점수를 받은 항목을 선택했습니다 (GIR 1 적용). 국가별 코드는 6자리에 0 패딩한 근사값입니다."
      : "Selected the entry with the highest keyword overlap from the built-in dictionary (GIR 1). National codes are 6-digit zero-padded approximations.",
    alternates: altList,
    national,
    warnings: [
      isKo
        ? "AI 키 없이 동작하는 빠른 사전 검색입니다. 통관 신고 전 반드시 관세 당국 또는 관세사 확인 필요."
        : "Dictionary-only search without AI. Confirm with customs authority before declaration.",
    ],
  };
}

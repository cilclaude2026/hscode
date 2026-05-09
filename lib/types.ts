export type ClassificationPrimary = {
  hs6: string;
  title: string;
  description: string;
  section: string;
  chapter: string;
  heading: string;
  subheading: string;
  confidence: number;
};

export type ClassificationAlternate = {
  hs6: string;
  title: string;
  reason: string;
};

export type NationalCode = {
  country: string;
  code: string;
  title: string;
  notes: string;
};

export type Classification = {
  primary: ClassificationPrimary;
  rationale: string;
  alternates: ClassificationAlternate[];
  national: NationalCode[];
  warnings: string[];
};

export type SearchRequest = {
  query: string;
  countries: string[];
  locale: "ko" | "en";
};

export type SearchResponse =
  | { ok: true; result: Classification; model: string; latencyMs: number }
  | { ok: false; error: string };

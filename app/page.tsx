"use client";

import { useMemo, useState } from "react";
import { COUNTRIES, getCountry } from "@/lib/countries";
import { dict, EXAMPLE_QUERIES, type Locale } from "@/lib/i18n";
import type { Classification, SearchResponse } from "@/lib/types";

const DEFAULT_COUNTRIES = ["KR", "US", "CN", "JP", "EU"];

export default function Page() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(DEFAULT_COUNTRIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Classification | null>(null);
  const [meta, setMeta] = useState<{ model: string; latencyMs: number } | null>(null);

  const t = dict[locale];

  const canSubmit = useMemo(
    () => query.trim().length > 0 && selected.length > 0 && !loading,
    [query, selected.length, loading],
  );

  function toggleCountry(code: string) {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setMeta(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query, countries: selected, locale }),
      });
      const data = (await res.json()) as SearchResponse;
      if (!data.ok) {
        setError(data.error);
      } else {
        setResult(data.result);
        setMeta({ model: data.model, latencyMs: data.latencyMs });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t.poweredBy}
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              🌐 {t.appTitle}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              {t.appSubtitle}
            </p>
          </div>
          <button
            onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
          >
            {t.languageToggle}
          </button>
        </header>

        <section className="glass rounded-2xl p-5 md:p-6">
          <form onSubmit={onSearch} className="space-y-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              rows={3}
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/40 p-4 text-base text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-200">
                  {t.countriesLabel}{" "}
                  <span className="text-slate-400">({selected.length})</span>
                </label>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelected(COUNTRIES.map((c) => c.code))}
                    className="rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/10"
                  >
                    {t.selectAll}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/10"
                  >
                    {t.clearAll}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => {
                  const active = selected.includes(c.code);
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => toggleCountry(c.code)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                        active
                          ? "border-brand-500 bg-brand-500/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{locale === "ko" ? c.nameKo : c.name}</span>
                      <span className="text-xs text-slate-400">{t.digits(c.digits)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400">{t.examples}:</span>
                {EXAMPLE_QUERIES.map((ex) => (
                  <button
                    key={ex.en}
                    type="button"
                    onClick={() => setQuery(locale === "ko" ? ex.ko : ex.en)}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 hover:bg-white/10"
                  >
                    {locale === "ko" ? ex.ko : ex.en}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? t.searching : `🔎 ${t.searchButton}`}
              </button>
            </div>
          </form>
        </section>

        {!result && !loading && !error && (
          <p className="mt-6 text-center text-sm text-slate-400">{t.emptyState}</p>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            <strong className="mr-2">{t.error}:</strong>
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 flex items-center justify-center gap-3 text-slate-300">
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-brand-500" />
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-brand-500 [animation-delay:120ms]" />
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-brand-500 [animation-delay:240ms]" />
            <span className="ml-2 text-sm">{t.searching}</span>
          </div>
        )}

        {result && (
          <ResultView result={result} locale={locale} meta={meta} />
        )}

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          HS 2022 · WCO {locale === "ko" ? "기준" : "based"} · {t.poweredBy}
        </footer>
      </div>
    </main>
  );
}

function ResultView({
  result,
  locale,
  meta,
}: {
  result: Classification;
  locale: Locale;
  meta: { model: string; latencyMs: number } | null;
}) {
  const t = dict[locale];
  const confidencePct = Math.round((result.primary.confidence ?? 0) * 100);

  return (
    <section className="mt-8 space-y-5">
      <div className="glass rounded-2xl p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">{t.resultsTitle}</h2>
          {meta && (
            <span className="text-xs text-slate-400">
              {meta.model.includes("builtin") ? "📚 사전 모드" : `🤖 ${meta.model}`} · {meta.latencyMs}ms
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <span className="code-pill rounded-lg bg-brand-600/20 px-3 py-2 text-2xl font-bold text-brand-100">
            {result.primary.hs6}
          </span>
          <span className="text-lg text-white">{result.primary.title}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-200">
          {result.primary.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Field label={t.chapter} value={result.primary.chapter} />
          <Field label={t.heading} value={result.primary.heading} />
          <Field label={t.subheading} value={result.primary.subheading} />
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-slate-400">{t.confidence}</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${confidencePct}%` }}
                />
              </div>
              <span className="text-sm font-medium text-white">{confidencePct}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <div className="text-xs uppercase tracking-wider text-slate-400">{t.rationale}</div>
          <p className="mt-1 text-sm text-slate-200">{result.rationale}</p>
        </div>

        {result.warnings?.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-amber-300">
            {result.warnings.map((w, i) => (
              <li key={i}>⚠ {w}</li>
            ))}
          </ul>
        )}
      </div>

      {result.national?.length > 0 && (
        <div className="glass rounded-2xl p-5 md:p-6">
          <h3 className="mb-4 text-base font-semibold text-white">{t.nationalCodes}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-2">Country</th>
                  <th className="py-2">Code</th>
                  <th className="py-2">{locale === "ko" ? "품명" : "Title"}</th>
                  <th className="py-2">{locale === "ko" ? "비고" : "Notes"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {result.national.map((n) => {
                  const meta = getCountry(n.country);
                  return (
                    <tr key={n.country} className="align-top">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{meta?.flag ?? "🏳"}</span>
                          <div>
                            <div className="text-white">
                              {locale === "ko" ? meta?.nameKo : meta?.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {meta?.schedule}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="code-pill rounded-md bg-white/5 px-2 py-1 text-white">
                          {n.code || "—"}
                        </span>
                      </td>
                      <td className="py-3 text-slate-200">{n.title || "—"}</td>
                      <td className="py-3 text-slate-300">{n.notes || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result.alternates?.length > 0 && (
        <div className="glass rounded-2xl p-5 md:p-6">
          <h3 className="mb-3 text-base font-semibold text-white">{t.alternates}</h3>
          <ul className="space-y-2">
            {result.alternates.map((a, i) => (
              <li
                key={i}
                className="flex flex-wrap items-baseline gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3"
              >
                <span className="code-pill rounded bg-white/10 px-2 py-1 text-sm text-white">
                  {a.hs6}
                </span>
                <span className="text-sm text-slate-100">{a.title}</span>
                <span className="text-xs text-slate-400">— {a.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="code-pill mt-1 text-sm text-white">{value || "—"}</div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Contribution, ContributionKind } from "@/lib/github";

const filters = [
  ["merged", "Merged PRs"],
  ["open", "Open PRs"],
  ["issues", "Open issues"],
] as const;

export default function ContributionsList({ items, totals }: {
  items: Contribution[];
  totals: Record<ContributionKind, number | null>;
}) {
  const [filter, setFilter] = useState<ContributionKind>("merged");
  const [limit, setLimit] = useState(10);
  const filtered = items.filter((item) => item.kind === filter);

  return (
    <section aria-label="Contribution activity">
      <div className="contrib-filters" role="group" aria-label="Filter contributions">
        {filters.map(([value, label]) => (
          <button key={value} type="button" data-kind={value} aria-pressed={filter === value} aria-controls="contribution-results"
            onClick={() => { setFilter(value); setLimit(10); }}>
            {label} <span>{totals[value] ?? "—"}</span>
          </button>
        ))}
      </div>
      <div id="contribution-results">
        <p className="contrib-results" role="status">
          {totals[filter] === null ? "This activity is temporarily unavailable."
            : `Showing ${Math.min(limit, filtered.length)} of ${totals[filter]}`}
        </p>
        {totals[filter] === null ? (
          <p className="contrib-empty">GitHub could not be reached. <a href={`https://github.com/${filter === "issues" ? "issues" : "pulls"}?q=${encodeURIComponent(`author:IshaanXCoder is:${filter === "merged" ? "merged" : "open"}`)}`}>View activity on GitHub</a>.</p>
        ) : filtered.length === 0 ? (
          <p className="contrib-empty">No matching activity right now.</p>
        ) : (
          <ul className="contrib-list" role="list">
            {filtered.slice(0, limit).map((item) => (
              <li className="contrib-card" key={item.id} data-kind={item.kind}>
                <svg className="contrib-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  {item.kind === "issues" ? <><circle cx="12" cy="12" r="8" /><path d="M12 8v5m0 2v1" /></>
                    : <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M6 7v10m12 0v-5c0-4-6-2-6-7m-2 2 2-2 2 2" /></>}
                </svg>
                <div className="contrib-card__body">
                  <a className="contrib-card__repo" href={`https://github.com/${item.repository}`} target="_blank" rel="noopener noreferrer">{item.repository}</a>
                  <h2><a className="contrib-card__title" href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h2>
                  <p className="contrib-card__meta">#{item.number} <span>Updated <time dateTime={item.updatedAt}>{new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></span></p>
                </div>
                <span className="contrib-card__state">{item.kind === "merged" ? "Merged" : "Open"}</span>
              </li>
            ))}
          </ul>
        )}
        {filtered.length > limit && <button className="btn contrib-more" type="button" onClick={() => setLimit(limit + 10)}>Show more</button>}
        {totals[filter] !== null && totals[filter] > filtered.length && (
          <p className="contrib-note">Showing up to 100 recently updated entries per category. <a href="https://github.com/IshaanXCoder">View all on GitHub</a>.</p>
        )}
      </div>
    </section>
  );
}

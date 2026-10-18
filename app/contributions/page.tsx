import type { Metadata } from "next";
import ContributionsList from "@/components/ContributionsList";
import Dock from "@/components/Dock";
import GitHubIcon from "@/components/GitHubIcon";
import TopBar from "@/components/TopBar";
import { fetchContributions } from "@/lib/github";

export const metadata: Metadata = { title: "Open source | Ishaan Kesarwani" };

export default async function ContributionsPage() {
  const [merged, open, issues] = await Promise.all([
    fetchContributions("merged"), fetchContributions("open"), fetchContributions("issues"),
  ]);
  const items = [...(merged?.items ?? []), ...(open?.items ?? []), ...(issues?.items ?? [])];
  const repositories = [...new Set(items.map((item) => item.repository))].sort();
  const totals = { merged: merged?.total ?? null, open: open?.total ?? null, issues: issues?.total ?? null };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className="page" id="top">
        <TopBar back />
        <header className="contrib-hero" id="main">
          <h1 className="contrib-hero__title">Open source</h1>
          <p className="contrib-hero__subtitle">Code, fixes, and conversations across the projects I contribute to.</p>
          <a className="btn" href="https://github.com/IshaanXCoder" target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="btn__icon" /> GitHub profile
          </a>
        </header>
        <div className="contrib-stats" aria-label="Contribution totals">
          {[[totals.merged, "Merged PRs"], [totals.open, "Open PRs"], [totals.issues, "Open issues"],
            [merged && open && issues ? repositories.length : null, "Repositories shown"]].map(([value, label]) => (
            <div className="contrib-stat" key={label}>
              <span className="contrib-stat__value">{value ?? "—"}</span>
              <span className="contrib-stat__label">{label}</span>
            </div>
          ))}
        </div>
        <ContributionsList items={items} totals={totals} />
        {repositories.length > 0 && (
          <details className="contrib-repositories">
            <summary>Explore {repositories.length} repositories</summary>
            <ul role="list">{repositories.map((repository) => <li key={repository}>
              <a href={`https://github.com/${repository}`} target="_blank" rel="noopener noreferrer">{repository}</a>
            </li>)}</ul>
          </details>
        )}
        <footer className="footer">
          <p>Snapshot from {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}. Updated when the site is rebuilt.</p>
        </footer>
      </main>
      <Dock />
    </>
  );
}

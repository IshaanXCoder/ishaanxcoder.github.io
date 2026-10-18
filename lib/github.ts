export type ContributionKind = "merged" | "open" | "issues";

export interface Contribution {
  id: string;
  number: number;
  title: string;
  url: string;
  repository: string;
  updatedAt: string;
  kind: ContributionKind;
}

export interface ContributionResult {
  items: Contribution[];
  total: number;
}

const queries: Record<ContributionKind, string> = {
  merged: "author:IshaanXCoder type:pr is:merged",
  open: "author:IshaanXCoder type:pr is:open",
  issues: "author:IshaanXCoder is:issue is:open",
};

export async function fetchContributions(kind: ContributionKind): Promise<ContributionResult | null> {
  try {
    const params = new URLSearchParams({ q: queries[kind], per_page: "100", sort: "updated", order: "desc" });
    const response = await fetch(`https://api.github.com/search/issues?${params}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(15000),
      cache: "force-cache",
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data.items) || !Number.isInteger(data.total_count) || data.total_count < 0 || data.incomplete_results) return null;

    const items: Contribution[] = [];
    for (const item of data.items) {
      const repository = typeof item.repository_url === "string"
        ? item.repository_url.match(/^https:\/\/api\.github\.com\/repos\/([^/]+\/[^/]+)$/)?.[1]
        : undefined;
      if (!repository || typeof item.title !== "string" || !Number.isInteger(item.number)
        || item.html_url !== `https://github.com/${repository}/${kind === "issues" ? "issues" : "pull"}/${item.number}`
        || typeof item.updated_at !== "string" || !Number.isFinite(Date.parse(item.updated_at))) return null;
      items.push({
        id: `${repository}#${item.number}`,
        number: item.number,
        title: item.title,
        url: item.html_url,
        repository,
        updatedAt: item.updated_at,
        kind,
      });
    }
    return { items, total: data.total_count };
  } catch {
    return null;
  }
}

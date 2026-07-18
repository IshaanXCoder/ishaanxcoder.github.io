import Link from "next/link";

interface PullRequest {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  mergedAt: string | null;
  repository: { owner: { login: string }; name: string; avatar_url?: string };
  labels: { name: string }[];
}

interface Issue {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  repository: { owner: { login: string }; name: string; avatar_url?: string };
  labels: { name: string }[];
  comments: number;
}

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ContributionsPage() {
  const mergedPRs = await fetchJSON(
    "https://api.github.com/search/issues?q=author:IshaanXCoder+type:pr+is:merged&per_page=100&sort=updated&order=desc"
  );
  const openPRs = await fetchJSON(
    "https://api.github.com/search/issues?q=author:IshaanXCoder+type:pr+is:open&per_page=100&sort=updated&order=desc"
  );
  const createdIssues = await fetchJSON(
    "https://api.github.com/search/issues?q=author:IshaanXCoder+is:issue+is:open&per_page=100&sort=updated&order=desc"
  );

  const extractRepo = (url: string) => {
    const match = url?.match(/\/repos\/([^/]+)\/([^/]+)/);
    return match ? { owner: match[1], name: match[2] } : { owner: "unknown", name: "unknown" };
  };

  const toPR = (item: any): PullRequest => {
    const repo = extractRepo(item.repository_url);
    return {
      id: item.number,
      title: item.title,
      url: item.html_url,
      createdAt: item.created_at,
      mergedAt: item.merged_at || null,
      repository: {
        owner: { login: repo.owner },
        name: repo.name,
      },
      labels: item.labels.map((l: any) => ({ name: l.name })),
    };
  };

  const toIssue = (item: any): Issue => {
    const repo = extractRepo(item.repository_url);
    return {
      id: item.number,
      title: item.title,
      url: item.html_url,
      createdAt: item.created_at,
      repository: {
        owner: { login: repo.owner },
        name: repo.name,
      },
      labels: item.labels.map((l: any) => ({ name: l.name })),
      comments: item.comments,
    };
  };

  const mergedList = (mergedPRs?.items || []).map(toPR);
  const openPRList = (openPRs?.items || []).map(toPR);
  const issueList = (createdIssues?.items || []).map(toIssue);

  const allRepos = new Set<string>();
  mergedList.forEach((p: PullRequest) => allRepos.add(`${p.repository.owner.login}/${p.repository.name}`));
  openPRList.forEach((p: PullRequest) => allRepos.add(`${p.repository.owner.login}/${p.repository.name}`));
  issueList.forEach((i: Issue) => allRepos.add(`${i.repository.owner.login}/${i.repository.name}`));
  const orgs = [...allRepos].sort();

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const itemCard = (item: {
    title: string;
    url: string;
    repoUrl: string;
    repo: string;
    date: string;
    labels: { name: string }[];
    avatarUrl?: string;
    ownerLogin: string;
    extra?: React.ReactNode;
    key: string | number;
  }) => (
    <li key={item.key} className="contrib-card">
      <div className="contrib-card__org">
        {item.avatarUrl ? (
          <img className="contrib-card__avatar" src={item.avatarUrl} alt="" width={24} height={24} loading="lazy" />
        ) : (
          <img
            className="contrib-card__avatar"
            src={`https://github.com/${item.ownerLogin}.png`}
            alt=""
            width={24}
            height={24}
            loading="lazy"
          />
        )}
        <a className="contrib-card__repo" href={item.repoUrl} target="_blank" rel="noopener noreferrer">
          {item.repo}
        </a>
      </div>
      <a className="contrib-card__title" href={item.url} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
      <div className="contrib-card__footer">
        <span className="contrib-card__date">{item.date}</span>
        {item.labels.length > 0 && (
          <div className="contrib-card__labels">
            {item.labels.map((l) => (
              <span key={l.name} className="contrib-label">{l.name}</span>
            ))}
          </div>
        )}
        {item.extra}
      </div>
    </li>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main className="page" id="top">
        <TopBar />

        <header className="contrib-hero">
          <div className="contrib-hero__text">
            <h1 className="contrib-hero__title">Open Source</h1>
            <p className="contrib-hero__subtitle">
              Merged PRs, open PRs, and issues across the orgs I contribute to.
            </p>
            <div className="contrib-stats">
              <div className="contrib-stat">
                <span className="contrib-stat__value">{mergedList.length}</span>
                <span className="contrib-stat__label">Merged</span>
              </div>
              <div className="contrib-stat">
                <span className="contrib-stat__value">{openPRList.length}</span>
                <span className="contrib-stat__label">Open PRs</span>
              </div>
              <div className="contrib-stat">
                <span className="contrib-stat__value">{issueList.length}</span>
                <span className="contrib-stat__label">Issues</span>
              </div>
              <div className="contrib-stat">
                <span className="contrib-stat__value">{orgs.length}</span>
                <span className="contrib-stat__label">Orgs</span>
              </div>
            </div>

          </div>
        </header>

        <div id="main">
          {orgs.length > 0 && (
            <section className="section">
              <h2 className="section__title">Organizations</h2>
              <div className="contrib-orgs">
                {orgs.map((org) => {
                  const [owner] = org.split("/");
                  return (
                    <a
                      key={org}
                      className="contrib-org"
                      href={`https://github.com/${org}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="contrib-org__avatar"
                        src={`https://github.com/${owner}.png`}
                        alt={owner}
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                      <span className="contrib-org__name">{org}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          <section className="section">
            <div className="contrib-grid">
              {/* Merged PRs */}
              <div className="contrib-column">
                <h2 className="contrib-column__title">
                  <svg className="contrib-column__icon contrib-column__icon--merged" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M13 17l5-5" />
                    <path d="M18 12l5-5" />
                    <path d="M3 12l5 5" />
                    <path d="M3 7l5 5" />
                  </svg>
                  Merged PRs
                  <span className="section__count">{mergedList.length}</span>
                </h2>
                {mergedList.length > 0 ? (
                  <ul className="contrib-list" role="list">
                    {mergedList.map((pr: PullRequest) =>
                      itemCard({
                        key: `${pr.repository.owner.login}/${pr.repository.name}-${pr.id}`,
                        title: pr.title,
                        url: pr.url,
                        repoUrl: `https://github.com/${pr.repository.owner.login}/${pr.repository.name}`,
                        repo: `${pr.repository.owner.login}/${pr.repository.name}`,
                        date: formatDate(pr.createdAt),
                        labels: pr.labels,
                        avatarUrl: pr.repository.avatar_url,
                        ownerLogin: pr.repository.owner.login,
                      })
                    )}
                  </ul>
                ) : (
                  <p className="contrib-empty">No merged PRs.</p>
                )}
              </div>

              {/* Open PRs */}
              <div className="contrib-column">
                <h2 className="contrib-column__title">
                  <svg className="contrib-column__icon contrib-column__icon--open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 12l2 2 4-4" />
                    <circle cx={12} cy={12} r={9} />
                  </svg>
                  Open PRs
                  <span className="section__count">{openPRList.length}</span>
                </h2>
                {openPRList.length > 0 ? (
                  <ul className="contrib-list" role="list">
                    {openPRList.map((pr: PullRequest) =>
                      itemCard({
                        key: `${pr.repository.owner.login}/${pr.repository.name}-${pr.id}`,
                        title: pr.title,
                        url: pr.url,
                        repoUrl: `https://github.com/${pr.repository.owner.login}/${pr.repository.name}`,
                        repo: `${pr.repository.owner.login}/${pr.repository.name}`,
                        date: formatDate(pr.createdAt),
                        labels: pr.labels,
                        avatarUrl: pr.repository.avatar_url,
                        ownerLogin: pr.repository.owner.login,
                      })
                    )}
                  </ul>
                ) : (
                  <p className="contrib-empty">No open PRs.</p>
                )}
              </div>

              {/* Open Issues */}
              <div className="contrib-column">
                <h2 className="contrib-column__title">
                  <svg className="contrib-column__icon contrib-column__icon--issue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx={12} cy={12} r={9} />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  Open Issues
                  <span className="section__count">{issueList.length}</span>
                </h2>
                {issueList.length > 0 ? (
                  <ul className="contrib-list" role="list">
                    {issueList.map((issue: Issue) =>
                      itemCard({
                        key: `${issue.repository.owner.login}/${issue.repository.name}-${issue.id}`,
                        title: issue.title,
                        url: issue.url,
                        repoUrl: `https://github.com/${issue.repository.owner.login}/${issue.repository.name}`,
                        repo: `${issue.repository.owner.login}/${issue.repository.name}`,
                        date: formatDate(issue.createdAt),
                        labels: issue.labels,
                        avatarUrl: issue.repository.avatar_url,
                        ownerLogin: issue.repository.owner.login,
                        extra: (
                          <span className="contrib-card__comments">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={14} height={14}>
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {issue.comments}
                          </span>
                        ),
                      })
                    )}
                  </ul>
                ) : (
                  <p className="contrib-empty">No open issues.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Dock />
    </>
  );
}

function TopBar() {
  return (
    <div className="top-bar">
      <Link className="top-bar__link" href="/">
        ← Back to home
      </Link>
    </div>
  );
}

function Dock() {
  return (
    <nav className="dock" aria-label="Primary">
      <Link className="dock__link" href="/" aria-label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="dock__label" aria-hidden>Home</span>
      </Link>
      <a
        className="dock__link"
        href="https://github.com/IshaanXCoder"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="dock__label" aria-hidden>GitHub</span>
      </a>
    </nav>
  );
}

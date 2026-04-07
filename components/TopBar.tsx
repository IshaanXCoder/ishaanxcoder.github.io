import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <div className="top-bar">
     
      <a className="top-bar__link" href="mailto:kesarwaniishaan4@gmail.com">
        <svg
          className="top-bar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        kesarwaniishaan4@gmail.com
      </a>
      <a className="top-bar__link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <svg
          className="top-bar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Resume
      </a>
      <ThemeToggle />
    </div>
  );
}

"use client";

import { useCallback } from "react";

const STORAGE_KEY = "ishaan-portfolio-theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

function motionReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ThemeToggle() {
  const onClick = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (!motionReduced() && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }, []);

  return (
    <button
      type="button"
      className="top-bar__theme"
      id="theme-toggle"
      title="Toggle theme"
      aria-label="Toggle light and dark theme"
      onClick={onClick}
    >
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

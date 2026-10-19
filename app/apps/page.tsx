import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import PeelWheel from "./PeelWheel";
import styles from "./apps.module.css";

export const metadata: Metadata = {
  title: "Apps | Ishaan Kesarwani",
  description: "Small apps, side quests, and things I wanted on my own computer.",
  robots: { index: false, follow: false },
};

export default function AppsPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className={`page ${styles.page}`}>
        <TopBar back />
        <header className={styles.intro} id="main">
          <h1>Apps</h1>
          <p className={styles.subtitle}>Small tools. Slightly impulsive side quests.</p>
          <p>
            I found <a href="https://github.com/morluto/rea">Reverse Engineer Anything</a> on GitHub
            and, obviously, had to try it.
          </p>
          <p>
            This is where those experiments live: things I wanted on my own computer,
            made useful enough to share. Just one for now. More when curiosity wins again.
          </p>
        </header>

        <section className="section" aria-labelledby="apps-heading">
          <h2 className="section__title" id="apps-heading">The collection</h2>
          <Link className={styles.appCard} href="/apps/peel/">
            <div className={styles.cardPreview}><PeelWheel /></div>
            <div className={styles.cardBody}>
              <div className={styles.cardHeading}>
                <h3>Peel</h3>
                <span className={styles.availability}>Free for Mac</span>
              </div>
              <p>Convert files, tidy up images, and pull text out of screenshots. All locally, with a drag wheel a shortcut away.</p>
              <span className={styles.cardLink}>Meet Peel <span aria-hidden>↗</span></span>
            </div>
          </Link>
        </section>

        <footer className="footer">
          <p>Built out of curiosity. Shared in case they help you too.</p>
          <Link href="/">Portfolio</Link>
          <a href="https://ishaanxcoder.github.io/blog/">Blog</a>
        </footer>
      </main>
    </>
  );
}

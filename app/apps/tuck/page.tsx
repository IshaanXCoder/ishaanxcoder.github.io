import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import styles from "../apps.module.css";

export const metadata: Metadata = {
  title: "Tuck — a tidier menu bar for Mac | Ishaan Kesarwani",
  description: "A tiny, free Mac app that hides the menu bar icons you don’t need. One click, one list, nothing running in the background. For macOS 27 on Apple silicon.",
  robots: { index: false, follow: false },
};

const features = [
  ["One click", "Click the arrow or press ⌘⇧2 to hide or show your icons. They tuck away again by themselves after 10 seconds, but never while you’re using a menu."],
  ["Pick from a list", "Right-click the arrow and tick the apps you want hidden. Tick as many as you like in one go. No dragging icons around."],
  ["Running apps at a glance", "See every open app with the memory it’s using, helpers included. Spot apps hidden with ⌘H or running without a Dock icon, and show or quit any of them."],
  ["Starts with your Mac", "Launch at Login is on from the first run. There’s no settings window to visit."],
  ["Light by design", "About 13 MB of memory and no background polling. Nothing runs until you click."],
  ["Fails safe", "If anything goes wrong, your icons simply stay visible. Quit Tuck and every icon comes back instantly."],
];

export default function TuckPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className={`page ${styles.page}`}>
        <TopBar back />
        <Link className={styles.back} href="/apps/">← All apps</Link>
        <header className={styles.productHero} id="main">
          <div>
            <h1>Tuck</h1>
            <p className={styles.tagline}>A tidier menu bar, one click away.</p>
            <p className={styles.productDescription}>A tiny Mac app that hides the menu bar icons you don’t need. Tick them once, then click the arrow to tuck them away.</p>
            <a className="btn btn--primary" href="/downloads/Tuck-1.0-macos-arm64.zip" download>
              <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" /></svg>
              Download for Mac
            </a>
            <p className={styles.release}>v1.0 · 1.3 MB ZIP · Free<br />Apple silicon (M1 or newer) · macOS 27+</p>
          </div>
          <figure className={styles.productPreview}>
            <Image className={styles.appIcon} src="/images/tuck-icon.png" width={512} height={512} alt="Tuck’s icon: a menu bar rolled up at one end" priority />
            <figcaption>The menu bar, rolled up.</figcaption>
          </figure>
        </header>

        <section className="section" aria-labelledby="features-heading">
          <h2 className="section__title" id="features-heading">What’s inside</h2>
          <dl className={styles.features}>
            {features.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
          </dl>
        </section>

        <section className="section" id="install" aria-labelledby="install-heading">
          <h2 className="section__title" id="install-heading">Getting started</h2>
          <ol className={styles.steps}>
            <li>Download and unzip Tuck. Drag <strong>Tuck.app</strong> into <strong>Applications</strong> (it only works from there), then open it.</li>
            <li>Grant it <strong>Accessibility</strong> access in <strong>System Settings → Privacy &amp; Security → Accessibility</strong>. Tuck uses it to see which apps have menu bar icons.</li>
            <li>Right-click Tuck’s arrow, tick the apps to hide, then click the arrow.</li>
          </ol>
          <div className={styles.installNote}>
            <p>This is a personal build and isn’t notarized by Apple. If macOS blocks it and you trust this download, use <strong>System Settings → Privacy &amp; Security → Open Anyway</strong> after trying to open it.</p>
            <p>Quit <strong>Hidden Bar</strong> or any other menu bar manager first: only one app can control the menu bar at a time.</p>
            <p>While icons are tucked, macOS ignores clicks on the clock. Tuck notices the click, brings your icons back, and opens Notification Center for you.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="story-heading">
          <h2 className="section__title" id="story-heading">The rabbit hole</h2>
          <div className={styles.story}>
            <p>After Peel, I pointed <a href="https://github.com/morluto/rea">REA</a> at <a href="https://github.com/dwarvesf/hidden">Hidden Bar</a>, the open-source menu bar app I’d used for years. On macOS 27 it had become fiddly for me: a Dock icon popping up, menus closing mid-click, and more settings than I ever touched.</p>
            <p>Tuck is the version I wanted: one arrow, one list, nothing running in the background. It uses the same macOS 27 mechanism Hidden Bar does, and reuses Hidden Bar’s small MIT-licensed bridge to it, with thanks to Dwarves Foundation and Console Labs. There’s no affiliation.</p>
          </div>
        </section>

        <section className={styles.limits} aria-labelledby="limits-heading">
          <h2 id="limits-heading">A few rough edges</h2>
          <p>Tuck needs macOS 27 and relies on a private macOS feature, so a future update could stop it from hiding. If that happens, your icons simply stay visible. While icons are tucked, macOS also hides the label naming the app using your microphone or camera; the coloured dot in the corner of the screen still shows.</p>
          <p>Apple’s own icons (clock, Wi-Fi, battery, Control Center) can’t be hidden, and an app with several icons hides them all together. This build has been checked on my Mac; broader compatibility is still a work in progress.</p>
        </section>

        <footer className="footer">
          <p>Something feel off? <a href="mailto:kesarwaniishaan4@gmail.com?subject=Tuck%20feedback">Send me a note.</a></p>
          <Link href="/apps/">All apps</Link>
          <Link href="/">Portfolio</Link>
        </footer>
      </main>
    </>
  );
}

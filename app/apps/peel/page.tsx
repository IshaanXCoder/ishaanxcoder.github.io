import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import PeelWheel from "../PeelWheel";
import styles from "../apps.module.css";

export const metadata: Metadata = {
  title: "Peel — local file tools for Mac | Ishaan Kesarwani",
  description: "A free native Mac app with a drag wheel for file conversion, image tools, PDFs and local OCR. Download Peel for Apple silicon.",
  robots: { index: false, follow: false },
};

const features = [
  ["A wheel where you’re working", "Pick up a file in Finder, tap a shortcut, and drop it on a choice. Switch between formats, editing tools, and file actions without moving the wheel."],
  ["Images, sorted", "Convert formats, crop, resize, rotate, adjust exposure and saturation, remove metadata, or put images together in a collage or PDF."],
  ["Text out of images", "Drop a single still image on OCR to read its text locally. Review and edit the result, copy a passage, or copy it all. Handy for screenshots."],
  ["A few less PDF chores", "Merge and split PDFs, reorder and rotate pages, export embedded text, or turn pages into PNG and JPEG images."],
  ["Media and other odds and ends", "Audio and video conversion with a separately installed FFmpeg, basic document and text conversions, SRT/WebVTT subtitle conversion, and single-item ZIP creation."],
  ["Native and local", "Built in Swift using macOS frameworks. The menu bar app opens its editor when needed and handles one conversion at a time. File processing stays on your Mac."],
];

export default function PeelPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className={`page ${styles.page}`}>
        <TopBar back />
        <Link className={styles.back} href="/apps/">← All apps</Link>
        <header className={styles.productHero} id="main">
          <div>
            <h1>Peel</h1>
            <p className={styles.tagline}>A little less file juggling.</p>
            <p className={styles.productDescription}>A small Mac app for converting files, editing images, and copying text out of screenshots. Drag a file, tap a shortcut, and pick what happens next.</p>
            <a className="btn btn--primary" href="/downloads/Peel-0.2.0-macos-arm64.zip" download>
              <svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" /></svg>
              Download for Mac
            </a>
            <p className={styles.release}>v0.2.0 · 203 KB ZIP · Free<br />Apple silicon (M1 or newer) · macOS 13+</p>
          </div>
          <figure className={styles.productPreview}>
            <PeelWheel />
            <figcaption>The conversion wheel, illustrated.</figcaption>
          </figure>
        </header>

        <section className="section" aria-labelledby="features-heading">
          <h2 className="section__title" id="features-heading">What’s inside</h2>
          <dl className={styles.features}>
            {features.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
          </dl>
        </section>

        <section className="section" aria-labelledby="wheel-heading">
          <h2 className="section__title" id="wheel-heading">Three shortcuts. One wheel.</h2>
          <p className={styles.body}>Keep holding the file while you tap and release a shortcut. Move to a choice, wait for it to turn blue, then let go of the file. Drop in the center or press Escape to cancel.</p>
          <dl className={styles.shortcuts}>
            <div><dt><kbd>⇧ Shift</kbd></dt><dd>Convert formats</dd></div>
            <div><dt><kbd>⌘ Command</kbd></dt><dd>Editing tools</dd></div>
            <div><dt><kbd>⌃ Control</kbd></dt><dd>File actions &amp; image OCR</dd></div>
          </dl>
          <p className={styles.body}>Prefer a window? Open Peel from the menu bar and use the editor instead. Conversions save new copies beside your originals.</p>
        </section>

        <section className="section" id="install" aria-labelledby="install-heading">
          <h2 className="section__title" id="install-heading">Getting started</h2>
          <ol className={styles.steps}>
            <li>Download and unzip Peel. Drag <strong>Peel.app</strong> into <strong>Applications</strong>, then open it.</li>
            <li>Peel lives in the menu bar. Grant it <strong>Accessibility</strong> access in <strong>System Settings → Privacy &amp; Security → Accessibility</strong> to enable the Finder drag wheel.</li>
            <li>Try an image: drag it in Finder, tap Shift, and drop it on a format. Or tap Control and choose OCR to extract text.</li>
          </ol>
          <div className={styles.installNote}>
            <p>This is a personal build and isn’t notarized by Apple. If macOS blocks it and you trust this download, use <strong>System Settings → Privacy &amp; Security → Open Anyway</strong> after trying to open it.</p>
            <p>Audio and video tools need <strong>FFmpeg and FFprobe</strong> installed separately in <code>/opt/homebrew/bin</code> or <code>/usr/local/bin</code>. They’re not included in this download. Images, PDFs, and OCR use built-in macOS frameworks.</p>
            <p>If Tangerine is running, quit it before using Peel’s wheel: both listen for the same drag shortcuts.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="story-heading">
          <h2 className="section__title" id="story-heading">The rabbit hole</h2>
          <div className={styles.story}>
            <p>I stumbled across <a href="https://github.com/morluto/rea">REA on GitHub</a>, a toolkit for investigating how apps work. I wanted an excuse to try it, and <a href="https://tangerineformac.com/">Tangerine’s</a> drag-to-convert interaction was a good one. Could I understand the workflow and build something I’d actually use?</p>
            <p>That experiment became Peel: an independent implementation, with native file tools and a wheel that stays close to the drag. Then came image OCR, because copying text out of screenshots is one of those tiny things I do all the time.</p>
            <p>It’s still an early personal project, with a smaller feature set than Tangerine. There’s no affiliation, and its proprietary code and bundled helpers aren’t part of Peel.</p>
          </div>
        </section>

        <section className={styles.limits} aria-labelledby="limits-heading">
          <h2 id="limits-heading">A few rough edges</h2>
          <p>This download is for Apple silicon Macs only. OCR handles one still image at a time; scanned-PDF and batch OCR aren’t included. The first recognition can take longer while macOS initializes its model. Large images are limited to 40 megapixels and OCR uses at most 4096 pixels on the longest edge, so tiny text in a large scan can lose detail.</p>
          <p>The app is designed to stay small, but conversion and OCR memory peaks haven’t been benchmarked. This build has been checked on my Mac; broader device and macOS compatibility is still a work in progress.</p>
        </section>

        <footer className="footer">
          <p>Something feel off? <a href="mailto:kesarwaniishaan4@gmail.com?subject=Peel%20feedback">Send me a note.</a></p>
          <Link href="/apps/">All apps</Link>
          <Link href="/">Portfolio</Link>
        </footer>
      </main>
    </>
  );
}

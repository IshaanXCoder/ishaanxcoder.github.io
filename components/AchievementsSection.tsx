"use client";

import { useEffect, useState } from "react";

type LightboxImage = {
  src: string;
  alt: string;
  title: string;
};

const OPJEMS_IMAGE: LightboxImage = {
  src: "/images/opjems.jpeg",
  alt: "OPJEMS Scholarship certificate",
  title: "OPJEMS Scholarship",
};

const ORBITAL_IMAGE: LightboxImage = {
  src: "/images/orbital.jpeg",
  alt: "Arbitrum Hacker House first place win for Orbital",
  title: "Arbitrum Hacker House - 1st Place",
};

export default function AchievementsSection() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [activeImage]);

  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <h2 id="achievements-heading" className="section__title">
        Achievements
      </h2>
      <ul className="achievements" role="list">
        <li>
          One of 100 students across all IITs, NITs and IIMs selected for the{" "}
          <button className="achievements__link achievements__linkBtn" onClick={() => setActiveImage(OPJEMS_IMAGE)}>
            <strong>OPJEMS Scholarship</strong>
          </button>
          .
        </li>
        <li>
          <button className="achievements__link achievements__linkBtn" onClick={() => setActiveImage(ORBITAL_IMAGE)}>
            <strong>1st place</strong> at Arbitrum Hacker House, Bangalore
          </button>
          , and <strong>2nd place</strong> at Arbitrum Open House (implemented Orbital).
        </li>
        <li>
          <strong>3rd place</strong> in Syntax Error&apos;24 (IITR), <strong>1st place</strong> in Shaastra&apos;21
          (IITM), <strong>1st place</strong> in CrackHack&apos;25 (IIT Mandi), <strong>2nd place</strong> at IIT
          Dhanbad BFX&apos;21, and <strong>3rd place</strong> in Monad Blitz Lucknow.
        </li>
        <li>
          <strong>All India Rank 6173</strong> in JEE Advanced, <strong>99.72 percentile</strong> in JEE Mains, and
          scored <strong>100</strong> in Mathematics and Physics.
        </li>
        <li>
          Cleared <strong>Pre-Regional Mathematics Olympiad (PRMO)</strong> in 2021.
        </li>
        <li>
          Served as <strong>Head Boy</strong> and twice as <strong>House Captain</strong> in school.
        </li>
      </ul>

      <div className="achievements__gallery" aria-label="Achievement highlights">
        <button className="achievements__card achievements__cardBtn" onClick={() => setActiveImage(OPJEMS_IMAGE)}>
          <img src={OPJEMS_IMAGE.src} alt={OPJEMS_IMAGE.alt} loading="lazy" decoding="async" />
          <span>{OPJEMS_IMAGE.title}</span>
        </button>
        <button className="achievements__card achievements__cardBtn" onClick={() => setActiveImage(ORBITAL_IMAGE)}>
          <img src={ORBITAL_IMAGE.src} alt={ORBITAL_IMAGE.alt} loading="lazy" decoding="async" />
          <span>{ORBITAL_IMAGE.title}</span>
        </button>
      </div>

      <div
        className={`achievements__lightbox ${activeImage ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Achievement image preview"
        onClick={() => setActiveImage(null)}
      >
        <div className="achievements__lightboxContent" onClick={(event) => event.stopPropagation()}>
          <button className="achievements__lightboxClose" onClick={() => setActiveImage(null)} aria-label="Close image">
            Close
          </button>
          {activeImage ? <img src={activeImage.src} alt={activeImage.alt} /> : null}
          {activeImage ? <p>{activeImage.title}</p> : null}
        </div>
      </div>
    </section>
  );
}


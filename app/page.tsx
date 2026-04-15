import Dock from "@/components/Dock";
import GitHubIcon from "@/components/GitHubIcon";
import TopBar from "@/components/TopBar";
import AchievementsSection from "@/components/AchievementsSection";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <main className="page" id="top">
        <TopBar />

        <header className="hero">
          <div className="hero__text">
            <h1 className="hero__title">Hi, I&apos;m Ishaan</h1>
            <p className="hero__subtitle">
              Web3 &amp; AI systems - ZK, DeFi and fullstack. IIT Roorkee.
            </p>
            <p className="hero__badge" role="status">
              <span className="hero__badge-dot" aria-hidden />
              Open to internships &amp; collaborations
            </p>
          </div>
          <div className="hero__avatar">
            <img
              src="/images/ishaan.jpeg"
              alt="Ishaan Kesarwani"
              width={320}
              height={320}
              loading="eager"
              decoding="async"
            />
          </div>
        </header>

        <section className="section" id="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className="section__title">
            About
          </h2>
          <p className="section__body">
            I build around blockchain, zk proofs and AI.
            I&apos;m a developer at{" "}
            <a href="https://x.com/blocsoc-iitr" target="_blank" rel="noopener noreferrer">
              BlocSoc IITR
            </a>
            and actively contribute to open source projects like{" "}
            <a href="https://github.com/intelowlproject/IntelOwl" target="_blank" rel="noopener noreferrer">
              IntelOwl
            </a>
            ,{" "}
            <a href="https://github.com/BlocSoc-iitr/Deimos" target="_blank" rel="noopener noreferrer">
              Deimos
            </a>
            ,{" "}
            <a href="https://github.com/unicode-org/icu4x" target="_blank" rel="noopener noreferrer">
              ICU4X
            </a>{" "}
            and{" "}
            <a href="https://github.com/kyverno/kyverno" target="_blank" rel="noopener noreferrer">
              Kyverno
            </a>{" "}
            and care about building solid products.
          </p>
        </section>

        <section className="section" id="education" aria-labelledby="edu-heading">
          <h2 id="edu-heading" className="section__title">
            Education
          </h2>
          <ul className="timeline" role="list">
            <li className="timeline__row">
              <div className="timeline__logo timeline__logo--img">
                <img src="/images/iitr_logo.png" alt="" width={40} height={40} loading="lazy" decoding="async" />
              </div>
              <div className="timeline__main">
                <div className="timeline__top">
                  <a
                    className="timeline__name"
                    href="https://www.iitr.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IIT Roorkee
                  </a>
                  <span className="timeline__date">2024 — 2028</span>
                </div>
                <p className="timeline__role">Undergraduate</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="section__title">
            Skills
          </h2>
          <ul className="skills" role="list">
            {[
              "Rust",
              "Solidity/EVM fundamentals",
              "Solana VM",
              "ZK(SNARKs, STARKs, VMs)",
              "DeFi",
              "System design",
              "Agents, e2e RAG pipelines, Scaling Vector DBs",
              "Devops",
              "Python",
              "Golang",
              "C++",
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-heading">
          <p className="projects__eyebrow">My projects</p>
          <h2 id="projects-heading" className="projects__title">
            Check out my latest work
          </h2>
          <p className="projects__lede">
            A few things I&apos;ve shipped — from on-chain AMMs to ZK tooling and AI workflows.
          </p>
          <div className="projects__grid">
            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/orbital.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">Orbital</h3>
              <p className="project-card__year">2025</p>
              <p className="project-card__desc">
                Multi-dimensional concentrated liquidity AMM for stablecoins in a single LP — Stylus (Rust) on
                Arbitrum, based on{" "}
                <a href="https://www.paradigm.xyz/2025/06/orbital" target="_blank" rel="noopener noreferrer">
                  Paradigm&apos;s Orbital
                </a>
                .
              </p>
              <ul className="project-card__tags" role="list">
                <li>Rust (Stylus)</li>
                <li>DeFi</li>
                <li>AMM</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://github.com/agrawalx/orbital-pool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/groth16.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">Grothy-crab</h3>
              <p className="project-card__year">2025</p>
              <p className="project-card__desc">
                Groth16 zkSNARK in Rust from scratch: R1CS, QAP, trusted setup, proof generation, and verification —
                based on{" "}
                <a href="https://eprint.iacr.org/2016/260.pdf" target="_blank" rel="noopener noreferrer">
                  Groth16 (ePrint 2016/260)
                </a>
                .
              </p>
              <ul className="project-card__tags" role="list">
                <li>Rust</li>
                <li>ZK-SNARKs</li>
                <li>Groth16</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://eprint.iacr.org/2016/260.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paper
                </a>
                <a
                  className="btn btn--ghost"
                  href="https://github.com/ishaanxcoder/grothy-crab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/nymph.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">Nymph</h3>
              <p className="project-card__year">2024</p>
              <p className="project-card__desc">
                Cross-platform privacy app with ZK in Noir on Flutter via MoPro; started at ETHGlobal Delhi with BlocSoc
                IITR.
              </p>
              <ul className="project-card__tags" role="list">
                <li>Noir</li>
                <li>Flutter</li>
                <li>MoPro</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://github.com/IshaanXCoder/nymph"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/deimos-labs.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">Deimos</h3>
              <p className="project-card__year">2024</p>
              <p className="project-card__desc">
                Open-source mobile benchmarking for ZK frameworks: Groth16, Risc0, Cairo, Plonk, and more — BlocSoc
                IITR.
              </p>
              <ul className="project-card__tags" role="list">
                <li>Rust</li>
                <li>Flutter</li>
                <li>ZK</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://github.com/BlocSoc-iitr/Deimos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/dragndrop.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">DragNDrop</h3>
              <p className="project-card__year">2024</p>
              <p className="project-card__desc">n8n-style AI workflow engine for composing agents — React.</p>
              <ul className="project-card__tags" role="list">
                <li>React</li>
                <li>AI agents</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://github.com/IshaanXCoder/dragndrop-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card__media">
                <img src="/images/web-builder.png" alt="" width={800} height={500} loading="lazy" decoding="async" />
              </div>
              <h3 className="project-card__title">WebBuidler</h3>
              <p className="project-card__year">2024</p>
              <p className="project-card__desc">
                AI tool that scaffolds a full site from a prompt, pushes to GitHub, and supports iterative edits.
              </p>
              <ul className="project-card__tags" role="list">
                <li>Full-stack</li>
                <li>AI</li>
              </ul>
              <div className="project-card__actions">
                <a
                  className="btn btn--ghost"
                  href="https://github.com/IshaanXCoder/WebBuidler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="btn__icon" />
                  Source
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="exp-heading">
          <h2 id="exp-heading" className="section__title">
            Experience
          </h2>
          <ul className="timeline" role="list">
            <li className="timeline__row">
              <div className="timeline__logo timeline__logo--img">
                <img src="/images/blocsoc.jpeg" alt="" width={40} height={40} loading="lazy" decoding="async" />
              </div>
              <div className="timeline__main">
                <div className="timeline__top">
                  <a
                    className="timeline__name"
                    href="https://x.com/blocsoc-iitr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BlocSoc IITR
                  </a>
                  <span className="timeline__date">2024 — Present</span>
                </div>
                <p className="timeline__role">Developer</p>
              </div>
            </li>
            <li className="timeline__row">
              <div className="timeline__logo timeline__logo--img">
                <img src="/images/turbin3.jpeg" alt="" width={40} height={40} loading="lazy" decoding="async" />
              </div>
              <div className="timeline__main">
                <div className="timeline__top">
                  <a
                    className="timeline__name"
                    href="https://x.com/solana-turbin3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Turbin3 · Solana Builder
                  </a>
                  <span className="timeline__date">2025 Q3</span>
                </div>
                <p className="timeline__role">Graduate</p>
              </div>
            </li>
            <li className="timeline__row">
              <div className="timeline__logo timeline__logo--img">
                <img src="/images/cinesec.jpg" alt="" width={40} height={40} loading="lazy" decoding="async" />
              </div>
              <div className="timeline__main">
                <div className="timeline__top">
                  <a
                    className="timeline__name"
                    href="https://x.com/CinesecIITR"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cinema Section, IITR
                  </a>
                  <span className="timeline__date">2024 — Present</span>
                </div>
                <p className="timeline__role">Member</p>
              </div>
            </li>
            <li className="timeline__row">
              <div className="timeline__logo timeline__logo--img">
                <img src="/images/blockbuilders.jpeg" alt="" width={40} height={40} loading="lazy" decoding="async" />
              </div>
              <div className="timeline__main">
                <div className="timeline__top">
                  <span className="timeline__name">BlockBuidlers</span>
                  <span className="timeline__date">Web3 startup</span>
                </div>
                <p className="timeline__role">Web Developer, Intern</p>
              </div>
            </li>
          </ul>
        </section>

        <AchievementsSection />

      </main>

      <Dock />
    </>
  );
}

import styles from "./apps.module.css";

export default function PeelWheel() {
  const formats = ["JPG", "PNG", "HEIC", "TIFF", "PDF", "GIF"];
  return (
    <svg className={styles.wheel} viewBox="0 0 320 320" role="img" aria-label="Illustration of Peel’s conversion wheel with JPG, PNG, HEIC, TIFF, PDF and GIF choices">
      <circle cx="160" cy="160" r="112" fill="none" stroke="var(--border)" strokeWidth="66" />
      <path d="M120.5 91.6 A79 79 0 0 1 199.5 91.6 L232.5 34.4 A145 145 0 0 0 87.5 34.4 Z" fill="var(--peel-accent)" />
      {formats.map((format, i) => {
        const angle = i * Math.PI / 3 - Math.PI / 2;
        return <text key={format} x={160 + 112 * Math.cos(angle)} y={160 + 112 * Math.sin(angle)} textAnchor="middle" dominantBaseline="central" fill={i === 0 ? "#171717" : "var(--text)"} fontSize="13" fontWeight="600">{format}</text>;
      })}
      <path d="M148 135h17l12 12v37h-29z M165 135v13h12" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="160" y="207" textAnchor="middle" fill="var(--muted)" fontSize="11">Save a copy</text>
      <path d="m180 69 3 23 6-7 8 2z" fill="var(--text)" stroke="var(--bg)" strokeWidth="1.5" />
    </svg>
  );
}

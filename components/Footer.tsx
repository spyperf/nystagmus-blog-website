export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(10,10,10,0.1)",
        padding: "32px clamp(20px,4vw,48px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-grotesk), sans-serif",
          fontWeight: 700,
          letterSpacing: ".16em",
          fontSize: 13,
          color: "#0a0a0a",
        }}
      >
        LCG — DREAM YOUR WAY
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: ".12em",
          color: "#9a9aa0",
        }}
      >
        A NEW WAY TO SEE · 2026
      </span>
    </footer>
  );
}

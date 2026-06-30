const ITEMS =
  "A New Way To See ✦ Dream Your Way ✦ Pupil Tracking ✦ Don't Rely On Anyone ✦ A New Way To See ✦ Dream Your Way ✦ Pupil Tracking ✦ Don't Rely On Anyone ✦ ";

const spanStyle: React.CSSProperties = {
  fontFamily: "var(--font-grotesk), sans-serif",
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: ".04em",
  textTransform: "uppercase",
  color: "#0a0a0a",
  whiteSpace: "nowrap",
};

export default function Marquee() {
  return (
    <section
      style={{
        marginTop: 46,
        borderTop: "1px solid rgba(10,10,10,0.1)",
        borderBottom: "1px solid rgba(10,10,10,0.1)",
        overflow: "hidden",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "dyw-marquee 28s linear infinite",
        }}
      >
        <span style={spanStyle}>{ITEMS}</span>
        <span style={spanStyle}>{ITEMS}</span>
      </div>
    </section>
  );
}

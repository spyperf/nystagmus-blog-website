import Link from "next/link";
import FlowCanvas from "@/components/FlowCanvas";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About — Dream Your Way",
  description: "The human behind the lens.",
};

export default function AboutPage() {
  return (
    <section
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "50px clamp(20px,4vw,48px) 100px",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <Reveal style={{ marginBottom: 46 }}>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: "#9a9aa0",
          }}
        >
          The human behind the lens
        </span>
        <h1
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--font-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px,7vw,80px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "#0a0a0a",
          }}
        >
          About
        </h1>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 46, alignItems: "start" }}>
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(10,10,10,0.14)",
              background: "#ececed",
            }}
          >
            <FlowCanvas mode="mono" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                textAlign: "center",
                padding: 18,
              }}
            >
              your portrait
            </div>
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(26px,3.4vw,40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "#0a0a0a",
              }}
            >
              &ldquo;Dream your way —{" "}
              <span style={{ color: "#9a9aa0" }}>don&apos;t allow others to change you.&rdquo;</span>
            </h2>
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#9a9aa0",
              }}
            >
              The motto
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} style={{ maxWidth: "62ch", fontSize: 18, lineHeight: 1.9, color: "#33333a" }}>
          <p style={{ margin: "0 0 24px" }}>
            My biggest challenge rivaled my fate the moment I was born. Since I was premature, I lived
            with an eye condition called nystagmus, which constantly vibrated my eyes from side-to-side.
            Normally, nystagmus can only be seen with high-end technology and microscopes; however, mine
            could be seen with the naked eye. This severe case caused extreme light sensitivity and near-sightedness,
            which prevented me from doing countless activities, such as playing sports and getting my driver&apos;s
            license. Growing up, I got mocked for having bad eyesight. My friends asked me why I couldn't just get
            new glasses, and they called me "laser eyes" — they will never understand the pain I had to fight through.
            For a while, the way my eyes worked felt like a wall between me and everything I wanted to do.
          </p>
          <p style={{ margin: "0 0 24px" }}>
            But I never let it stop me. It forced me to sit in the front of the class and focus better.
            I kept chasing the things I loved, and somewhere along the way the thing that was supposed to
            hold me back became the thing I&apos;m most curious about. That&apos;s where this project came
            from. If I see the world a little differently, I will never let that stop me from pursuing my goals.
          </p>
          <p style={{ margin: 0 }}>
            That&apos;s what{" "}
            <strong style={{ color: "#0a0a0a", fontWeight: 700 }}>&ldquo;Dream Your Way&rdquo;</strong>{" "}
            means to me. My mission is to prevent people from having the same harmful experiences I faced and
            to bring more awareness. You map your own way forward and then you walk it.
          </p>
        </Reveal>

        <Reveal delay={200} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <Link
            href="/blog"
            className="dyw-btn dyw-btn-solid"
            style={{ fontSize: 13, letterSpacing: ".06em", fontWeight: 700, padding: "14px 28px" }}
          >
            Read the blog →
          </Link>
          <Link
            href="/"
            className="dyw-btn dyw-btn-ghost"
            style={{ fontSize: 13, letterSpacing: ".06em", padding: "14px 28px" }}
          >
            Back home
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { decorate } from "@/lib/display";
import FlowCanvas from "@/components/FlowCanvas";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const posts = decorate(getAllPosts());
  const latest = posts.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: "clamp(24px,4vw,52px) clamp(16px,4vw,48px) 10px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#fff",
                background: "#0a0a0a",
                padding: "8px 16px",
                borderRadius: 999,
              }}
            >
              A New Way To See
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                border: "1px solid #0a0a0a",
                padding: "8px 16px",
                borderRadius: 999,
              }}
            >
              Eye Tracking · 2026
            </span>
          </Reveal>

          <Reveal
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 26,
              border: "1px solid rgba(10,10,10,0.12)",
              height: "clamp(300px,46vw,520px)",
              background: "#efeff1",
            }}
          >
            <FlowCanvas mode="split" lineDensity={42} flowSpeed={60} showStars />
          </Reveal>

          <Reveal style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 22 }}>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-grotesk), sans-serif",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                fontSize: "clamp(52px,11vw,150px)",
                color: "#0a0a0a",
              }}
            >
              DREAM YOUR WAY
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <p
                style={{
                  margin: 0,
                  maxWidth: "46ch",
                  fontSize: "clamp(15px,1.5vw,19px)",
                  lineHeight: 1.7,
                  color: "#5a5a60",
                }}
              >
                Technology the world has never seen before. Endless possibilities await you.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link
                  href="/blog"
                  className="dyw-btn dyw-btn-solid"
                  style={{ fontSize: 13, letterSpacing: ".06em", fontWeight: 700, padding: "15px 30px" }}
                >
                  Read the Blog →
                </Link>
                <Link
                  href="/about"
                  className="dyw-btn dyw-btn-ghost"
                  style={{ fontSize: 13, letterSpacing: ".06em", padding: "15px 30px" }}
                >
                  My Story
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* MISSION */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px clamp(20px,4vw,48px) 40px" }}>
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)",
            gap: 40,
            alignItems: "start",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "#0a0a0a",
            }}
          >
            [ 01 ]
            <br />
            The mission
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(20px,2.4vw,30px)",
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              color: "#0a0a0a",
              fontWeight: 400,
            }}
          >
            Building an advanced and innovative design to alleviate nystagmus, utilizing OpenCV, liquid crystals, and hardware components to
            understand how eyes that move differently can still navigate the world beautifully.{" "}
            <span style={{ color: "#9a9aa0" }}>
              These blogs documents the wins, the dead ends, and the philosophy that keeps
              this project moving.
            </span>
          </p>
        </Reveal>
      </section>

      {/* LATEST POSTS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px clamp(20px,4vw,48px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <Reveal>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "#9a9aa0",
              }}
            >
              [ 02 ] Transmissions
            </span>
            <h2
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px,3.8vw,46px)",
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
              }}
            >
              Latest from the log
            </h2>
          </Reveal>
          <Link
            href="/blog"
            className="dyw-btn dyw-btn-ghost"
            style={{ fontSize: 12, letterSpacing: ".08em", padding: "11px 18px" }}
          >
            View all →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 22,
          }}
        >
          {latest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px clamp(20px,4vw,48px) 80px" }}>
        <Reveal
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 26,
            background: "#0a0a0a",
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(40px,7vw,76px)",
          }}
        >
          <FlowCanvas mode="dark" style={{ opacity: 0.5 }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2
              style={{
                margin: "0 auto",
                maxWidth: "16ch",
                fontFamily: "var(--font-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px,4.6vw,54px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              Your vision is the only map you need.
            </h2>
            <Link
              href="/about"
              className="dyw-btn dyw-btn-light"
              style={{
                marginTop: 28,
                fontSize: 13,
                letterSpacing: ".06em",
                fontWeight: 700,
                padding: "15px 32px",
              }}
            >
              Read my story →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

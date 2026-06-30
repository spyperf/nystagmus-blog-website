import Link from "next/link";
import FlowCanvas from "@/components/FlowCanvas";
import Reveal from "@/components/Reveal";
import { DisplayPost, formatDate } from "@/lib/display";

export default function BlogCard({ post }: { post: DisplayPost }) {
  const href = `/blog/${post.slug}`;
  const isDark = post.variant === "dark";

  // Shared bits
  const tag = (
    <span
      style={{
        position: "absolute",
        left: 18,
        top: 18,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        fontWeight: 700,
        color: "#fff",
        background: isDark ? "transparent" : "#0a0a0a",
        border: isDark ? "1px solid rgba(255,255,255,0.5)" : "none",
        padding: "6px 12px",
        borderRadius: 999,
      }}
    >
      {post.tag}
    </span>
  );

  return (
    <Reveal style={{ height: "100%" }}>
      <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div
          className="dyw-card"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 22,
            background: isDark ? "#0a0a0a" : "#fff",
            border: isDark ? "1px solid #0a0a0a" : "1px solid rgba(10,10,10,0.12)",
            transition: "transform .25s, box-shadow .25s",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 160,
              position: "relative",
              overflow: "hidden",
              background: isDark ? "#0a0a0a" : post.variant === "orbit" ? "#f4f4f5" : "#ececed",
              borderBottom: isDark
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(10,10,10,0.1)",
            }}
          >
            <FlowCanvas mode={post.flow} />
            {tag}
          </div>
          <div style={{ padding: 24 }}>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                color: isDark ? "#7d7d86" : "#9a9aa0",
              }}
            >
              {isDark ? formatDate(post.date) : `${post.num} · ${formatDate(post.date)}`}
            </span>
            <h3
              style={{
                margin: "8px 0 10px",
                fontFamily: "var(--font-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: isDark ? 25 : 23,
                lineHeight: isDark ? 1.12 : 1.16,
                color: isDark ? "#fff" : "#0a0a0a",
                letterSpacing: isDark ? "-0.015em" : "-0.01em",
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.65,
                color: isDark ? "#b6b6bd" : "#6b6b70",
              }}
            >
              {post.excerpt}
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: 18,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: isDark ? "#fff" : "#0a0a0a",
                borderBottom: isDark ? "1px solid #fff" : "1px solid #0a0a0a",
                paddingBottom: 2,
              }}
            >
              Open →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

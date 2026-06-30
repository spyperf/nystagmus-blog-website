"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 12,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "9px 14px",
  transition: "color .25s",
};

export default function Nav() {
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const color = (href: string) => (isActive(href) ? "#0a0a0a" : "#9a9aa0");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px clamp(18px,5vw,56px)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.82)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            position: "relative",
            width: 30,
            height: 30,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid #0a0a0a",
              animation: "dyw-spin 16s linear infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: "50%",
              border: "1.5px solid #0a0a0a",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              animation: "dyw-spinrev 10s linear infinite",
            }}
          />
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#0a0a0a",
            }}
          />
        </span>
        <span
          style={{
            fontFamily: "var(--font-grotesk), sans-serif",
            fontWeight: 700,
            letterSpacing: ".18em",
            fontSize: 15,
            color: "#0a0a0a",
          }}
        >
          LCG
        </span>
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Link href="/" style={{ ...linkStyle, color: color("/") }}>
          Home
        </Link>
        <Link href="/blog" style={{ ...linkStyle, color: color("/blog") }}>
          Blogs
        </Link>
        <Link href="/about" style={{ ...linkStyle, color: color("/about") }}>
          About
        </Link>
        <Link
          href="/blog"
          style={{
            marginLeft: 10,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "11px 20px",
            borderRadius: 999,
            color: "#fff",
            fontWeight: 700,
            border: "1px solid #0a0a0a",
            background: "#0a0a0a",
          }}
        >
          Enter →
        </Link>
      </nav>
    </header>
  );
}

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { decorate, formatDate } from "@/lib/display";
import FlowCanvas from "@/components/FlowCanvas";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Find this post's presentational metadata (tag / variant) from the full list.
  const all = decorate(getAllPosts());
  const meta = all.find((p) => p.slug === slug) ?? all[0];

  return (
    <article
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "46px clamp(20px,4vw,40px) 100px",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <Link
        href="/blog"
        className="dyw-btn dyw-btn-ghost"
        style={{
          fontSize: 12,
          letterSpacing: ".08em",
          padding: "9px 16px",
          marginBottom: 32,
        }}
      >
        ← Back to log
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#fff",
            background: "#0a0a0a",
            padding: "6px 12px",
            borderRadius: 999,
          }}
        >
          {meta?.tag ?? "Log"}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            color: "#9a9aa0",
          }}
        >
          {formatDate(post.date)}
        </span>
      </div>

      <h1
        style={{
          margin: "0 0 22px",
          fontFamily: "var(--font-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(34px,5.5vw,58px)",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: "#0a0a0a",
        }}
      >
        {post.title}
      </h1>

      <div
        style={{
          position: "relative",
          height: 64,
          overflow: "hidden",
          borderRadius: 14,
          border: "1px solid rgba(10,10,10,0.12)",
          marginBottom: 40,
          background: "#ececed",
        }}
      >
        <FlowCanvas mode={meta?.flow ?? "mono"} />
      </div>

      <div className="dyw-prose" style={{ marginTop: 0 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

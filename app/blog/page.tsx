import { getAllPosts } from "@/lib/posts";
import { decorate } from "@/lib/display";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";

export default function BlogPage() {
  const posts = decorate(getAllPosts());

  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "50px clamp(20px,4vw,48px) 90px",
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
          The log
        </span>
        <h1
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--font-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px,7vw,82px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "#0a0a0a",
          }}
        >
          Eye Tracking Journal
        </h1>
        <p
          style={{
            margin: "16px 0 0",
            maxWidth: "56ch",
            color: "#6b6b70",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          Build logs and field notes from the pupil-tracking project. Newest transmissions first.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 24,
        }}
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

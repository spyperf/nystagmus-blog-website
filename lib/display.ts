import { Post } from "@/lib/posts";

export type FlowMode = "mono" | "ringsdark" | "blob";
export type Variant = "wave" | "dark" | "orbit";

export type DisplayPost = Post & {
  num: string;
  tag: string;
  variant: Variant;
  flow: FlowMode;
};

const VARIANTS: Variant[] = ["wave", "dark", "orbit"];
const FLOW: Record<Variant, FlowMode> = {
  wave: "mono",
  dark: "ringsdark",
  orbit: "blob",
};

/** Turn the date "2026-06-29" into "2026 · 06 · 29". */
export function formatDate(date: string): string {
  return (date || "").replace(/-/g, " · ");
}

/** Decorate raw posts with the presentational fields the cards/pages need. */
export function decorate(posts: Post[]): DisplayPost[] {
  return posts.map((p, i) => {
    const variant = VARIANTS[i % VARIANTS.length];
    return {
      ...p,
      num: String(i + 1).padStart(3, "0"),
      tag: i === 0 ? "Build Log" : "Notes",
      variant,
      flow: FLOW[variant],
    };
  });
}

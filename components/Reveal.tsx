"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = delay + "ms";

    const show = () => el.setAttribute("data-shown", "");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            show();
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);

    // Fallback: if it's already in view on mount, reveal shortly after.
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show();
    }, 300);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal style={style}>
      {children}
    </div>
  );
}

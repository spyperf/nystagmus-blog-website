"use client";

import { useEffect, useRef } from "react";

type FlowMode = "split" | "mono" | "dark" | "rings" | "ringsdark" | "blob";

type FlowOpts = {
  lineDensity?: number;
  flowSpeed?: number;
  showStars?: boolean;
  heroInvert?: boolean;
};

// Shared, smoothed pointer position (module singleton).
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

type Entry = { el: HTMLCanvasElement; mode: FlowMode; opts: FlowOpts };
const registry = new Set<Entry>();
let started = false;

function startLoop() {
  if (started || typeof window === "undefined") return;
  started = true;

  window.addEventListener(
    "mousemove",
    (e) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );

  const loop = () => {
    mouse.x += (target.x - mouse.x) * 0.06;
    mouse.y += (target.y - mouse.y) * 0.06;
    const now = performance.now();
    registry.forEach((entry) => {
      if (!entry.el.isConnected) return;
      try {
        drawFlow(entry.el, entry.mode, now, entry.opts);
      } catch {
        /* ignore transient sizing errors */
      }
    });
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function sizeFor(el: HTMLCanvasElement) {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(r.width);
  const h = Math.round(r.height);
  if (el.width !== w * dpr || el.height !== h * dpr) {
    el.width = w * dpr;
    el.height = h * dpr;
    (el as unknown as { __stars: unknown }).__stars = null;
  }
  return { w, h, dpr };
}

function drawFlow(
  el: HTMLCanvasElement,
  mode: FlowMode,
  now: number,
  opts: FlowOpts
) {
  const s = sizeFor(el);
  if (!s) return;
  const { w: W, h: H, dpr } = s;
  const ctx = el.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const speed = (opts.flowSpeed ?? 60) / 60;
  const t = now * 0.001 * speed;
  const mx = mouse.x;
  const my = mouse.y;
  const invert = !!opts.heroInvert;

  const lineWave = (
    baseY: number,
    x: number,
    i: number,
    amp: number,
    amp2: number
  ) =>
    baseY +
    amp * Math.sin(x * 0.012 + t * 0.9 + i * 0.18) +
    amp2 * Math.sin(x * 0.024 - t * 0.6 + i * 0.12);

  if (mode === "split") {
    const density = Math.max(12, Math.round(opts.lineDensity ?? 42));
    const seg = 26;
    const bp: [number, number][] = [];
    for (let k = 0; k <= seg; k++) {
      const yy = (H * k) / seg;
      const bx =
        W * 0.5 +
        Math.sin(yy * 0.006 + t * 0.45) * W * 0.17 +
        Math.sin(yy * 0.013 - t * 0.32) * W * 0.05 +
        mx * W * 0.06;
      bp.push([bx, yy]);
    }
    const light = invert ? "#0a0a0a" : "#efeff1";
    const dark = invert ? "#efeff1" : "#0a0a0a";
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(bp[0][0], 0);
    bp.forEach((p) => ctx.lineTo(p[0], p[1]));
    ctx.lineTo(W, H);
    ctx.lineTo(W, 0);
    ctx.closePath();
    ctx.fillStyle = dark;
    ctx.fill();

    const spacing = H / density;
    const amp = spacing * 1.7 * (0.85 + my * 0.5);
    const amp2 = spacing * 0.6;
    const drawLines = (color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < density; i++) {
        const baseY = spacing * (i + 0.5);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 7) {
          const y = lineWave(baseY, x, i, amp, amp2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(bp[0][0], 0);
    bp.forEach((p) => ctx.lineTo(p[0], p[1]));
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.clip();
    drawLines(dark);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bp[0][0], 0);
    bp.forEach((p) => ctx.lineTo(p[0], p[1]));
    ctx.lineTo(W, H);
    ctx.lineTo(W, 0);
    ctx.closePath();
    ctx.clip();
    drawLines(light);
    if (opts.showStars ?? true) {
      const cast = el as unknown as { __stars: Star[] | null };
      if (!cast.__stars)
        cast.__stars = Array.from({ length: 70 }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          tw: Math.random() * 6.28,
          ts: Math.random() * 0.03 + 0.008,
        }));
      ctx.fillStyle = light;
      cast.__stars.forEach((st) => {
        st.tw += st.ts;
        ctx.globalAlpha = 0.35 + 0.5 * (Math.sin(st.tw) * 0.5 + 0.5);
        ctx.beginPath();
        ctx.arc(st.x + mx * 16, st.y + my * 16, st.r, 0, 6.28);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  } else if (mode === "dark") {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, W, H);
    const n = Math.max(12, Math.round(H / 9));
    const spacing = H / n;
    ctx.strokeStyle = "#efeff1";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < n; i++) {
      const baseY = spacing * (i + 0.5);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const y = lineWave(baseY, x, i, spacing * 1.6, spacing * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (mode === "rings" || mode === "ringsdark") {
    const darkBg = mode === "ringsdark";
    const bg = darkBg ? "#0a0a0a" : "#ececed";
    const fg = darkBg ? "#efeff1" : "#0a0a0a";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2 + mx * 24;
    const cy = H / 2 + my * 18;
    const maxR = Math.max(W, H) * 0.62;
    const rings = 9;
    ctx.strokeStyle = fg;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (let i = 1; i <= rings; i++) {
      const base = (maxR * i) / rings;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.001; a += 0.12) {
        const rr =
          base +
          Math.sin(a * 3 + t + i * 0.5) * (8 + i) +
          Math.sin(a * 5 - t * 0.7) * 5;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, 6.2832);
    ctx.fill();
  } else if (mode === "blob") {
    ctx.fillStyle = "#ececed";
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2 + mx * 20;
    const cy = H / 2 + my * 16;
    const R = Math.min(W, H) * 0.3;
    const blobPath = (scale: number) => {
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.001; a += 0.1) {
        const rr =
          R *
          scale *
          (1 +
            0.18 * Math.sin(a * 3 + t) +
            0.12 * Math.sin(a * 5 - t * 0.7) +
            0.07 * Math.sin(a * 2 + t * 1.3));
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (let sc = 1.9; sc >= 0.7; sc -= 0.3) {
      blobPath(sc);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    blobPath(0.48);
    ctx.fillStyle = "#0a0a0a";
    ctx.fill();
  } else {
    // mono: light bg, dark flowing lines
    ctx.fillStyle = "#ececed";
    ctx.fillRect(0, 0, W, H);
    const n = Math.max(10, Math.round(H / 8));
    const spacing = H / n;
    ctx.strokeStyle = "#0a0a0a";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.42;
    for (let i = 0; i < n; i++) {
      const baseY = spacing * (i + 0.5);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const y = lineWave(baseY, x, i, spacing * 1.6, spacing * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

type Star = { x: number; y: number; r: number; tw: number; ts: number };

export default function FlowCanvas({
  mode = "mono",
  style,
  lineDensity,
  flowSpeed,
  showStars,
  heroInvert,
}: {
  mode?: FlowMode;
  style?: React.CSSProperties;
  lineDensity?: number;
  flowSpeed?: number;
  showStars?: boolean;
  heroInvert?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startLoop();
    const el = ref.current;
    if (!el) return;
    const entry: Entry = {
      el,
      mode,
      opts: { lineDensity, flowSpeed, showStars, heroInvert },
    };
    registry.add(entry);
    // Paint one frame immediately so it isn't blank before the next rAF.
    try {
      drawFlow(el, mode, performance.now(), entry.opts);
    } catch {
      /* ignore */
    }
    return () => {
      registry.delete(entry);
    };
  }, [mode, lineDensity, flowSpeed, showStars, heroInvert]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}

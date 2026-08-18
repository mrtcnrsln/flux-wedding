"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, type TargetAndTransition } from "framer-motion";
import { theme, BODY } from "@/lib/flux";

type TransitionKind = "glow" | "morph" | "slide" | "fade" | "expand";

function getVariants(kind: TransitionKind, dir: number) {
  const base = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] };
  switch (kind) {
    case "glow":
      return {
        initial: { opacity: 0, filter: "brightness(2) blur(8px)" } as TargetAndTransition,
        animate: { opacity: 1, filter: "brightness(1) blur(0px)" } as TargetAndTransition,
        exit: { opacity: 0, filter: "brightness(0.5) blur(4px)" } as TargetAndTransition,
        base,
      };
    case "morph":
      return {
        initial: { opacity: 0, scale: 0.85, borderRadius: "40%" } as TargetAndTransition,
        animate: { opacity: 1, scale: 1, borderRadius: "0%" } as TargetAndTransition,
        exit: { opacity: 0, scale: 1.15, borderRadius: "40%" } as TargetAndTransition,
        base,
      };
    case "slide":
      return {
        initial: { opacity: 0, x: dir * 100 + "%" } as TargetAndTransition,
        animate: { opacity: 1, x: "0%" } as TargetAndTransition,
        exit: { opacity: 0, x: dir * -100 + "%" } as TargetAndTransition,
        base,
      };
    case "expand":
      return {
        initial: { opacity: 0, clipPath: "circle(0% at 50% 50%)" } as TargetAndTransition,
        animate: { opacity: 1, clipPath: "circle(80% at 50% 50%)" } as TargetAndTransition,
        exit: { opacity: 0, clipPath: "circle(0% at 50% 50%)" } as TargetAndTransition,
        base,
      };
    default:
      return {
        initial: { opacity: 0 } as TargetAndTransition,
        animate: { opacity: 1 } as TargetAndTransition,
        exit: { opacity: 0 } as TargetAndTransition,
        base,
      };
  }
}

interface FluxPanelProps {
  panels: { id: string; transition: TransitionKind }[];
  children: ReactNode[];
  onPanelChange?: (i: number) => void;
}

export default function FluxPanel({ panels, children, onPanelChange }: FluxPanelProps) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [busy, setBusy] = useState(false);
  const touchY = useRef(0);
  const lastWheel = useRef(0);
  const total = panels.length;

  const goTo = useCallback((i: number) => {
    if (busy || i === current || i < 0 || i >= total) return;
    setDir(i > current ? 1 : -1);
    setBusy(true);
    setCurrent(i);
    onPanelChange?.(i);
    setTimeout(() => setBusy(false), 800);
  }, [current, total, busy, onPanelChange]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", " "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 800) return;
      lastWheel.current = now;
      if (e.deltaY > 20) next();
      else if (e.deltaY < -20) prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const v = getVariants(panels[current]?.transition || "fade", dir);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={v.base}
          className="absolute inset-0"
        >
          {children[current]}
        </motion.div>
      </AnimatePresence>

      {/* ── Side dots ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9994] flex flex-col gap-3">
        {panels.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-end"
            data-cursor-hover
          >
            <span
              className="absolute right-5 whitespace-nowrap text-[9px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: BODY, color: i === current ? theme.accent : theme.textMuted, letterSpacing: "0.15em" }}
            >
              {p.id}
            </span>
            <motion.div
              animate={{
                width: i === current ? 24 : 6,
                backgroundColor: i === current ? theme.accent : theme.border,
              }}
              transition={{ duration: 0.4 }}
              className="rounded-full"
              style={{ height: 2 }}
            />
          </button>
        ))}
      </div>

      {/* ── Counter ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9994] flex items-center gap-2">
        <span className="text-sm font-bold" style={{ fontFamily: DISPLAY, color: theme.accent }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-xs" style={{ color: theme.border }}>/</span>
        <span className="text-sm" style={{ fontFamily: DISPLAY, color: theme.textMuted }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

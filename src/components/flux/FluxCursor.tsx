"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { theme } from "@/lib/flux";

export default function FluxCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { damping: 20, stiffness: 200 });
  const y = useSpring(cursorY, { damping: 20, stiffness: 200 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) setHovering(false);
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x, y,
          translateX: "-50%", translateY: "-50%",
          width: hovering ? 60 : 32,
          height: hovering ? 60 : 32,
          border: `1px solid ${hovering ? theme.accent : theme.teal}`,
          boxShadow: hovering ? `0 0 20px ${theme.accent}33` : `0 0 10px ${theme.teal}11`,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, box-shadow 0.3s",
          opacity: hovering ? 0.6 : 0.3,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX, y: cursorY,
          translateX: "-50%", translateY: "-50%",
          width: 6,
          height: 6,
          background: `linear-gradient(135deg, ${theme.teal}, ${theme.accent})`,
        }}
      />
    </>
  );
}

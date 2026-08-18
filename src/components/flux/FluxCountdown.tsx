"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { theme, DISPLAY, BODY, WEDDING_DATE } from "@/lib/flux";

function getTime() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return { d: Math.floor(diff / 864e5), h: Math.floor((diff / 36e5) % 24), m: Math.floor((diff / 6e4) % 60), s: Math.floor((diff / 1e3) % 60) };
}

function Unit({ val, label, delay }: { val: number; label: string; delay: number }) {
  const fmt = String(val).padStart(2, "0");
  const [prev, setPrev] = useState(fmt);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (fmt !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(fmt); setFlip(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [fmt, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative h-[50px] sm:h-[60px] md:h-[80px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={fmt}
            initial={flip ? { y: -20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums"
            style={{ fontFamily: DISPLAY, color: theme.accent, textShadow: `0 0 30px ${theme.accent}33` }}
          >
            {fmt}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, delay: delay + 0.15 }}
        className="h-[1px] my-2"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }}
      />
      <span className="text-[9px] uppercase" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.25em" }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function FluxCountdown() {
  const [time, setTime] = useState(getTime);
  useEffect(() => { const i = setInterval(() => setTime(getTime()), 1000); return () => clearInterval(i); }, []);

  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-6" style={{ backgroundColor: theme.bg }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="text-[10px] uppercase mb-4"
        style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
      >
        BULUŞMAMIZA KALAN
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold mb-10"
        style={{ fontFamily: DISPLAY, color: theme.text }}
      >
        Geri Sayım
      </motion.h2>

      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg w-full">
        <Unit val={time.d} label="Gün" delay={0.2} />
        <Unit val={time.h} label="Saat" delay={0.3} />
        <Unit val={time.m} label="Dakika" delay={0.4} />
        <Unit val={time.s} label="Saniye" delay={0.5} />
      </div>
    </section>
  );
}

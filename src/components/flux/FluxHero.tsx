"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY, couple, images } from "@/lib/flux";

export default function FluxHero() {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Background blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${theme.teal}40 0%, ${theme.purple}20 50%, transparent 70%)`,
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] uppercase mb-6"
          style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          BİRLİKTE YAZACAĞIMIZ YENİ HİKÂYENİN İLK SAYFASI
        </motion.p>

        <h1 className="font-bold leading-none" style={{ fontFamily: DISPLAY, color: theme.text }}>
          <motion.span
            className="block text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem]"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {couple.bride.toUpperCase()}
          </motion.span>
          <motion.span
            className="block text-3xl sm:text-4xl md:text-5xl font-light my-2"
            style={{ color: theme.accent }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            &amp;
          </motion.span>
          <motion.span
            className="block text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem]"
            initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {couple.groom.toUpperCase()}
          </motion.span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="h-[2px] mx-auto mt-8"
          style={{ background: `linear-gradient(90deg, ${theme.teal}, ${theme.accent}, ${theme.purple})` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-6 text-xs uppercase"
          style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.25em" }}
        >
          {couple.date} · {couple.time}
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.textMuted} strokeWidth="1">
              <path d="M3 5l4 4 4-4" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

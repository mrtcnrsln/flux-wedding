"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY, couple } from "@/lib/flux";

export default function FluxDate() {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Background glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-8"
        style={{ background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`, filter: "blur(60px)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="text-center relative">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="block font-bold select-none leading-none"
          style={{ fontFamily: DISPLAY, color: theme.accent, fontSize: "clamp(10rem, 30vw, 25rem)" }}
        >
          24
        </motion.span>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: DISPLAY, color: theme.text }}
          >
            AĞUSTOS
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-3xl font-light mt-1"
            style={{ fontFamily: DISPLAY, color: theme.textMuted }}
          >
            2026
          </motion.span>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-[2px] my-5"
            style={{ background: `linear-gradient(90deg, ${theme.teal}, ${theme.accent})` }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-xs uppercase"
            style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
          >
            {couple.day} · {couple.time}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

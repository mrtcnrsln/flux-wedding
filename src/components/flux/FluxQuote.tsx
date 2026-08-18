"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY } from "@/lib/flux";

function GradientReveal({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export default function FluxQuote() {
  return (
    <section className="relative h-full w-full flex items-center overflow-hidden px-8 md:px-20" style={{ backgroundColor: theme.bg }}>
      {/* Subtle gradient orb */}
      <div
        className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full opacity-5"
        style={{ background: `radial-gradient(circle, ${theme.purple} 0%, transparent 70%)`, filter: "blur(80px)" }}
      />

      <div className="max-w-3xl">
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          <GradientReveal text="Bazı anlar vardır," delay={0.3} />
        </motion.p>
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-1"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          <GradientReveal text="bir ömür boyunca" delay={0.9} />
        </motion.p>
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-1"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          <GradientReveal text="hatırlanır." delay={1.5} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-10 text-sm font-light max-w-lg leading-relaxed"
          style={{ fontFamily: BODY, color: theme.textMuted }}
        >
          Hayatımızın en güzel başlangıçlarından birine adım atarken bu özel günü bizimle paylaşmanızı diliyoruz.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-8 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.teal})` }}
        />
      </div>
    </section>
  );
}

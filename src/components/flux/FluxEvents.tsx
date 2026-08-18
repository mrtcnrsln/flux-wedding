"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY, events } from "@/lib/flux";

export default function FluxEvents() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center overflow-hidden px-8 md:px-20" style={{ backgroundColor: theme.bgAlt }}>
      <div className="max-w-4xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-[10px] uppercase block mb-2"
          style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          AKŞAMIN AKIŞI
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-12"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          Program
        </motion.h2>

        <div className="space-y-8">
          {events.map((ev, i) => (
            <motion.div
              key={ev.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-6 md:gap-10 group"
            >
              {/* Time */}
              <span className="text-xl md:text-3xl font-bold w-24 shrink-0 text-right" style={{ fontFamily: DISPLAY, color: theme.accent }}>
                {ev.time}
              </span>

              {/* Gradient line */}
              <div className="hidden md:block flex-1 h-[1px] relative">
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${theme.border}, ${theme.border})` }} />
                <motion.div
                  className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-700"
                  style={{ background: `linear-gradient(90deg, ${theme.teal}40, ${theme.accent}40)` }}
                />
              </div>

              {/* Label */}
              <span className="text-xs uppercase tracking-widest" style={{ fontFamily: BODY, color: theme.text, letterSpacing: "0.2em" }}>
                {ev.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

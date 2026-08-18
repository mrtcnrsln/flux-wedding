"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY, storyTimeline, images } from "@/lib/flux";

export default function FluxStory() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center overflow-hidden px-6 md:px-12" style={{ backgroundColor: theme.bg }}>
      <div className="text-center mb-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-[10px] uppercase block mb-2"
          style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          BİZİM
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          Hikâyemiz
        </motion.h2>
      </div>

      {/* Timeline line */}
      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="h-[1px] absolute top-[40px]"
          style={{ background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {storyTimeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              className="flex flex-col"
            >
              {/* Image with glow */}
              <div className="relative aspect-[4/5] overflow-hidden mb-4 group rounded-sm" data-cursor-hover>
                <img src={images.story[i]} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${theme.bg}CC 0%, transparent 50%)` }} />
                {/* Glow line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${theme.teal}, ${theme.accent})` }} />
              </div>

              <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: DISPLAY, color: theme.accent }}>
                {item.year}
              </span>
              <h3 className="text-sm md:text-base font-semibold mt-1" style={{ fontFamily: DISPLAY, color: theme.text }}>
                {item.title}
              </h3>
              <p className="text-xs font-light mt-0.5" style={{ fontFamily: BODY, color: theme.textMuted }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

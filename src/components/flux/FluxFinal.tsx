"use client";

import { motion } from "framer-motion";
import { theme, DISPLAY, BODY, couple, images } from "@/lib/flux";

export default function FluxFinal() {
  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.final} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: `${theme.bg}E0` }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${theme.teal} 0%, transparent 70%)`, filter: "blur(80px)", top: "20%", left: "10%" }} />
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${theme.purple} 0%, transparent 70%)`, filter: "blur(80px)", bottom: "20%", right: "15%" }} />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
          style={{ fontFamily: DISPLAY, color: theme.text }}
        >
          BUGÜNÜ BİRLİKTE
          <br />
          UNUTULMAZ KILALIM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8"
        >
          <p className="text-xl md:text-2xl font-bold" style={{ fontFamily: DISPLAY, color: theme.accent }}>
            {couple.bride} &amp; {couple.groom}
          </p>
          <p className="text-xs mt-3" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>
            {couple.dateShort}
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-[2px] mx-auto mt-8"
          style={{ background: `linear-gradient(90deg, ${theme.teal}, ${theme.accent})` }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 text-[9px] uppercase"
          style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          davetimigor.com
        </motion.p>
      </div>
    </section>
  );
}

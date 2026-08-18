"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { theme, DISPLAY, BODY, couple } from "@/lib/flux";

/**
 * FLUX ENTRY — "The Blob Morphs"
 *
 * 1. Dark screen with floating particles
 * 2. A fluid blob shape appears and morphs
 * 3. Colors shift between teal and purple
 * 4. The blob splits to reveal the names
 * 5. CTA appears with glow effect
 */
export default function FluxEntry({ onOpen }: { onOpen: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  const handleOpen = useCallback(() => {
    setDismissed(true);
    setTimeout(() => onOpen(), 1200);
  }, [onOpen]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="flux-entry"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          style={{ backgroundColor: theme.bg }}
          onClick={handleOpen}
        >
          {/* ── Floating Particles ── */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? theme.teal : i % 3 === 1 ? theme.purple : theme.accent,
                opacity: 0.15 + Math.random() * 0.2,
              }}
              animate={{
                y: [0, -30 - Math.random() * 40, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* ── Morphing Blob ── */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Blob shape using SVG */}
            <motion.svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="w-[220px] h-[220px] md:w-[280px] md:h-[280px]"
            >
              <defs>
                <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <motion.stop
                    offset="0%"
                    animate={{ stopColor: [theme.teal, theme.purple, theme.accent, theme.teal] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.stop
                    offset="100%"
                    animate={{ stopColor: [theme.purple, theme.accent, theme.teal, theme.purple] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </linearGradient>
                <filter id="blobBlur">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
              <motion.path
                animate={{
                  d: [
                    "M140,40 C180,40 220,70 230,110 C240,150 230,190 200,220 C170,250 130,250 100,230 C70,210 40,180 40,140 C40,100 70,50 100,40 C110,35 130,38 140,40Z",
                    "M140,35 C185,30 225,65 235,105 C245,145 240,195 210,225 C180,255 125,255 95,230 C65,205 35,170 35,135 C35,95 60,50 95,38 C110,33 130,33 140,35Z",
                    "M145,38 C190,35 230,70 238,110 C246,150 235,200 205,228 C175,256 120,250 90,225 C60,200 32,165 35,130 C38,95 65,48 100,38 C115,34 135,36 145,38Z",
                    "M140,40 C180,40 220,70 230,110 C240,150 230,190 200,220 C170,250 130,250 100,230 C70,210 40,180 40,140 C40,100 70,50 100,40 C110,35 130,38 140,40Z",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                fill="url(#blobGrad)"
                opacity={0.15}
                filter="url(#blobBlur)"
              />
            </motion.svg>

            {/* Names inside blob */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: DISPLAY, color: theme.text }}
              >
                {couple.bride}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg my-1"
                style={{ fontFamily: DISPLAY, color: theme.accent }}
              >
                &amp;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: DISPLAY, color: theme.text }}
              >
                {couple.groom}
              </motion.p>
            </div>
          </motion.div>

          {/* ── Date ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-8 text-xs uppercase"
            style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}
          >
            {couple.dateShort}
          </motion.p>

          {/* ── CTA with glow ── */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            className="mt-8 text-xs uppercase px-8 py-3 rounded-full transition-all duration-500"
            style={{
              fontFamily: BODY,
              color: theme.bg,
              backgroundColor: theme.accent,
              letterSpacing: "0.2em",
              boxShadow: `0 0 30px ${theme.accent}33`,
            }}
            data-cursor-hover
          >
            DAVETİYEMİZİ KEŞFEDİN
          </motion.button>

          {/* ── Bottom hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="absolute bottom-8 text-[10px] uppercase"
            style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}
          >
            tıklayın veya dokunun
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

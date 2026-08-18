"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { theme, DISPLAY, BODY } from "@/lib/flux";

const inputStyle = {
  backgroundColor: "transparent",
  borderBottom: `1px solid ${theme.border}`,
  color: theme.text,
  fontFamily: BODY,
  outline: "none",
  width: "100%",
  padding: "8px 0",
  fontSize: "14px",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

export default function FluxRSVP() {
  const [sel, setSel] = useState<"yes" | "no" | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = useMutation(api.rsvps.submit);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        name: fd.get("name") as string,
        attending: sel === "yes",
        guestCount: Number(fd.get("guestCount")) || 1,
        companion: (fd.get("companion") as string) || undefined,
        notes: (fd.get("notes") as string) || undefined,
      });
      setDone(true);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = theme.accent;
    e.currentTarget.style.boxShadow = `0 1px 0 0 ${theme.accent}66`;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = theme.border;
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden px-6" style={{ backgroundColor: theme.bgAlt }}>
      <div className="max-w-md w-full text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[10px] uppercase block mb-2" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.3em" }}>
          LCV
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: DISPLAY, color: theme.text }}>
          Sizi de Bekliyoruz
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xs font-light mb-8" style={{ fontFamily: BODY, color: theme.textMuted }}>
          Bu özel günümüzde bizimle olup olmayacağınızı paylaşmanız bizi çok mutlu eder.
        </motion.p>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
              <p className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: theme.accent }}>Teşekkür ederiz!</p>
            </motion.div>
          ) : sel === null ? (
            <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSel("yes")} className="px-8 py-3 text-[10px] uppercase rounded-full transition-colors" style={{ fontFamily: BODY, color: theme.bg, backgroundColor: theme.accent, letterSpacing: "0.2em", boxShadow: `0 0 20px ${theme.accent}33` }} data-cursor-hover>
                Katılacağım
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSel("no")} className="px-8 py-3 text-[10px] uppercase rounded-full border transition-colors" style={{ fontFamily: BODY, color: theme.textMuted, borderColor: theme.border, letterSpacing: "0.2em" }} data-cursor-hover>
                Katılamayacağım
              </motion.button>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="text-left space-y-5">
              {sel === "yes" && (
                <>
                  <div><label className="text-[9px] uppercase block mb-1" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>Ad Soyad</label><input name="name" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
                  <div><label className="text-[9px] uppercase block mb-1" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>Kişi Sayısı</label><select name="guestCount" style={{ ...inputStyle, appearance: "none" as const }} onFocus={onFocus} onBlur={onBlur}><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>
                  <div><label className="text-[9px] uppercase block mb-1" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>Refakatçi</label><input name="companion" style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
                </>
              )}
              {sel === "no" && (
                <div><label className="text-[9px] uppercase block mb-1" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>Ad Soyad</label><input name="name" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
              )}
              <div><label className="text-[9px] uppercase block mb-1" style={{ fontFamily: BODY, color: theme.textMuted, letterSpacing: "0.2em" }}>Not</label><textarea name="notes" rows={2} style={{ ...inputStyle, resize: "none" as const }} onFocus={onFocus} onBlur={onBlur} /></div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={loading} className="flex-1 py-3 text-[10px] uppercase rounded-full transition-colors disabled:opacity-50" style={{ fontFamily: BODY, color: theme.bg, backgroundColor: theme.accent, letterSpacing: "0.2em", boxShadow: `0 0 15px ${theme.accent}22` }}>{loading ? "..." : "Gönder"}</button>
                <button type="button" onClick={() => setSel(null)} className="px-4 py-3 text-[10px] uppercase rounded-full border transition-colors" style={{ fontFamily: BODY, color: theme.textMuted, borderColor: theme.border, letterSpacing: "0.2em" }}>Geri</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

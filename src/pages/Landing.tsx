import { useState } from "react";
import { motion } from "framer-motion";

import FluxEntry from "@/components/flux/FluxEntry";
import FluxPanel from "@/components/flux/FluxPanel";
import FluxHero from "@/components/flux/FluxHero";
import FluxQuote from "@/components/flux/FluxQuote";
import FluxStory from "@/components/flux/FluxStory";
import FluxDate from "@/components/flux/FluxDate";
import FluxEvents from "@/components/flux/FluxEvents";
import FluxVenue from "@/components/flux/FluxVenue";
import FluxCountdown from "@/components/flux/FluxCountdown";
import FluxMemories from "@/components/flux/FluxMemories";
import FluxRSVP from "@/components/flux/FluxRSVP";
import FluxGuestMessage from "@/components/flux/FluxGuestMessage";
import FluxFinal from "@/components/flux/FluxFinal";
import FluxCursor from "@/components/flux/FluxCursor";

const panels = [
  { id: "Giriş", transition: "expand" as const },
  { id: "Sözler", transition: "glow" as const },
  { id: "Hikâye", transition: "morph" as const },
  { id: "Tarih", transition: "fade" as const },
  { id: "Program", transition: "slide" as const },
  { id: "Mekân", transition: "glow" as const },
  { id: "Geri Sayım", transition: "expand" as const },
  { id: "Anılar", transition: "morph" as const },
  { id: "LCV", transition: "fade" as const },
  { id: "Mesaj", transition: "glow" as const },
  { id: "Kapanış", transition: "expand" as const },
];

export default function Landing() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: "#0D0D12", color: "#EAE6E1" }}>
      <FluxCursor />

      {!opened && <FluxEntry onOpen={() => setOpened(true)} />}

      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <FluxPanel panels={panels}>
            {[
              <div key="hero" className="h-screen w-screen"><FluxHero /></div>,
              <div key="quote" className="h-screen w-screen"><FluxQuote /></div>,
              <div key="story" className="h-screen w-screen"><FluxStory /></div>,
              <div key="date" className="h-screen w-screen"><FluxDate /></div>,
              <div key="events" className="h-screen w-screen"><FluxEvents /></div>,
              <div key="venue" className="h-screen w-screen"><FluxVenue /></div>,
              <div key="countdown" className="h-screen w-screen"><FluxCountdown /></div>,
              <div key="memories" className="h-screen w-screen"><FluxMemories /></div>,
              <div key="rsvp" className="h-screen w-screen"><FluxRSVP /></div>,
              <div key="guest" className="h-screen w-screen"><FluxGuestMessage /></div>,
              <div key="final" className="h-screen w-screen"><FluxFinal /></div>,
            ]}
          </FluxPanel>
        </motion.div>
      )}
    </div>
  );
}

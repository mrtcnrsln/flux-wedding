// ═══════════════════════════════════════════════════════════
// FLUX — Fluid & Dynamic Wedding Invitation
// Dark theme with morphing blobs, liquid animations
// ═══════════════════════════════════════════════════════════

export const WEDDING_DATE = new Date("2026-08-24T19:00:00+03:00");

export const theme = {
  bg: "#0D0D12",
  bgAlt: "#12121A",
  text: "#EAE6E1",
  textMuted: "#6B6570",
  accent: "#E8C547",
  accentAlt: "#C9A96E",
  teal: "#2DD4A8",
  purple: "#9B6DFF",
  border: "rgba(234,230,225,0.08)",
} as const;

export const DISPLAY = "'Syne', 'Space Grotesk', sans-serif";
export const BODY = "'Space Grotesk', 'Inter', system-ui, sans-serif";

export const images = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  story: [
    "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
  ],
  venue: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80",
  final: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&q=80",
  memories: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80",
    "https://images.unsplash.com/photo-1521517407911-5652843807db?w=600&q=80",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80",
  ],
} as const;

export const couple = {
  bride: "Elif",
  groom: "Kerem",
  date: "24 Ağustos 2026",
  dateShort: "24.08.2026",
  day: "Cumartesi",
  time: "19:00",
} as const;

export const storyTimeline = [
  { year: "2019", title: "İlk Karşılaşma", desc: "Kaderin bizi buluşturduğu an" },
  { year: "2021", title: "İlk Yolculuk", desc: "Birlikte keşfettiğimiz dünya" },
  { year: "2024", title: "Teklif", desc: "Evet dediğimiz o an" },
  { year: "2026", title: "Başlangıç", desc: "Yeni bir hikâye" },
] as const;

export const events = [
  { time: "19:00", label: "Nikâh" },
  { time: "20:00", label: "Yemek" },
  { time: "21:30", label: "İlk Dans" },
  { time: "22:00", label: "Eğlence" },
] as const;

export const venue = {
  name: "Laluna Garden",
  location: "Sarıyer, İstanbul",
  address: "Kemerburgaz Caddesi No:123",
  mapUrl: "https://maps.google.com/?q=Laluna+Garden+Sarıyer+İstanbul",
};

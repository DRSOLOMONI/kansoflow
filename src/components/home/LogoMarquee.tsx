import { useLanguage } from "@/contexts/LanguageContext";

const logos = [
  "TechScale", "DataFlow", "Northwind", "Aperture", "Helix", "Vertex",
  "Beacon", "Lumen", "Cinder", "Quanta", "Nimbus", "Forge",
];

export default function LogoMarquee() {
  const { lang } = useLanguage();
  const label = lang === "ar" ? "موثوق به من" : "Trusted by teams at";

  return (
    <section className="py-16 border-y border-border/60 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-heading">
          {label}
        </p>
      </div>
      <div className="relative">
        <div
          className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap will-change-transform"
          style={{ width: "max-content" }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="font-heading text-2xl md:text-3xl font-semibold text-muted-foreground/60 hover:text-primary transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
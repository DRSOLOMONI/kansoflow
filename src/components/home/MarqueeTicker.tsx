import { useLanguage } from "@/contexts/LanguageContext";

export default function MarqueeTicker() {
  const { lang } = useLanguage();
  const phrase =
    lang === "ar"
      ? "كل سير عمل هو فرصة. وسّع نطاقك مع كانسو فلو."
      : "Every workflow is an opportunity. Scale with Kanso Flow.";

  const items = Array.from({ length: 6 }, () => phrase);

  return (
    <section className="py-16 border-y border-primary/20 overflow-hidden bg-card/30">
      <div
        className="flex gap-12 whitespace-nowrap animate-[ticker_30s_linear_infinite] will-change-transform"
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              {text}
            </span>
            <span className="w-3 h-3 rounded-full bg-primary green-glow-sm shrink-0" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PlatformTagline() {
  const { lang } = useLanguage();

  const eyebrow = lang === "ar" ? "كانسو فلو هو" : "Kanso Flow is";
  const line1 = lang === "ar" ? "منصة أتمتة الذكاء الاصطناعي" : "The AI Automation Platform";
  const line2 =
    lang === "ar" ? "لأي عمل، على أي نطاق." : "For Any Business, At Any Scale.";
  const sub =
    lang === "ar"
      ? "أتمت ١٠٠٪ من سير العمل المتكرر. وحّد أدواتك. أطلق فرقك. اعمل ٢٤/٧."
      : "Automate 100% of your repetitive workflows. Unify your tools. Free your teams. Run 24/7.";

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-6"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-foreground">{line1}</span>
          <br />
          <span className="green-gradient-text">{line2}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}
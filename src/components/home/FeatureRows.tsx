import { motion } from "framer-motion";
import { Globe, Cpu, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeatureRows() {
  const { lang } = useLanguage();

  const rows = [
    {
      icon: Globe,
      eyebrow: lang === "ar" ? "عالمي" : "Global by default",
      title:
        lang === "ar"
          ? "أتمت العمليات بأي لغة"
          : "Automate operations in any language",
      desc:
        lang === "ar"
          ? "ادخل أسواقًا جديدة فورًا. وكلاء الذكاء الاصطناعي يعملون بطلاقة بأكثر من ٥٠ لغة، مع توطين حقيقي لكل سير عمل."
          : "Enter new markets instantly. AI agents fluent in 50+ languages with true localization across every workflow.",
    },
    {
      icon: Cpu,
      eyebrow: lang === "ar" ? "تعمل بالطيار الآلي" : "Run on autopilot",
      title:
        lang === "ar"
          ? "حرّر فرقك من العمل المتكرر"
          : "Free your teams from repetitive work",
      desc:
        lang === "ar"
          ? "دع كانسو فلو يتعامل مع الإدخال، التحقق، التوجيه، والمتابعات. فرقك تركز على الاستراتيجية."
          : "Let Kanso Flow handle intake, validation, routing, and follow-ups. Your teams focus on strategy.",
    },
    {
      icon: Clock,
      eyebrow: lang === "ar" ? "لا تفوّت فرصة" : "Never miss an opportunity",
      title:
        lang === "ar"
          ? "نشط على مدار ٢٤ ساعة، ٧ أيام في الأسبوع"
          : "Active 24/7, every second of every day",
      desc:
        lang === "ar"
          ? "كل طلب، كل عميل محتمل، كل تذكرة دعم تُعالج فورًا. لا تأخير، لا فجوات."
          : "Every request, every lead, every support ticket handled instantly. No delays, no gaps.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 space-y-32">
        {rows.map((row, i) => {
          const Icon = row.icon;
          const reverse = i % 2 === 1;
          return (
            <div
              key={row.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
                  {row.eyebrow}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                  {row.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                  {row.desc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl border border-primary/20 bg-card overflow-hidden green-glow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(153 100% 50% / 0.18) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-2xl bg-card border border-primary/40 flex items-center justify-center animate-pulse-glow">
                    <Icon className="text-primary" size={48} />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Comparison() {
  const { lang } = useLanguage();

  const t = {
    eyebrow: lang === "ar" ? "كانسو فلو مقابل الآخرين" : "Kanso Flow vs. Others",
    title:
      lang === "ar"
        ? "اشعر بالفرق بنفسك"
        : "Feel the difference yourself",
    rows: [
      {
        kanso:
          lang === "ar"
            ? "أتمتة شاملة بزمن استجابة أقل من ١٠٠ مللي ثانية بأكثر من ٥٠ لغة."
            : "End-to-end automation with <100ms latency in 50+ languages.",
        others:
          lang === "ar"
            ? "تأخير، إعدادات هشّة، ودعم محدود للغات."
            : "Slow, brittle setups with limited language support.",
      },
      {
        kanso:
          lang === "ar"
            ? "توجيه ذكي ثلاثي الطبقات يبقى مطابقًا للسياق."
            : "Triple-layer prompting that stays on-context, on-script.",
        others:
          lang === "ar"
            ? "موجّهات أحادية الطبقة تفقد السياق سريعًا."
            : "Single-layer prompts that lose context and drift.",
      },
      {
        kanso:
          lang === "ar"
            ? "تكاملات مباشرة مع أكثر من ٩٥ أداة وأنظمة المؤسسات."
            : "Direct integrations with 95+ tools and enterprise systems.",
        others:
          lang === "ar"
            ? "تكاملات صلبة تفشل في تدفقات العمل المعقدة."
            : "Rigid integrations that fail in complex workflows.",
      },
      {
        kanso:
          lang === "ar"
            ? "امتثال على مستوى المؤسسات: SOC 2، HIPAA، GDPR."
            : "Enterprise-grade compliance: SOC 2, HIPAA, GDPR.",
        others:
          lang === "ar"
            ? "تغطية امتثال محدودة، بدون حماية حقيقية للبيانات الإقليمية."
            : "Limited compliance, no real regional data protections.",
      },
      {
        kanso:
          lang === "ar"
            ? "قابلية توسع لا نهائية عبر آلاف من سير العمل المتزامن."
            : "Infinitely scalable across thousands of concurrent workflows.",
        others:
          lang === "ar"
            ? "صعوبة في التوسع بعد البرامج التجريبية."
            : "Struggle to scale beyond pilot programs.",
      },
    ],
  };

  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl border-2 border-primary/40 bg-card green-glow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-heading text-xl font-bold">
                <span className="text-foreground">Kanso</span>
                <span className="text-primary ms-1.5">Flow</span>
              </span>
            </div>
            <ul className="space-y-4">
              {t.rows.map((r, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="text-primary" size={14} />
                  </span>
                  <span className="text-foreground text-sm leading-relaxed">{r.kanso}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-border bg-card/40">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-heading text-xl font-bold text-muted-foreground">
                {lang === "ar" ? "الآخرون" : "Others"}
              </span>
            </div>
            <ul className="space-y-4">
              {t.rows.map((r, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <X className="text-muted-foreground" size={14} />
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {r.others}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
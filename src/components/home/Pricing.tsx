import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Store, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const plans = [
  {
    icon: Phone,
    name: { en: "Starter", ar: "البداية" },
    price: "OMR 39",
    note: { en: "/month", ar: "/شهرياً" },
    description: {
      en: "For cafes that need every call answered and summarized.",
      ar: "للمقاهي التي تحتاج الرد على كل مكالمة وتلخيصها.",
    },
    features: {
      en: ["AI answers common calls", "Hours, location, menu FAQ", "Missed-call recovery", "Call summaries by email"],
      ar: ["يرد على المكالمات الشائعة", "الدوام والموقع وأسئلة المنيو", "استرجاع المكالمات الفائتة", "ملخصات المكالمات بالبريد"],
    },
  },
  {
    icon: Store,
    name: { en: "Growth", ar: "النمو" },
    price: "OMR 79",
    note: { en: "/month", ar: "/شهرياً" },
    popular: true,
    description: {
      en: "For busy restaurants taking pickup orders and reservations.",
      ar: "للمطاعم النشطة التي تستقبل طلبات استلام وحجوزات.",
    },
    features: {
      en: ["Pickup order capture", "Order confirmation flow", "Reservations and catering leads", "SMS or WhatsApp handoff"],
      ar: ["التقاط طلبات الاستلام", "تأكيد الطلب قبل الإرسال", "حجوزات وطلبات كاترينغ", "تسليم عبر SMS أو واتساب"],
    },
  },
  {
    icon: Building2,
    name: { en: "Pro", ar: "المتقدم" },
    price: "OMR 135",
    note: { en: "/location", ar: "/فرع" },
    description: {
      en: "For teams that want integrations, analytics, and tighter controls.",
      ar: "للفِرق التي تحتاج تكاملات وتحليلات وتحكم أعلى.",
    },
    features: {
      en: ["POS or dashboard handoff", "Call recordings and transcripts", "Bilingual scripts", "Priority tuning and support"],
      ar: ["تسليم إلى POS أو لوحة تحكم", "تسجيلات ونصوص المكالمات", "نصوص عربية وإنجليزية", "دعم وضبط بأولوية"],
    },
  },
];

export default function Pricing() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="py-24 border-t border-border/40" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
            {isAr ? "اشتراك شهري واضح" : "Simple monthly pricing"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {isAr ? "ابدأ صغيراً." : "Start small."}{" "}
            <span className="green-gradient-text">{isAr ? "اثبت العائد بسرعة." : "Prove ROI fast."}</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {isAr
              ? "ابدأ بالمكالمات الفائتة وطلبات الاستلام، ثم أضف الحجوزات والتكاملات عندما يصبح العائد واضحاً."
              : "Start with missed calls and pickup orders, then add reservations and integrations once the value is obvious."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name.en}
                className={`relative rounded-[8px] border bg-card p-6 ${plan.popular ? "border-primary/60 green-glow-sm" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                    {isAr ? "الأفضل للمقاهي" : "Best for cafes"}
                  </div>
                )}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{isAr ? plan.name.ar : plan.name.en}</h3>
                <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-muted-foreground">
                  {isAr ? plan.description.ar : plan.description.en}
                </p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{isAr ? plan.note.ar : plan.note.en}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {(isAr ? plan.features.ar : plan.features.en).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">{isAr ? "احجز تجربة مدفوعة" : "Book a paid pilot"}</Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            {isAr
              ? "يمكن إضافة رسوم إعداد للمنيو والنصوص حسب حجم المطعم."
              : "Menu and script setup can be charged separately depending on restaurant complexity."}
          </p>
        </div>
      </div>
    </section>
  );
}

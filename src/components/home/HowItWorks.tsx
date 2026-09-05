import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ClipboardList, MessageSquareText, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [ClipboardList, MessageSquareText, Rocket];
const numbers = ["01", "02", "03"];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const copy = {
    title: isAr ? "كيف" : "How it",
    titleAccent: isAr ? "نبدأ" : "works",
    subtitle: isAr
      ? "من أول مكالمة تجريبية إلى وكيل يرد على عملائك خلال أيام."
      : "From the first sample call to a live agent answering customers in days.",
    steps: isAr
      ? [
          {
            title: "نجمع المنيو والقواعد",
            description: "نضبط ساعات العمل، الأصناف، الإضافات، الحساسية، مناطق التوصيل، ومتى يجب تحويل المكالمة للموظف.",
          },
          {
            title: "نبني السكربت والتسليم",
            description: "نحدد طريقة كلام زارا، تأكيد الطلب، ووجهة الملخص: SMS، واتساب، بريد، لوحة تحكم، أو تكامل لاحق.",
          },
          {
            title: "نطلق ونحسن",
            description: "نراقب المكالمات الأولى، نراجع الأخطاء، ونضبط الردود حتى تصبح مناسبة لأسلوب مطعمك.",
          },
        ]
      : [
          {
            title: "Map your menu and rules",
            description: "We configure hours, items, modifiers, allergens, delivery zones, and the exact moments Zara should hand off to staff.",
          },
          {
            title: "Build the script and handoff",
            description: "We tune Zara's tone, confirmation flow, and where each summary goes: SMS, WhatsApp, email, dashboard, or later POS integration.",
          },
          {
            title: "Go live and tune calls",
            description: "We monitor early calls, review mistakes, and tighten answers until the agent fits the way your restaurant actually works.",
          },
        ],
  };

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {copy.title} <span className="text-primary">{copy.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {copy.steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={step.title}
                  className={`relative text-center ${
                    isVisible ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-card border border-primary/20 flex items-center justify-center mb-6 green-glow-sm">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <span className="text-primary/40 font-heading text-sm font-bold tracking-widest">
                    {numbers[i]}
                  </span>
                  <h3 className="font-heading font-bold text-foreground text-xl mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

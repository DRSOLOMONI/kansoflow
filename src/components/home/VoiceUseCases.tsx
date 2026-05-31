import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, Headphones, Stethoscope, ShoppingBag, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type UseCase = {
  id: string;
  icon: typeof Phone;
  label: { en: string; ar: string };
  tag: { en: string; ar: string };
  script: { en: { agent: string; caller: string; agent2: string }; ar: { agent: string; caller: string; agent2: string } };
  outcome: { en: string; ar: string };
};

const USE_CASES: UseCase[] = [
  {
    id: "reception",
    icon: Phone,
    label: { en: "Reception", ar: "الاستقبال" },
    tag: { en: "Never miss a call", ar: "لا تفوّت أي مكالمة" },
    script: {
      en: {
        agent: "Thanks for calling Bloom Dental — this is Aya. How can I help?",
        caller: "Hi, I'd like to book a cleaning next week.",
        agent2: "Of course. I have Tuesday at 2pm or Thursday at 10am — which works?",
      },
      ar: {
        agent: "أهلاً بك في عيادة بلوم — معك آية. كيف أقدر أساعدك؟",
        caller: "أبغى أحجز موعد تنظيف الأسبوع الجاي.",
        agent2: "تمام. عندي الثلاثاء ٢ ظهراً أو الخميس ١٠ صباحاً — أيهما أنسب؟",
      },
    },
    outcome: { en: "Booked into Google Calendar · SMS confirmation sent", ar: "تم الحجز في تقويم Google · تم إرسال تأكيد SMS" },
  },
  {
    id: "booking",
    icon: Calendar,
    label: { en: "Bookings", ar: "الحجوزات" },
    tag: { en: "Books while you sleep", ar: "يحجز وأنت نائم" },
    script: {
      en: {
        agent: "I can see two openings this week — Wednesday 11am or Friday 4pm.",
        caller: "Friday works better.",
        agent2: "Booked. You'll get a confirmation text in a second.",
      },
      ar: {
        agent: "عندي موعدين هالأسبوع — الأربعاء ١١ صباحاً أو الجمعة ٤ عصراً.",
        caller: "الجمعة أنسب.",
        agent2: "تم الحجز. راح يوصلك تأكيد برسالة خلال ثوانٍ.",
      },
    },
    outcome: { en: "Calendar synced · Reminder scheduled · CRM updated", ar: "تم مزامنة التقويم · جدولة تذكير · تحديث CRM" },
  },
  {
    id: "support",
    icon: Headphones,
    label: { en: "Support", ar: "الدعم" },
    tag: { en: "24/7, no hold music", ar: "دعم على مدار الساعة" },
    script: {
      en: {
        agent: "I can see your order shipped yesterday. It's out for delivery this afternoon.",
        caller: "Perfect — can you text me the tracking?",
        agent2: "Sending it now. Anything else?",
      },
      ar: {
        agent: "طلبك تم شحنه أمس وراح يوصلك بعد الظهر.",
        caller: "ممتاز — ممكن ترسل لي رابط التتبع؟",
        agent2: "أرسلته لك الحين. شي ثاني؟",
      },
    },
    outcome: { en: "Ticket auto-resolved · Tracking SMS delivered", ar: "تم حل التذكرة · إرسال رابط التتبع" },
  },
  {
    id: "clinics",
    icon: Stethoscope,
    label: { en: "Clinics", ar: "العيادات" },
    tag: { en: "Triage & reminders", ar: "فرز وتذكير" },
    script: {
      en: {
        agent: "I'll need your date of birth to pull up your file — go ahead.",
        caller: "March 12, 1991.",
        agent2: "Got it. Dr. Reyes has Thursday at 9 — should I lock it in?",
      },
      ar: {
        agent: "أحتاج تاريخ ميلادك علشان أفتح ملفك — تفضل.",
        caller: "١٢ مارس ١٩٩١.",
        agent2: "تم. د. ريّس متاح الخميس الساعة ٩ — أحجز لك؟",
      },
    },
    outcome: { en: "Patient verified · Appointment confirmed", ar: "تم التحقق من المريض · تأكيد الموعد" },
  },
  {
    id: "ecom",
    icon: ShoppingBag,
    label: { en: "E-commerce", ar: "التجارة" },
    tag: { en: "Recover lost carts", ar: "استرجاع السلات" },
    script: {
      en: {
        agent: "Hi Omar — noticed you left a few things in your cart. Want a quick 10% nudge?",
        caller: "Sure, send it.",
        agent2: "Done — code's in your inbox. Free shipping kicks in too.",
      },
      ar: {
        agent: "أهلاً عمر — لاحظت إنك تركت سلتك. تبي خصم ١٠٪؟",
        caller: "أكيد، أرسله.",
        agent2: "تم — الكود وصل بريدك، والشحن مجاني كمان.",
      },
    },
    outcome: { en: "Cart recovered · Discount issued · Order placed", ar: "استرجاع السلة · إصدار خصم · إتمام الطلب" },
  },
  {
    id: "auto",
    icon: Wrench,
    label: { en: "Auto", ar: "السيارات" },
    tag: { en: "Diagnose like Kai", ar: "تشخيص مثل كاي" },
    script: {
      en: {
        agent: "Tell me what's happening — any sounds, lights, or smells?",
        caller: "A clicking noise every time I brake.",
        agent2: "Sounds like worn brake pads. Don't push it past today — let me book a slot.",
      },
      ar: {
        agent: "وصف لي الوضع — أصوات، أضواء، روائح؟",
        caller: "فيه صوت طقطقة كل ما أكبس الفرامل.",
        agent2: "غالباً تيل فرامل مستهلك. لا تأخر — أحجز لك موعد اليوم.",
      },
    },
    outcome: { en: "Diagnosis logged · Service booked", ar: "تسجيل التشخيص · حجز الصيانة" },
  },
];

export default function VoiceUseCases() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [active, setActive] = useState(USE_CASES[0].id);
  const current = USE_CASES.find((u) => u.id === active)!;

  return (
    <section className="py-24 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
            {isAr ? "حالات الاستخدام" : "Where Kai shows up"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {isAr ? "وكيل صوتي واحد." : "One voice agent."}{" "}
            <span className="green-gradient-text">{isAr ? "وظائف لا تُحصى." : "Endless jobs."}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-10 max-w-4xl mx-auto">
          {USE_CASES.map((u) => {
            const Icon = u.icon;
            const isActive = u.id === active;
            return (
              <button
                key={u.id}
                onMouseEnter={() => setActive(u.id)}
                onClick={() => setActive(u.id)}
                className={`group relative rounded-xl border p-3 transition-all duration-300 ${
                  isActive
                    ? "border-primary/60 bg-primary/10 green-glow-sm"
                    : "border-border bg-card/40 hover:border-primary/30"
                }`}
              >
                <Icon
                  className={`mx-auto mb-1.5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
                  size={20}
                />
                <div className={`text-[11px] font-heading font-bold tracking-wide ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {isAr ? u.label.ar : u.label.en}
                </div>
              </button>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              dir={isAr ? "rtl" : "ltr"}
              className="rounded-3xl border border-primary/20 bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/40">
                <span className="text-primary text-[10px] font-mono tracking-[0.2em] uppercase">
                  {isAr ? current.tag.ar : current.tag.en}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {isAr ? "مكالمة مباشرة" : "LIVE CALL"}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <Bubble role="agent" text={isAr ? current.script.ar.agent : current.script.en.agent} isAr={isAr} />
                <Bubble role="caller" text={isAr ? current.script.ar.caller : current.script.en.caller} isAr={isAr} />
                <Bubble role="agent" text={isAr ? current.script.ar.agent2 : current.script.en.agent2} isAr={isAr} />
              </div>

              <div className="px-5 py-3 border-t border-border bg-primary/5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-primary font-mono tracking-wider text-[10px] uppercase">
                    {isAr ? "النتيجة" : "Outcome"}
                  </span>
                  <span className="text-foreground/80">{isAr ? current.outcome.ar : current.outcome.en}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, text, isAr }: { role: "agent" | "caller"; text: string; isAr: boolean }) {
  const isAgent = role === "agent";
  return (
    <motion.div
      initial={{ opacity: 0, x: isAgent ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
          isAgent
            ? "bg-primary/10 border border-primary/30 text-foreground rounded-[4px_18px_18px_18px]"
            : "bg-background/60 border border-border text-foreground/85 rounded-[18px_18px_4px_18px]"
        }`}
      >
        <div className={`text-[9px] font-mono tracking-wider mb-1 ${isAgent ? "text-primary" : "text-muted-foreground"}`}>
          {isAgent ? (isAr ? "كاي" : "KAI") : isAr ? "المتصل" : "CALLER"}
        </div>
        {text}
      </div>
    </motion.div>
  );
}
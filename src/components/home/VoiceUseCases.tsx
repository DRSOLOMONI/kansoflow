import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ShoppingBag, Calendar, CakeSlice, MessageSquare, Languages } from "lucide-react";
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
    id: "rush",
    icon: Phone,
    label: { en: "Rush Calls", ar: "وقت الزحمة" },
    tag: { en: "Answers while staff serve guests", ar: "يرد بينما الفريق يخدم العملاء" },
    script: {
      en: {
        agent: "Thanks for calling Luna Cafe. I can take pickup orders or help with the menu.",
        caller: "Are you open, and can I order two lattes for pickup?",
        agent2: "Yes, open until 11pm. Two lattes for pickup. Whole milk or oat milk?",
      },
      ar: {
        agent: "أهلاً بك في لونا كافيه. أقدر آخذ طلب استلام أو أساعدك في المنيو.",
        caller: "هل أنتم مفتوحين؟ وأقدر أطلب لاتيهين للاستلام؟",
        agent2: "نعم، مفتوحين إلى ١١ مساءً. لاتيهين للاستلام. حليب عادي أو شوفان؟",
      },
    },
    outcome: { en: "Call answered · Pickup order started · Staff not interrupted", ar: "تم الرد · بدء طلب الاستلام · بدون تعطيل الموظفين" },
  },
  {
    id: "pickup",
    icon: ShoppingBag,
    label: { en: "Pickup Orders", ar: "طلبات الاستلام" },
    tag: { en: "Clean order summaries", ar: "ملخصات طلب واضحة" },
    script: {
      en: {
        agent: "I have one club sandwich, no tomato, and a lemon mint. Pickup in 20 minutes?",
        caller: "Yes, under Mariam.",
        agent2: "Perfect. I repeated the order and sent it to the counter with your name and pickup time.",
      },
      ar: {
        agent: "عندي كلوب ساندويتش بدون طماطم وليمون نعناع. الاستلام بعد ٢٠ دقيقة؟",
        caller: "نعم، باسم مريم.",
        agent2: "تمام. كررت الطلب وأرسلته للكاشير مع الاسم ووقت الاستلام.",
      },
    },
    outcome: { en: "Order confirmed · Customer name captured · Sent to team", ar: "تأكيد الطلب · حفظ اسم العميل · إرساله للفريق" },
  },
  {
    id: "booking",
    icon: Calendar,
    label: { en: "Reservations", ar: "الحجوزات" },
    tag: { en: "Books tables after hours", ar: "يحجز الطاولات بعد الدوام" },
    script: {
      en: {
        agent: "I can help with that. How many guests and what time tonight?",
        caller: "Four people at 8:30.",
        agent2: "Booked for four at 8:30 under Ahmed. You will get a confirmation text now.",
      },
      ar: {
        agent: "أكيد. كم عدد الأشخاص وأي وقت اليوم؟",
        caller: "أربعة أشخاص الساعة ٨:٣٠.",
        agent2: "تم الحجز لأربعة أشخاص الساعة ٨:٣٠ باسم أحمد. سيصلك تأكيد الآن.",
      },
    },
    outcome: { en: "Reservation captured · SMS confirmation ready", ar: "تم تسجيل الحجز · تأكيد SMS جاهز" },
  },
  {
    id: "catering",
    icon: CakeSlice,
    label: { en: "Catering", ar: "كاترينغ" },
    tag: { en: "Captures high-value leads", ar: "يلتقط طلبات عالية القيمة" },
    script: {
      en: {
        agent: "For 35 people, I will collect the date, budget, dietary notes, and preferred dishes.",
        caller: "It is for Thursday lunch, mostly sandwiches and desserts.",
        agent2: "Got it. I sent the catering brief to the manager so they can quote you quickly.",
      },
      ar: {
        agent: "لـ ٣٥ شخصاً، سأخذ التاريخ والميزانية والملاحظات الغذائية والأطباق المطلوبة.",
        caller: "الخميس وقت الغداء، غالباً ساندويتشات وحلويات.",
        agent2: "تم. أرسلت ملخص الكاترينغ للمدير حتى يجهز عرض السعر بسرعة.",
      },
    },
    outcome: { en: "Lead qualified · Details structured · Manager alerted", ar: "تأهيل العميل · تنظيم التفاصيل · تنبيه المدير" },
  },
  {
    id: "faq",
    icon: MessageSquare,
    label: { en: "Menu FAQ", ar: "أسئلة المنيو" },
    tag: { en: "Answers repeat questions", ar: "يرد على الأسئلة المتكررة" },
    script: {
      en: {
        agent: "The pistachio cake contains dairy and nuts. We also have a vegan brownie today.",
        caller: "Great. Can you hold two pieces?",
        agent2: "Yes. I will hold two vegan brownies for pickup under your name.",
      },
      ar: {
        agent: "كيكة الفستق تحتوي على ألبان ومكسرات. ولدينا براوني نباتي اليوم.",
        caller: "ممتاز. ممكن تحجز قطعتين؟",
        agent2: "نعم. سأحجز قطعتين براوني نباتي للاستلام باسمك.",
      },
    },
    outcome: { en: "Allergen answer · Item held · Fewer staff interruptions", ar: "إجابة حساسية · حجز المنتج · تقليل مقاطعة الموظفين" },
  },
  {
    id: "bilingual",
    icon: Languages,
    label: { en: "Arabic + English", ar: "عربي + إنجليزي" },
    tag: { en: "Switches language naturally", ar: "يبدّل اللغة بسلاسة" },
    script: {
      en: {
        agent: "I can continue in Arabic or English. Which is easier for you?",
        caller: "Arabic please, but send the order summary in English.",
        agent2: "Absolutely. I will speak Arabic and send the kitchen summary in English.",
      },
      ar: {
        agent: "أقدر أكمل بالعربية أو الإنجليزية. أيهما أسهل لك؟",
        caller: "عربي لو سمحت، لكن أرسل ملخص الطلب بالإنجليزي.",
        agent2: "أكيد. سأتحدث بالعربية وأرسل ملخص المطبخ بالإنجليزية.",
      },
    },
    outcome: { en: "Caller understood · Team receives clear summary", ar: "فهم العميل · الفريق يستلم ملخصاً واضحاً" },
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
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
            {isAr ? "مكالمات المطاعم" : "Restaurant call workflows"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {isAr ? "وكيل واحد يغطي" : "One agent for the calls"}{" "}
            <span className="green-gradient-text">{isAr ? "أصعب لحظات اليوم." : "that slow your team down."}</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {isAr
              ? "ابدأ بالمكالمات التي تضيع وقت الفريق: الاستلام، الحجوزات، الكاترينغ، وأسئلة المنيو."
              : "Start with the calls that steal staff time: pickup orders, reservations, catering requests, and repeat menu questions."}
          </p>
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
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/40 gap-3">
                <span className="text-primary text-[10px] font-mono tracking-[0.2em] uppercase">
                  {isAr ? current.tag.ar : current.tag.en}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground shrink-0">
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
                <div className="flex items-center gap-2 text-xs flex-wrap">
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
          {isAgent ? (isAr ? "زارا" : "ZARA") : isAr ? "المتصل" : "CALLER"}
        </div>
        {text}
      </div>
    </motion.div>
  );
}

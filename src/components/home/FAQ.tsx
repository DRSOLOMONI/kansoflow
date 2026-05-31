import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { lang } = useLanguage();

  const t = {
    eyebrow: lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions",
    title:
      lang === "ar" ? "لا تزال لديك أسئلة؟" : "Still have questions?",
    sub:
      lang === "ar"
        ? "تواصل معنا ودعنا نناقشها."
        : "Get in touch and let's talk through it.",
    faqs: [
      {
        q: lang === "ar" ? "ماذا يبني كانسو فلو؟" : "What does Kanso Flow build?",
        a:
          lang === "ar"
            ? "نبني وكلاء صوتيين بالذكاء الاصطناعي يردّون على المكالمات، يؤهّلون العملاء، يحجزون المواعيد، ويقدمون الدعم — بالعربية والإنجليزية."
            : "We build voice AI agents that answer calls, qualify leads, book appointments, and handle support — fully in English and Arabic.",
      },
      {
        q: lang === "ar" ? "كم يبدو الصوت طبيعياً؟" : "How natural does the voice sound?",
        a:
          lang === "ar"
            ? "معظم المتصلين لا يميّزون. نضبط الصوت، الإيقاع، والمقاطعات حتى تبدو المحادثة بشرية."
            : "Most callers can't tell. We tune voice, pacing, and interruptions until conversations feel human.",
      },
      {
        q: lang === "ar" ? "هل يعمل بالعربية؟" : "Does it work in Arabic?",
        a:
          lang === "ar"
            ? "نعم — أصلياً بالعربية والإنجليزية، مع إمكانية التبديل بينهما داخل المحادثة."
            : "Yes — natively in Arabic and English, with mid-conversation language switching.",
      },
      {
        q: lang === "ar" ? "كم نحتاج لنطلق؟" : "How quickly can we go live?",
        a:
          lang === "ar"
            ? "وكيل صوتي يعمل خلال أيام عادةً. التكاملات الكاملة تكتمل خلال ٢ إلى ٤ أسابيع."
            : "A working voice agent is usually live within days. Full integrations land in 2–4 weeks.",
      },
      {
        q: lang === "ar" ? "هل يتصل بالتقويم و CRM؟" : "Does it connect to our calendar and CRM?",
        a:
          lang === "ar"
            ? "نعم. يحجز في تقويم Google/Outlook ويكتب في الـ CRM لحظياً."
            : "Yes. The agent books into Google/Outlook calendars and writes back to your CRM in real time.",
      },
      {
        q: lang === "ar" ? "ماذا لو لم يستطع الوكيل المساعدة؟" : "What happens if the agent can't help?",
        a:
          lang === "ar"
            ? "ينقل المكالمة لإنسان أو يجدول معاودة الاتصال — المتصل لا يُترك أبداً."
            : "It gracefully transfers to a human or schedules a callback — never leaving the caller stuck.",
      },
    ],
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.sub}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {t.faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="text-start text-foreground font-heading text-lg hover:text-primary hover:no-underline py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
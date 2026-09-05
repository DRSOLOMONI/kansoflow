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
      lang === "ar" ? "أسئلة صاحب المقهى قبل التجربة" : "What owners ask before trying it",
    sub:
      lang === "ar"
        ? "إجابات واضحة قبل أن تضع الذكاء الاصطناعي على خط هاتفك."
        : "Clear answers before you put an AI agent on your phone line.",
    faqs: [
      {
        q: lang === "ar" ? "هل يستبدل كانسو فلو نظام نقاط البيع؟" : "Does Kanso Flow replace my POS?",
        a:
          lang === "ar"
            ? "لا. في البداية يعمل كوكيل هاتف يلتقط الطلبات والمكالمات ويرسل ملخصاً واضحاً للفريق. يمكن إضافة تكاملات POS لاحقاً حسب النظام المستخدم."
            : "No. Start with Kanso Flow as the phone agent that captures calls and sends clean summaries to your team. POS integrations can be added later depending on your system.",
      },
      {
        q: lang === "ar" ? "كيف نقلل أخطاء الطلبات؟" : "How do you reduce wrong orders?",
        a:
          lang === "ar"
            ? "كل طلب يتم تكراره للعميل قبل الإرسال. نجمع الاسم، وقت الاستلام، الإضافات، والملاحظات، ثم نرسل ملخصاً مكتوباً للفريق."
            : "Every order is repeated back before it is sent. We collect name, pickup time, modifiers, and notes, then send a written summary to the team.",
      },
      {
        q: lang === "ar" ? "هل يعمل بالعربية والإنجليزية؟" : "Does it work in Arabic and English?",
        a:
          lang === "ar"
            ? "نعم. يمكنه الرد بالعربية والإنجليزية والتبديل حسب لغة المتصل، مع إرسال ملخص واضح للفريق باللغة التي تفضلها."
            : "Yes. It can answer in Arabic and English, switch based on the caller, and send the team summary in the language you prefer.",
      },
      {
        q: lang === "ar" ? "ماذا يحدث إذا لم يفهم المتصل؟" : "What happens if the agent cannot help?",
        a:
          lang === "ar"
            ? "نحدد قواعد تحويل واضحة: يحول للموظف، يأخذ رسالة، أو يطلب معاودة الاتصال. الهدف ألا يبقى العميل عالقاً."
            : "We set clear fallback rules: transfer to staff, take a message, or request a callback. The caller should never feel stuck.",
      },
      {
        q: lang === "ar" ? "كم يستغرق الإطلاق؟" : "How long does setup take?",
        a:
          lang === "ar"
            ? "يعتمد على حجم المنيو وطريقة التسليم. تجربة أولى يمكن إطلاقها خلال أيام بعد تجهيز المنيو، ساعات العمل، السكربت، ورقم الهاتف."
            : "It depends on menu complexity and handoff method. A first pilot can usually launch in days once the menu, hours, script, and phone flow are ready.",
      },
      {
        q: lang === "ar" ? "كيف أعرف أنه يستحق الاشتراك الشهري؟" : "How do I know the monthly fee is worth it?",
        a:
          lang === "ar"
            ? "نقيس المكالمات المجابة، الطلبات أو العملاء المحتملين الملتقطين، المكالمات الفائتة المسترجعة، والوقت الذي وفرناه على الفريق."
            : "We track answered calls, captured orders or leads, missed-call recovery, and the staff time saved so the ROI is visible.",
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

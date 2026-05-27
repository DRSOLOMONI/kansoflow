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
        q: lang === "ar" ? "ما هو كانسو فلو وماذا يفعل؟" : "What is Kanso Flow and what does it do?",
        a:
          lang === "ar"
            ? "كانسو فلو هي منصة استشارات وتنفيذ لأتمتة الذكاء الاصطناعي. نصمم، ننشر، وندير سير عمل ذكي ينهي العمل المتكرر."
            : "Kanso Flow is an AI automation consultancy and platform. We design, deploy, and manage intelligent workflows that eliminate repetitive work.",
      },
      {
        q: lang === "ar" ? "هل تقدمون فترة تجريبية مجانية؟" : "Do you offer a free trial?",
        a:
          lang === "ar"
            ? "نقدم استشارة مجانية واستكشاف نطاق العمل. بعدها نقترح مشروعًا تجريبيًا منخفض المخاطر يثبت العائد قبل التوسع."
            : "We offer a free discovery consultation, then propose a low-risk pilot that proves ROI before scaling.",
      },
      {
        q:
          lang === "ar"
            ? "هل يستبدل كانسو فلو الموظفين البشريين؟"
            : "Does Kanso Flow replace human employees?",
        a:
          lang === "ar"
            ? "لا. نزيل العمل المتكرر حتى تركز فرقك على الاستراتيجية والإبداع والقرارات عالية القيمة."
            : "No. We remove repetitive work so your teams can focus on strategy, creativity, and high-value decisions.",
      },
      {
        q: lang === "ar" ? "ما مدى أمان كانسو فلو؟" : "How secure is Kanso Flow?",
        a:
          lang === "ar"
            ? "نبني وفق معايير SOC 2، HIPAA، و GDPR مع تشفير شامل وضوابط وصول صارمة."
            : "We build to SOC 2, HIPAA, and GDPR standards with end-to-end encryption and strict access controls.",
      },
      {
        q:
          lang === "ar"
            ? "كم يستغرق الإطلاق؟"
            : "How quickly can we get started?",
        a:
          lang === "ar"
            ? "معظم العمليات التجريبية تكون مباشرة خلال أسبوعين. التطبيقات الكاملة على مستوى المؤسسة من ٤ إلى ٨ أسابيع."
            : "Most pilots are live within 2 weeks. Full enterprise rollouts take 4–8 weeks.",
      },
      {
        q:
          lang === "ar"
            ? "هل تتكامل مع أنظمتنا الحالية؟"
            : "Does it integrate with our existing systems?",
        a:
          lang === "ar"
            ? "نعم. لدينا أكثر من ٩٥ تكاملًا جاهزًا، ويمكننا بناء موصلات مخصصة للأنظمة القديمة."
            : "Yes. 95+ ready integrations, and we can build custom connectors for legacy systems.",
      },
      {
        q:
          lang === "ar"
            ? "هل أحتاج إلى مهارات تقنية لاستخدامه؟"
            : "Do I need technical skills to use it?",
        a:
          lang === "ar"
            ? "لا. نقوم بكل الإعداد والتكوين والصيانة. فرقك تستخدم لوحات معلومات بسيطة."
            : "No. We handle all setup, configuration, and maintenance. Your teams use simple dashboards.",
      },
      {
        q:
          lang === "ar"
            ? "هل يتوسع مع أحجام كبيرة؟"
            : "Does it scale to high volumes?",
        a:
          lang === "ar"
            ? "نعم. تعمل بنيتنا التحتية على آلاف العمليات المتزامنة عبر مناطق عالمية متعددة."
            : "Yes. Our infrastructure handles thousands of concurrent workflows across multiple global regions.",
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
import { motion } from "framer-motion";
import { Building2, Heart, ShoppingBag, Banknote, Truck, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IndustriesGrid() {
  const { lang } = useLanguage();

  const t = {
    eyebrow: lang === "ar" ? "للصناعات" : "Industry Proven",
    title:
      lang === "ar"
        ? "أتمتة مُختبرة لكل قطاع"
        : "Battle-tested automation for every industry",
    sub:
      lang === "ar"
        ? "جاهز لأي صناعة، من تأهيل العملاء إلى عمليات الواجهة الخلفية. تكاملات آمنة ومتعددة اللغات."
        : "Ready for any industry — from customer onboarding to back-office ops. Secure, multilingual integrations included.",
    items: [
      {
        icon: Banknote,
        name: lang === "ar" ? "التمويل" : "Finance",
        desc:
          lang === "ar"
            ? "أتمت الامتثال، طلبات القروض، والتحقق من الهوية."
            : "Automate compliance, loan applications, and identity verification.",
      },
      {
        icon: Heart,
        name: lang === "ar" ? "الرعاية الصحية" : "Healthcare",
        desc:
          lang === "ar"
            ? "تأهيل المرضى، التذكيرات، والتحقق من التأمين."
            : "Patient intake, reminders, and insurance verification.",
      },
      {
        icon: ShoppingBag,
        name: lang === "ar" ? "التجارة الإلكترونية" : "E-commerce",
        desc:
          lang === "ar"
            ? "إدارة المخزون التنبؤية وأتمتة دعم العملاء."
            : "Predictive inventory management and support automation.",
      },
      {
        icon: Cpu,
        name: lang === "ar" ? "البرمجيات / SaaS" : "SaaS",
        desc:
          lang === "ar"
            ? "تأهيل المستخدمين، تحليلات الاستخدام، ودعم الذكاء الاصطناعي."
            : "User onboarding, usage analytics, and AI-powered support.",
      },
      {
        icon: Truck,
        name: lang === "ar" ? "اللوجستيات" : "Logistics",
        desc:
          lang === "ar"
            ? "تحسين المسار، التتبع، وأتمتة المستندات."
            : "Route optimization, tracking, and document automation.",
      },
      {
        icon: Building2,
        name: lang === "ar" ? "المؤسسات" : "Enterprise",
        desc:
          lang === "ar"
            ? "توحيد البيانات وأتمتة العمليات بين الإدارات."
            : "Unify data and automate cross-departmental processes.",
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
          <p className="mt-6 text-muted-foreground text-lg">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-8 rounded-2xl border border-border bg-card card-hover"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-xl">
                    {item.name}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
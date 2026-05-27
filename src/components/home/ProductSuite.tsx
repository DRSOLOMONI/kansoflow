import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Workflow, Bot, BarChart3, Plug, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductSuite() {
  const { lang } = useLanguage();

  const t = {
    eyebrow: lang === "ar" ? "مجموعة منتجاتنا" : "Our Product Suite",
    title: lang === "ar" ? "تعرّف على كانسو فلو" : "Get to know Kanso Flow",
    sub:
      lang === "ar"
        ? "كل ما تحتاجه شركتك لتشغيل العمليات على نطاق واسع: أتمتة، توجيه ذكي، تكاملات عميقة، كل ذلك في مكان واحد."
        : "Everything your business needs to run operations at scale: automation, smart routing, deep integrations, all in one place.",
    items: [
      {
        icon: Workflow,
        title: lang === "ar" ? "منشئ سير العمل" : "Workflow Builder",
        desc:
          lang === "ar"
            ? "صمّم وأطلق سير عمل معقد بدون كود."
            : "Design and ship complex workflows without writing code.",
        to: "/services",
      },
      {
        icon: Bot,
        title: lang === "ar" ? "وكلاء الذكاء الاصطناعي" : "AI Agents",
        desc:
          lang === "ar"
            ? "وكلاء محادثة يتعاملون مع المهام، الدعم، والمبيعات."
            : "Conversational agents that handle tasks, support, and sales.",
        to: "/services",
      },
      {
        icon: Plug,
        title: lang === "ar" ? "مركز التكاملات" : "Integrations Hub",
        desc:
          lang === "ar"
            ? "اتصل بـ ٩٥+ أداة تستخدمها فرقك بالفعل."
            : "Connect to 95+ tools your teams already use.",
        to: "/services",
      },
      {
        icon: BarChart3,
        title: lang === "ar" ? "ذكاء العمليات" : "Process Intelligence",
        desc:
          lang === "ar"
            ? "تحليلات في الوقت الفعلي لكل سير عمل آلي."
            : "Real-time analytics across every automated workflow.",
        to: "/services",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={item.to}
                  className="group relative block p-8 rounded-2xl border border-border bg-card card-hover h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={26} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  <ArrowUpRight
                    className="absolute top-6 end-6 text-muted-foreground group-hover:text-primary transition-colors"
                    size={18}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
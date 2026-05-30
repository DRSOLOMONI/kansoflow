import { motion } from "framer-motion";
import { Mail, FileText, Database, Send, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WorkflowDiagram() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const inputs = isAr
    ? [
        { label: "إيميل عميل", Icon: Mail },
        { label: "نموذج موقع", Icon: FileText },
        { label: "قاعدة بيانات", Icon: Database },
      ]
    : [
        { label: "Customer email", Icon: Mail },
        { label: "Web form", Icon: FileText },
        { label: "Your database", Icon: Database },
      ];

  const outputs = isAr
    ? [
        { label: "رد فوري", Icon: Send },
        { label: "تذكرة مُحوّلة", Icon: FileText },
        { label: "متابعة مجدولة", Icon: Mail },
      ]
    : [
        { label: "Instant reply", Icon: Send },
        { label: "Routed ticket", Icon: FileText },
        { label: "Scheduled follow-up", Icon: Mail },
      ];

  return (
    <section className="py-28 section-gradient relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
            {isAr ? "كيف يبدو في الواقع" : "What it actually looks like"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {isAr ? "كل شيء يدخل من جهة. يخرج منظماً من الأخرى." : "Everything in from one side. Sorted out the other."}
          </h2>
        </div>

        <div className="relative grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Inputs */}
          <div className="space-y-4">
            {inputs.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 p-3 lg:p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition"
                >
                  <Icon className="text-muted-foreground shrink-0" size={20} />
                  <span className="text-foreground text-xs lg:text-sm font-medium truncate">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Brain / hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-primary/10 border-2 border-primary/50 flex items-center justify-center animate-pulse-glow">
              <Bot className="text-primary" size={40} />
            </div>
            <span className="mt-3 text-primary text-[10px] lg:text-xs font-mono tracking-widest">
              {isAr ? "كانسو فلو" : "KANSO FLOW"}
            </span>
          </motion.div>

          {/* Outputs */}
          <div className="space-y-4">
            {outputs.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 p-3 lg:p-4 rounded-xl border border-primary/30 bg-card green-glow-sm"
                >
                  <Icon className="text-primary shrink-0" size={20} />
                  <span className="text-foreground text-xs lg:text-sm font-medium truncate">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Connecting SVG lines (decorative, hidden on small) */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="line-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="hsl(153 100% 50% / 0)" />
                <stop offset="50%" stopColor="hsl(153 100% 50% / 0.6)" />
                <stop offset="100%" stopColor="hsl(153 100% 50% / 0)" />
              </linearGradient>
            </defs>
            {[80, 200, 320].map((y, i) => (
              <motion.path
                key={`in-${i}`}
                d={`M 250 ${y} Q 400 ${y} 480 200`}
                stroke="url(#line-grad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
              />
            ))}
            {[80, 200, 320].map((y, i) => (
              <motion.path
                key={`out-${i}`}
                d={`M 520 200 Q 600 ${y} 750 ${y}`}
                stroke="url(#line-grad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
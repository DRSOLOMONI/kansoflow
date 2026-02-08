import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const metrics = [
  { value: "340%", label: "Average ROI" },
  { value: "60+", label: "Projects Delivered" },
  { value: "85%", label: "Time Saved" },
  { value: "98%", label: "Client Retention" },
];

const testimonials = [
  {
    quote: "Kanso Flow transformed our entire operations. What used to take days now takes minutes.",
    author: "Sarah Chen",
    role: "CTO, TechScale Inc.",
  },
  {
    quote: "The simplicity of their solutions is remarkable. They truly understand the art of removing complexity.",
    author: "Marcus Webb",
    role: "VP Operations, DataFlow",
  },
];

export default function Metrics() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-muted-foreground text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-xl border border-border bg-card"
            >
              <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.author}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

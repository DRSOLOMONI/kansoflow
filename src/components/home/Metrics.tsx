import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Metrics() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {t.metrics.items.map((metric, i) => (
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
          {t.metrics.testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-xl border border-border bg-card"
            >
              <p className="text-foreground leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

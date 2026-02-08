import { Zap, Shield, TrendingUp, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Zap, Shield, TrendingUp, Layers];

export default function ValueProposition() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 section-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.value.title} <span className="text-primary">{t.value.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.value.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.value.benefits.map((benefit, i) => {
            const Icon = icons[i];
            return (
              <div
                key={benefit.title}
                className={`p-6 rounded-xl border border-border bg-card card-hover ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

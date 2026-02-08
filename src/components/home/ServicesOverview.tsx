import { Link } from "react-router-dom";
import { ArrowRight, Bot, Workflow, BrainCircuit, Database, Plug } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Workflow, Bot, BrainCircuit, Plug, Database];

export default function ServicesOverview() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 section-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.servicesOverview.title} <span className="text-primary">{t.servicesOverview.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.servicesOverview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.servicesOverview.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <Link
                to="/services"
                key={service.title}
                className={`group p-6 rounded-xl border border-border bg-card card-hover block ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon className="text-primary mb-4" size={28} />
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.servicesOverview.learnMore} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

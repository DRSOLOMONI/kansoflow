import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Workflow, Bot, BrainCircuit, Plug, Database,
  ArrowRight, CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Workflow, Bot, BrainCircuit, Plug, Database];

export default function Services() {
  const { t } = useLanguage();
  const services = t.servicesPage.services;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t.servicesPage.heroTitle1}{" "}
              <span className="relative">
                <span className="text-primary">{t.servicesPage.heroTitleAccent}</span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 rounded-full" />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.servicesPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="container mx-auto px-6 space-y-8 max-w-4xl">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-8 border-s-4 border-s-primary card-hover"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.servicesPage.theProblem}</h4>
                    <ul className="space-y-2">
                      {service.problems.map((p) => (
                        <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-3">{t.servicesPage.theOutcome}</h4>
                    <ul className="space-y-2">
                      {service.outcomes.map((o) => (
                        <li key={o} className="text-sm text-foreground flex items-start gap-2">
                          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={16} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.industries.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.servicesPage.ctaTitle} <span className="text-primary">{t.servicesPage.ctaTitleAccent}</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            {t.servicesPage.ctaSubtitle}
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              {t.servicesPage.ctaButton}
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

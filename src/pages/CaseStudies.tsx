import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const metricIcons = [Clock, DollarSign, TrendingUp];

export default function CaseStudies() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(t.caseStudiesPage.filters[0]);

  const filtered = activeFilter === t.caseStudiesPage.filters[0]
    ? t.caseStudiesPage.studies
    : t.caseStudiesPage.studies.filter((c) => c.tag === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t.caseStudiesPage.heroTitle}{" "}
              <span className="relative">
                <span className="text-primary">{t.caseStudiesPage.heroTitleAccent}</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.caseStudiesPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {t.caseStudiesPage.filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground green-glow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="pb-24">
        <div className="container mx-auto px-6 space-y-12 max-w-4xl">
          {filtered.map((study, i) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-8 card-hover border-s-4 border-s-primary"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {study.tag}
              </span>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">{study.title}</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.caseStudiesPage.theComplexity}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{study.complexity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-2">
                    {t.caseStudiesPage.theFlow}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{study.flow}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {study.metrics.map((m, mi) => {
                  const MIcon = metricIcons[mi % metricIcons.length];
                  return (
                    <div key={m.label} className="text-center p-4 rounded-lg bg-secondary">
                      <MIcon className="text-primary mx-auto mb-2" size={20} />
                      <div className="text-2xl font-heading font-bold text-primary">{m.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.caseStudiesPage.ctaTitle} <span className="text-primary">{t.caseStudiesPage.ctaTitleAccent}</span>
          </h2>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              {t.caseStudiesPage.ctaButton}
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

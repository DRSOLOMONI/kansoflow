import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CaseStudyPreview() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-24 section-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.casePreview.title} <span className="text-primary">{t.casePreview.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.casePreview.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.casePreview.cases.map((c, i) => (
            <Link
              to="/case-studies"
              key={c.title}
              className={`group p-6 rounded-xl border border-border bg-card card-hover block ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {c.tag}
              </span>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors">
                {c.title}
              </h3>
              <p className="text-primary font-heading font-bold text-sm mb-4">{c.result}</p>
              <span className="text-muted-foreground text-sm inline-flex items-center gap-1 group-hover:text-primary transition-colors">
                {t.casePreview.readFullStory} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

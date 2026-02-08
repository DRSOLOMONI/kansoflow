import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Eye, Trophy, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const valueIcons = [Sparkles, Eye, Trophy, Handshake];

export default function About() {
  const { t } = useLanguage();

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
              {t.aboutPage.heroTitle}{" "}
              <span className="text-primary">{t.aboutPage.heroTitleAccent}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.aboutPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative ps-8 border-s-2 border-primary/30"
          >
            <div className="absolute start-0 top-0 w-2 h-2 -translate-x-[5px] rtl:translate-x-[5px] rounded-full bg-primary" />
            <p className="text-foreground text-lg leading-relaxed mb-6">
              {t.aboutPage.philosophy1}
              <span className="text-primary font-semibold">{t.aboutPage.philosophyAccent}</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.aboutPage.philosophy2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 section-gradient">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            {t.aboutPage.valuesTitle} <span className="text-primary">{t.aboutPage.valuesTitleAccent}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.aboutPage.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-border bg-card text-center card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            {t.aboutPage.teamTitle} <span className="text-primary">{t.aboutPage.teamTitleAccent}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.aboutPage.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card card-hover"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-heading font-bold text-lg">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-foreground text-center">{member.name}</h3>
                <p className="text-primary text-sm text-center mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.aboutPage.ctaTitle} <span className="text-primary">{t.aboutPage.ctaTitleAccent}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            {t.aboutPage.ctaSubtitle}
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              {t.aboutPage.ctaButton}
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

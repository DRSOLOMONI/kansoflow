import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";

const filters = ["All", "FinTech", "Healthcare", "E-Commerce", "SaaS", "Logistics"];

const caseStudies = [
  {
    id: "fintech-compliance",
    tag: "FinTech",
    title: "Automating Compliance Workflows",
    complexity: "A leading fintech firm was drowning in manual compliance checks, with 12-person teams spending 60% of their time on repetitive documentation.",
    flow: "We deployed an AI-powered compliance automation system that intelligently routes, validates, and documents regulatory requirements in real-time.",
    metrics: [
      { icon: Clock, value: "72%", label: "Reduction in processing time" },
      { icon: DollarSign, value: "$1.8M", label: "Annual savings" },
      { icon: TrendingUp, value: "99.7%", label: "Compliance accuracy" },
    ],
  },
  {
    id: "healthcare-intake",
    tag: "Healthcare",
    title: "AI-Powered Patient Intake",
    complexity: "A hospital network struggled with patient onboarding taking 45+ minutes, leading to frustrated patients and overwhelmed staff.",
    flow: "We built an intelligent intake system with AI-powered form processing, automated insurance verification, and smart scheduling.",
    metrics: [
      { icon: Clock, value: "3x", label: "Faster onboarding" },
      { icon: TrendingUp, value: "92%", label: "Patient satisfaction" },
      { icon: DollarSign, value: "$890K", label: "Annual savings" },
    ],
  },
  {
    id: "ecommerce-inventory",
    tag: "E-Commerce",
    title: "Intelligent Inventory Management",
    complexity: "A fast-growing e-commerce brand faced constant stockouts and overstocking, losing millions in revenue and warehousing costs.",
    flow: "We implemented predictive AI that forecasts demand patterns, automates reordering, and optimizes warehouse allocation across 12 facilities.",
    metrics: [
      { icon: DollarSign, value: "$2.1M", label: "Annual savings" },
      { icon: TrendingUp, value: "94%", label: "Forecast accuracy" },
      { icon: Clock, value: "40%", label: "Less dead stock" },
    ],
  },
  {
    id: "saas-support",
    tag: "SaaS",
    title: "AI-Driven Customer Support",
    complexity: "A B2B SaaS platform with 50K+ users was overwhelmed by support tickets, with average resolution times exceeding 48 hours.",
    flow: "We deployed an AI assistant that handles tier-1 support, intelligently escalates complex issues, and provides proactive solutions.",
    metrics: [
      { icon: Clock, value: "< 2min", label: "Avg response time" },
      { icon: TrendingUp, value: "60%", label: "Tickets auto-resolved" },
      { icon: DollarSign, value: "$540K", label: "Support cost savings" },
    ],
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter((c) => c.tag === activeFilter);

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
              Complexity{" "}
              <span className="relative">
                <span className="text-primary">Transformed</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories of businesses that found their flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
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
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-8 card-hover border-l-4 border-l-primary"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {study.tag}
              </span>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">{study.title}</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    The Complexity
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{study.complexity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-2">
                    The Flow
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{study.flow}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {study.metrics.map((m) => (
                  <div key={m.label} className="text-center p-4 rounded-lg bg-secondary">
                    <m.icon className="text-primary mx-auto mb-2" size={20} />
                    <div className="text-2xl font-heading font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 cta-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Your Story Could Be <span className="text-primary">Next</span>
          </h2>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Start Your Transformation
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

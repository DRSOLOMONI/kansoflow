import { Zap, Shield, TrendingUp, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Deployment",
    description: "Go from concept to production in weeks, not months. Our streamlined process eliminates bottlenecks.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Built with security-first principles. Your data stays protected at every layer of automation.",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Average 340% ROI within the first year. We track every metric that matters to your business.",
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description: "Works with your existing stack. No rip-and-replace—just intelligent enhancement.",
  },
];

export default function ValueProposition() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 section-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose <span className="text-primary">Kanso Flow</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We don't just automate—we simplify. Every solution is designed to reduce friction and amplify results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`p-6 rounded-xl border border-border bg-card card-hover ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

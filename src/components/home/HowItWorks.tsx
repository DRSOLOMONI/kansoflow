import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "We map your workflows, identify bottlenecks, and uncover opportunities where AI creates the most impact.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description: "We architect elegant, scalable solutions tailored to your specific processes and technology stack.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Deploy",
    description: "We implement, test, and launch your automation with continuous optimization for peak performance.",
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Three steps from complexity to clarity.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`relative text-center ${
                  isVisible ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-card border border-primary/20 flex items-center justify-center mb-6 green-glow-sm">
                  <step.icon className="text-primary" size={32} />
                </div>
                <span className="text-primary/40 font-heading text-sm font-bold tracking-widest">
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-foreground text-xl mt-2 mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

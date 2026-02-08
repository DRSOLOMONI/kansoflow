import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Eye, Trophy, Handshake } from "lucide-react";

const values = [
  { icon: Sparkles, title: "Simplicity", description: "We strip away complexity to reveal elegant solutions. Less noise, more clarity." },
  { icon: Eye, title: "Transparency", description: "No black boxes. We explain every decision, share every metric, and keep you informed." },
  { icon: Trophy, title: "Excellence", description: "We hold ourselves to the highest standards. Every solution is crafted with precision." },
  { icon: Handshake, title: "Partnership", description: "Your success is our success. We work alongside you, not just for you." },
];

const team = [
  { name: "Alex Kanso", role: "Founder & CEO", bio: "15+ years in AI and automation. Former lead at two Fortune 500 companies." },
  { name: "Yuki Tanaka", role: "Head of Engineering", bio: "PhD in Machine Learning. Built automation systems processing 1M+ daily transactions." },
  { name: "Marcus Chen", role: "Head of Strategy", bio: "Ex-McKinsey. Specializes in digital transformation for enterprise clients." },
  { name: "Priya Sharma", role: "Lead AI Architect", bio: "Pioneer in conversational AI. 20+ patents in natural language processing." },
];

export default function About() {
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
              The Philosophy Behind{" "}
              <span className="text-primary">Kanso Flow</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Kanso (簡素) — the Japanese aesthetic of simplicity and removal of excess.
              We believe the most powerful solutions are the simplest ones.
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
            className="relative pl-8 border-l-2 border-primary/30"
          >
            <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-primary" />
            <p className="text-foreground text-lg leading-relaxed mb-6">
              In a world obsessed with adding more, we focus on removing what's unnecessary. 
              Every workflow we automate, every system we design follows one principle: 
              <span className="text-primary font-semibold"> simplicity is the ultimate sophistication.</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We founded Kanso Flow because we saw businesses drowning in complexity—tangled processes, 
              siloed tools, and mountains of manual work. We knew AI could do more than just automate tasks. 
              It could fundamentally simplify how businesses operate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 section-gradient">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Our <span className="text-primary">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card text-center card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Our <span className="text-primary">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
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
            Work <span className="text-primary">With Us</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Join the companies that have found their flow.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Get In Touch
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

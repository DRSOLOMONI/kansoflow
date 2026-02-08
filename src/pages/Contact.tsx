import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const industries = [
  "Select industry",
  "FinTech",
  "Healthcare",
  "E-Commerce",
  "SaaS",
  "Logistics",
  "Manufacturing",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Let's <span className="green-gradient-text">Simplify Together</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your challenges and we'll design the path to clarity.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 rounded-xl border border-primary/20 bg-card"
              >
                <CheckCircle2 className="text-primary mx-auto mb-6" size={48} />
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Message Received
                </h2>
                <p className="text-muted-foreground">
                  We'll review your message and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={255}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground green-focus transition-all appearance-none cursor-pointer"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind === "Select industry" ? "" : ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    How can we help? <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your challenges and what you'd like to achieve..."
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all resize-none"
                    maxLength={1000}
                  />
                </div>

                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Send Message
                  <ArrowRight size={20} />
                </Button>
              </motion.form>
            )}

            {/* Contact info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Mail, label: "hello@kansoflow.com" },
                { icon: Phone, label: "+1 (555) 123-4567" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card"
                >
                  <item.icon className="text-primary shrink-0" size={18} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="text-primary" size={16} />
              <span>We respond within 24 hours</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

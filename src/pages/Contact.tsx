import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contactPage.toastError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t.contactPage.toastEmailError);
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      industry: form.industry || null,
      message: form.message.trim(),
    });
    setIsSubmitting(false);
    if (error) {
      toast.error(t.contactPage.toastError);
      return;
    }
    setSubmitted(true);
    toast.success(t.contactPage.toastSuccess);
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
              {t.contactPage.title} <span className="green-gradient-text">{t.contactPage.titleAccent}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contactPage.subtitle}
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
                  {t.contactPage.successTitle}
                </h2>
                <p className="text-muted-foreground">
                  {t.contactPage.successMessage}
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
                      {t.contactPage.name} <span className="text-destructive">{t.contactPage.required}</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.contactPage.namePlaceholder}
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t.contactPage.email} <span className="text-destructive">{t.contactPage.required}</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contactPage.emailPlaceholder}
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={255}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      {t.contactPage.company}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t.contactPage.companyPlaceholder}
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                      {t.contactPage.industry}
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-foreground green-focus transition-all appearance-none cursor-pointer"
                    >
                      {t.contactPage.industries.map((ind, i) => (
                        <option key={ind} value={i === 0 ? "" : ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t.contactPage.message} <span className="text-destructive">{t.contactPage.required}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t.contactPage.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all resize-none"
                    maxLength={1000}
                  />
                </div>

                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "..." : t.contactPage.submit}
                  {!isSubmitting && <ArrowRight size={20} />}
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
              <span>{t.contactPage.responseTime}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

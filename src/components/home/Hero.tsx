import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import FlowLines from "./FlowLines";
import { useLanguage } from "@/contexts/LanguageContext";
import heroFlow from "@/assets/hero-flow.jpg";

export default function Hero() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const copy = {
    badge: isAr ? "وكيل صوتي للمطاعم والمقاهي" : "Voice AI for cafes and restaurants",
    headline1: isAr ? "لا تفوّت أي" : "Never miss",
    headline2: isAr ? "طلب هاتفي." : "another phone order.",
    subheadline: isAr
      ? "كانسو فلو يرد على مكالمات العملاء، يأخذ طلبات الاستلام، يجيب عن أسئلة المنيو، يجمع حجوزات وكاترينغ، ويرسل ملخصاً واضحاً لفريقك بالعربية والإنجليزية."
      : "Kanso Flow answers calls, takes pickup orders, handles menu questions, captures reservations and catering leads, then sends a clean summary to your team in English or Arabic.",
    cta: isAr ? "احجز تجربة" : "Book a restaurant demo",
    ctaSecondary: isAr ? "جرّب زارا" : "Try Zara live",
    points: isAr
      ? ["يرد وقت الزحمة", "يؤكد الطلب قبل الإرسال", "يحوّل للموظف عند الحاجة"]
      : ["Answers during rush hour", "Confirms every order", "Hands off when needed"],
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroFlow}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/65 to-background" />
      </div>
      <FlowLines />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-primary font-heading text-xs tracking-[0.22em] uppercase mb-6"
          >
            <PhoneCall size={14} />
            {copy.badge}
          </motion.p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            <span className="text-foreground">{copy.headline1}</span>
            <br />
            <span className="green-gradient-text">{copy.headline2}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {copy.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            {copy.points.map((point) => (
              <span key={point} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-2">
                <CheckCircle2 size={16} className="text-primary" />
                {point}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                {copy.cta}
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <a href="#zara-demo">{copy.ctaSecondary}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder-desk.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FounderNote() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-primary/20 green-glow-sm aspect-[4/5]"
          >
            <img
              src={founderImg}
              alt={isAr ? "مؤسس كانسو فلو" : "Kanso Flow founder at work"}
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-5">
              {isAr ? "ملاحظة من المؤسس" : "A note from the founder"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {isAr
                ? "أنا لا أبيع \"ذكاء اصطناعي\" — أبيع وقتك الذي ضاع."
                : "I'm not selling you \u201cAI.\u201d I'm giving you back the hours you lost."}
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                {isAr
                  ? "بدأت كانسو فلو لأنني سئمت من رؤية فرق رائعة تغرق في الإيميلات، النماذج، والمتابعات. الأدوات موجودة — لكن لا أحد لديه الوقت ليجمعها معاً."
                  : "I started Kanso Flow because I was tired of watching brilliant teams drown in emails, forms, and follow-ups. The tools exist \u2014 nobody has the time to wire them together."}
              </p>
              <p>
                {isAr
                  ? "نحن نقوم بذلك من أجلك. نتحدث معك، نفهم سير عملك، ونبني الأتمتة بأنفسنا. لا روبوتات تبيع لك روبوتات."
                  : "We do that for you. We sit down with you, learn your workflow, and build the automations ourselves. No bots selling you bots."}
              </p>
              <p className="text-foreground">
                {isAr ? "— إذا كان شيء يستهلك ساعاتك كل أسبوع، تحدث معنا." : "\u2014 If something is eating your hours every week, talk to us."}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex mt-8 items-center gap-2 text-primary font-heading font-semibold hover:gap-3 transition-all"
            >
              {isAr ? "أرسل لي رسالة" : "Send me a message"}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
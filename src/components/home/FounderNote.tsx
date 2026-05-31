import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder-solomoni.png";
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
              alt={isAr ? "سولوموني، مؤسس كانسو فلو" : "Solomoni, founder of Kanso Flow"}
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
              {isAr ? "مرحباً، أنا سولوموني" : "Hi, I'm Solomoni"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {isAr
                ? "لا أبيع \"ذكاء اصطناعي\" — أبني وكلاء صوتيين يردّون على هاتفك."
                : "I don't sell \u201cAI.\u201d I build voice agents that actually pick up your phone."}
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                {isAr
                  ? "أنا رائد أعمال وبنّاء، أطلقت عدة مشاريع وقضيت سنوات في استكشاف كيف يلتقي الذكاء الاصطناعي بمشاكل الأعمال الحقيقية."
                  : "I'm a builder and entrepreneur. I've launched multiple ventures and spent years exploring where AI actually meets real business problems \u2014 not the hype version."}
              </p>
              <p>
                {isAr
                  ? "بدأت كانسو فلو لسبب واحد: بناء وكلاء صوتيين عمليين يوفّرون الوقت، يلتقطون كل مكالمة، ويخلقون قيمة قابلة للقياس \u2014 وليس مجرد عرض تقني."
                  : "I started Kanso Flow for one reason: to build practical voice agents that save real time, catch every call, and create measurable value \u2014 not just a tech demo."}
              </p>
              <p className="text-foreground">
                {isAr ? "\u2014 إذا كان هاتفك يرنّ أكثر مما يمكن لفريقك الرد، تحدث معي مباشرة." : "\u2014 If your phone rings more than your team can answer, talk to me directly."}
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
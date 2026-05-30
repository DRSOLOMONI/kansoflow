import { motion } from "framer-motion";
import chaosImg from "@/assets/chaos-to-flow.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChaosToFlow() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
            {isAr ? "قبل · بعد" : "Before \u00b7 After"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {isAr ? (
              <>
                من الفوضى. <span className="green-gradient-text">إلى التدفق.</span>
              </>
            ) : (
              <>
                Tangled wires in. <span className="green-gradient-text">One clean line out.</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            {isAr
              ? "هذا ما تشعر به فرقك قبل أتمتة كانسو فلو — وبعدها."
              : "This is what your team feels before Kanso Flow \u2014 and after."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 green-glow-sm max-w-5xl mx-auto"
        >
          <img
            src={chaosImg}
            alt={isAr ? "من فوضى المهام إلى تدفق أنيق" : "Cluttered manual work transforming into clean flow"}
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-auto block"
          />
        </motion.div>
      </div>
    </section>
  );
}
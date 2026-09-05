import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinalCTA() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="py-32 cta-gradient relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(153 100% 50% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {isAr ? "ابدأ بتجربة على خط" : "Start with your busiest"}{" "}
            <span className="text-primary">{isAr ? "هاتفك الأكثر ازدحاماً" : "phone line"}</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            {isAr
              ? "أرسل لنا المنيو وطريقة استقبال الطلبات، وسنجهز تجربة توضح كم مكالمة وطلب يمكن لكانسو فلو إنقاذها شهرياً."
              : "Send us your menu and current call flow. We will set up a pilot that shows how many calls, orders, and leads Kanso Flow can recover each month."}
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              {isAr ? "احجز تجربة المطعم" : "Book the restaurant pilot"}
              <ArrowRight size={20} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

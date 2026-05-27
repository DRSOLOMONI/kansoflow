import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();

  const platformLabel = lang === "ar" ? "المنصة" : "Platform";
  const solutionsLabel = lang === "ar" ? "الحلول" : "Solutions";

  const footerLinks = {
    [t.footer.company]: [
      { label: t.nav.about, to: "/about" },
      { label: t.nav.caseStudies, to: "/case-studies" },
      { label: t.nav.contact, to: "/contact" },
      { label: lang === "ar" ? "الوظائف" : "Careers", to: "#" },
    ],
    [platformLabel]: [
      { label: lang === "ar" ? "منشئ سير العمل" : "Workflow Builder", to: "/services" },
      { label: lang === "ar" ? "وكلاء الذكاء الاصطناعي" : "AI Agents", to: "/services" },
      { label: lang === "ar" ? "التكاملات" : "Integrations", to: "/services" },
      { label: lang === "ar" ? "ذكاء العمليات" : "Process Intelligence", to: "/services" },
    ],
    [solutionsLabel]: [
      { label: lang === "ar" ? "للشركات الناشئة" : "Startups", to: "/services" },
      { label: lang === "ar" ? "للأعمال الصغيرة" : "Small Business", to: "/services" },
      { label: lang === "ar" ? "السوق المتوسطة" : "Mid Market", to: "/services" },
      { label: lang === "ar" ? "المؤسسات" : "Enterprise", to: "/services" },
    ],
    [t.footer.resources]: [
      { label: t.nav.insights, to: "/insights" },
      { label: lang === "ar" ? "حاسبة التوفير" : "Savings Calculator", to: "#" },
      { label: t.footer.privacyPolicy, to: "#" },
      { label: t.footer.termsOfService, to: "#" },
    ],
  };

  return (
    <footer className="border-t border-primary/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-xl font-bold">
              <span className="text-foreground">Kanso</span>
              <span className="text-primary ms-1.5">Flow</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-4 mt-6">
              {[Linkedin, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
          <p className="text-sm text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

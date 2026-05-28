import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.services, to: "/services" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.insights, to: "/insights" },
    { label: t.nav.contact, to: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 font-heading text-xl font-bold">
          <span className="text-foreground">Kanso</span>
          <span className="text-primary ms-1.5">Flow</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Lang */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 h-9 rounded-md border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span>{lang === "en" ? "العربية" : "English"}</span>
          </button>
          <Link
            to="/contact"
            className="inline-flex h-9 px-5 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-heading font-semibold transition-all duration-300 hover:bg-primary/90 green-glow-sm"
          >
            {t.nav.getStarted}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 bg-background/98 backdrop-blur-lg md:hidden z-40"
          >
            <nav className="flex flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`text-2xl font-heading font-semibold transition-colors ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile lang toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-6 py-3 rounded-md border border-border text-lg font-medium text-muted-foreground hover:text-primary transition-all"
                >
                  <Globe size={20} />
                  {lang === "en" ? "العربية" : "English"}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 inline-flex h-12 px-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-lg font-heading font-semibold green-glow"
                >
                  {t.nav.getStarted}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

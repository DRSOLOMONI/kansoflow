import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en } from "@/i18n/en";
import { ar } from "@/i18n/ar";

type Translations = Omit<typeof en, 'dir'> & { dir: "ltr" | "rtl" };
type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Lang, Translations> = { en, ar };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("kanso-lang");
    return (saved === "ar" ? "ar" : "en") as Lang;
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("kanso-lang", newLang);
  };

  const t = translations[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

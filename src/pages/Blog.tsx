import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(t.blogPage.categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = t.blogPage.articles.filter((a) => {
    const matchesCategory = activeCategory === t.blogPage.categories[0] || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t.blogPage.heroTitle}{" "}
              <span className="relative">
                <span className="text-primary">{t.blogPage.heroTitleAccent}</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.blogPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative mb-6">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder={t.blogPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 ps-11 pe-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {t.blogPage.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground green-glow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-xl border border-border bg-card card-hover"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                  {article.category}
                </span>
                <h2 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {article.date} · {article.readTime}
                  </span>
                  <span className="text-primary text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.blogPage.readCta} <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              {t.blogPage.noResults}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

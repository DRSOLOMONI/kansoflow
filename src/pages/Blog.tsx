import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

const categories = ["All", "AI Strategy", "Automation", "Case Studies", "Industry Trends"];

const articles = [
  {
    id: "future-of-workflow-automation",
    category: "Automation",
    title: "The Future of Workflow Automation in 2026",
    excerpt: "How AI-powered automation is reshaping enterprise operations and what leaders need to know to stay ahead.",
    date: "Feb 5, 2026",
    readTime: "6 min read",
  },
  {
    id: "ai-chatbots-beyond-support",
    category: "AI Strategy",
    title: "AI Chatbots: Beyond Customer Support",
    excerpt: "Discover how forward-thinking companies are using conversational AI for sales, operations, and internal knowledge management.",
    date: "Jan 28, 2026",
    readTime: "8 min read",
  },
  {
    id: "simplicity-competitive-advantage",
    category: "AI Strategy",
    title: "Why Simplicity Is Your Biggest Competitive Advantage",
    excerpt: "In a world of complex tools, the companies that simplify will win. Here's the data to prove it.",
    date: "Jan 15, 2026",
    readTime: "5 min read",
  },
  {
    id: "healthcare-ai-transformation",
    category: "Industry Trends",
    title: "Healthcare's AI Transformation: A 2026 Outlook",
    excerpt: "From patient intake to diagnostic support, AI is fundamentally changing healthcare delivery.",
    date: "Jan 8, 2026",
    readTime: "7 min read",
  },
  {
    id: "roi-of-process-automation",
    category: "Case Studies",
    title: "Measuring the True ROI of Process Automation",
    excerpt: "Beyond cost savings: how to measure the full impact of automation on your organization.",
    date: "Dec 20, 2025",
    readTime: "9 min read",
  },
  {
    id: "data-pipelines-best-practices",
    category: "Automation",
    title: "Building Resilient Data Pipelines: Best Practices",
    excerpt: "Practical guide to designing data pipelines that scale, self-heal, and deliver reliable insights.",
    date: "Dec 12, 2025",
    readTime: "10 min read",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
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
              Simplification{" "}
              <span className="relative">
                <span className="text-primary">Insights</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts on AI, automation, and the art of simplification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground green-focus transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
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
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

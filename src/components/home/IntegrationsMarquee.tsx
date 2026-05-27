import { useLanguage } from "@/contexts/LanguageContext";

const integrations = [
  "Slack", "HubSpot", "Salesforce", "Notion", "Zapier", "Airtable",
  "Google Workspace", "Microsoft 365", "Linear", "Asana", "Jira", "Stripe",
  "Twilio", "OpenAI", "Anthropic", "Snowflake", "BigQuery", "Postgres",
];

export default function IntegrationsMarquee() {
  const { lang } = useLanguage();

  const t = {
    eyebrow: lang === "ar" ? "تكاملات لكل شيء" : "Integrations for everything",
    title:
      lang === "ar"
        ? "متصل بالأدوات التي تستخدمها بالفعل"
        : "Connected to the tools you already use",
    sub:
      lang === "ar"
        ? "جاهز للاستخدام مباشرةً. أكثر من ٩٥ تكاملًا، من CRM إلى المستودعات إلى أدوات الدعم."
        : "Plug-and-play from day one. 95+ integrations across CRM, data warehouses, and support tools.",
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12 max-w-2xl">
        <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">
          {t.eyebrow}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">{t.title}</h2>
        <p className="mt-6 text-muted-foreground text-lg">{t.sub}</p>
      </div>

      <div className="relative space-y-4">
        {[0, 1].map((row) => (
          <div key={row} className="relative">
            <div
              className={`flex gap-4 whitespace-nowrap will-change-transform ${
                row === 0
                  ? "animate-[marqueeL_50s_linear_infinite]"
                  : "animate-[marqueeR_55s_linear_infinite]"
              }`}
              style={{ width: "max-content" }}
            >
              {[...integrations, ...integrations].map((name, i) => (
                <div
                  key={i}
                  className="px-6 py-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors font-heading font-medium"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>

      <style>{`
        @keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
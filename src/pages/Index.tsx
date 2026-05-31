import Hero from "@/components/home/Hero";
import SEO from "@/components/SEO";
import KaiDemo from "@/components/home/KaiDemo";
import VoiceUseCases from "@/components/home/VoiceUseCases";
import HowItWorks from "@/components/home/HowItWorks";
import FounderNote from "@/components/home/FounderNote";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does Kanso Flow build?", acceptedAnswer: { "@type": "Answer", text: "We build voice AI agents that answer calls, qualify leads, book appointments, and handle support — fully in English and Arabic." } },
      { "@type": "Question", name: "How natural does the voice sound?", acceptedAnswer: { "@type": "Answer", text: "Most callers can't tell. We tune voice, pacing, and interruptions until conversations feel human." } },
      { "@type": "Question", name: "Does it work in Arabic?", acceptedAnswer: { "@type": "Answer", text: "Yes — natively in Arabic and English, with mid-conversation language switching." } },
      { "@type": "Question", name: "How quickly can we go live?", acceptedAnswer: { "@type": "Answer", text: "A working voice agent is usually live within days. Full integrations land in 2–4 weeks." } },
      { "@type": "Question", name: "Does it connect to our calendar and CRM?", acceptedAnswer: { "@type": "Answer", text: "Yes. The agent books into Google/Outlook calendars and writes back to your CRM in real time." } },
      { "@type": "Question", name: "What happens if the agent can't help?", acceptedAnswer: { "@type": "Answer", text: "It gracefully transfers to a human or schedules a callback — never leaving the caller stuck." } },
    ],
  };
  return (
    <>
      <SEO
        title="Kanso Flow – Voice AI Agents that Pick Up"
        description="Voice AI agents that answer calls, qualify leads, book appointments, and handle support — natively in English and Arabic. Try Kai live."
        path="/"
        jsonLd={faqJsonLd}
      />
      <Hero />
      <KaiDemo />
      <VoiceUseCases />
      <HowItWorks />
      <FounderNote />
      <FAQ />
      <FinalCTA />
    </>
  );
};

export default Index;

import Hero from "@/components/home/Hero";
import SEO from "@/components/SEO";
import VoiceWaiter from "@/components/home/VoiceWaiter";
import VoiceUseCases from "@/components/home/VoiceUseCases";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import FounderNote from "@/components/home/FounderNote";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does Kanso Flow do for restaurants?", acceptedAnswer: { "@type": "Answer", text: "Kanso Flow answers restaurant and cafe calls, takes pickup orders, handles menu questions, captures reservations and catering leads, and sends confirmed summaries to the team." } },
      { "@type": "Question", name: "Does Kanso Flow work in Arabic and English?", acceptedAnswer: { "@type": "Answer", text: "Yes. The agent can speak Arabic and English and switch based on the caller's language." } },
      { "@type": "Question", name: "Can the AI take food orders?", acceptedAnswer: { "@type": "Answer", text: "Yes. The AI can collect menu items, modifiers, customer name, pickup time, and confirmation before sending the order to staff." } },
      { "@type": "Question", name: "Does it replace my POS?", acceptedAnswer: { "@type": "Answer", text: "No. Kanso Flow is designed to capture calls and hand off clean order details to your staff, dashboard, SMS, WhatsApp, email, or POS integration where available." } },
      { "@type": "Question", name: "How quickly can a cafe go live?", acceptedAnswer: { "@type": "Answer", text: "A first restaurant voice agent can usually go live after the menu, hours, call rules, and handoff method are configured." } },
      { "@type": "Question", name: "What happens if the agent cannot help?", acceptedAnswer: { "@type": "Answer", text: "It can transfer to staff, take a message, or schedule a callback so the caller is not left stuck." } },
    ],
  };
  return (
    <>
      <SEO
        title="Kanso Flow - AI Phone Agent for Cafes and Restaurants"
        description="AI phone agents for cafes and restaurants. Answer calls, take pickup orders, handle reservations, capture catering leads, and support Arabic and English callers."
        path="/"
        jsonLd={faqJsonLd}
      />
      <Hero />
      <VoiceWaiter />
      <VoiceUseCases />
      <HowItWorks />
      <Pricing />
      <FounderNote />
      <FAQ />
      <FinalCTA />
    </>
  );
};

export default Index;

import Hero from "@/components/home/Hero";
import SEO from "@/components/SEO";
import LogoMarquee from "@/components/home/LogoMarquee";
import PlatformTagline from "@/components/home/PlatformTagline";
import ProductSuite from "@/components/home/ProductSuite";
import FeatureRows from "@/components/home/FeatureRows";
import KaiDemo from "@/components/home/KaiDemo";
import ValueProposition from "@/components/home/ValueProposition";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import IntegrationsMarquee from "@/components/home/IntegrationsMarquee";
import HowItWorks from "@/components/home/HowItWorks";
import Metrics from "@/components/home/Metrics";
import Comparison from "@/components/home/Comparison";
import FAQ from "@/components/home/FAQ";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import FinalCTA from "@/components/home/FinalCTA";
import FounderNote from "@/components/home/FounderNote";
import ChaosToFlow from "@/components/home/ChaosToFlow";
import WorkflowDiagram from "@/components/home/WorkflowDiagram";

const Index = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is Kanso Flow and what does it do?", acceptedAnswer: { "@type": "Answer", text: "Kanso Flow is an AI automation consultancy and platform. We design, deploy, and manage intelligent workflows that eliminate repetitive work." } },
      { "@type": "Question", name: "Do you offer a free trial?", acceptedAnswer: { "@type": "Answer", text: "We offer a free discovery consultation, then propose a low-risk pilot that proves ROI before scaling." } },
      { "@type": "Question", name: "Does Kanso Flow replace human employees?", acceptedAnswer: { "@type": "Answer", text: "No. We remove repetitive work so your teams can focus on strategy, creativity, and high-value decisions." } },
      { "@type": "Question", name: "How secure is Kanso Flow?", acceptedAnswer: { "@type": "Answer", text: "We build to SOC 2, HIPAA, and GDPR standards with end-to-end encryption and strict access controls." } },
      { "@type": "Question", name: "How quickly can we get started?", acceptedAnswer: { "@type": "Answer", text: "Most pilots are live within 2 weeks. Full enterprise rollouts take 4–8 weeks." } },
      { "@type": "Question", name: "Does it integrate with our existing systems?", acceptedAnswer: { "@type": "Answer", text: "Yes. 95+ ready integrations, and we can build custom connectors for legacy systems." } },
      { "@type": "Question", name: "Do I need technical skills to use it?", acceptedAnswer: { "@type": "Answer", text: "No. We handle all setup, configuration, and maintenance. Your teams use simple dashboards." } },
      { "@type": "Question", name: "Does it scale to high volumes?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our infrastructure handles thousands of concurrent workflows across multiple global regions." } },
    ],
  };
  return (
    <>
      <SEO
        title="Kanso Flow – AI Automation Workflows & Voice Agents"
        description="Premium AI automation consultancy. Design, deploy, and manage intelligent workflows and voice agents like Kai that eliminate repetitive work."
        path="/"
        jsonLd={faqJsonLd}
      />
      <Hero />
      <LogoMarquee />
      <PlatformTagline />
      <ChaosToFlow />
      <KaiDemo />
      <FounderNote />
      <WorkflowDiagram />
      <ProductSuite />
      <FeatureRows />
      <IndustriesGrid />
      <HowItWorks />
      <ValueProposition />
      <Metrics />
      <IntegrationsMarquee />
      <Comparison />
      <FAQ />
      <MarqueeTicker />
      <FinalCTA />
    </>
  );
};

export default Index;

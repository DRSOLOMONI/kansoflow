import Hero from "@/components/home/Hero";
import ValueProposition from "@/components/home/ValueProposition";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesOverview from "@/components/home/ServicesOverview";
import Metrics from "@/components/home/Metrics";
import CaseStudyPreview from "@/components/home/CaseStudyPreview";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <ServicesOverview />
      <Metrics />
      <CaseStudyPreview />
      <FinalCTA />
    </>
  );
};

export default Index;

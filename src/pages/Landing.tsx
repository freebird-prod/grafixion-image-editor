import { Hero } from "@/components/Hero";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { FinalCTA } from "@/components/FinalCTA";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureShowcase />
      <HowItWorks />
      <InteractiveDemo />
      <FinalCTA />
    </div>
  );
}

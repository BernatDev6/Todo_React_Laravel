import React from "react";
import "./LandingPage.css";
import { HeroSection } from "./HeroSection/HeroSection";
import { FeaturesSection } from "./FeaturesSection/FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection/HowItWorksSection";


export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </div>
  );
};
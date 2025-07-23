import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import CustomerBenefits from "@/components/CustomerBenefits";
import ExpertBenefits from "@/components/ExpertBenefits";
import FeaturedExperts from "@/components/FeaturedExperts";
import TreatmentCategories from "@/components/TreatmentCategories";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <CustomerBenefits />
      <ExpertBenefits />
      <FeaturedExperts />
      <TreatmentCategories />
      <TrustSection />
      <div id="about">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
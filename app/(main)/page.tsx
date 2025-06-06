import BenefitsSection from "@/components/home/BenefitsSection";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WholesalersSection from "@/components/home/WholesalersSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <ServicesSection/>
      <BenefitsSection/>
      {/* <WholesalersSection /> */}
    </main>
  );
};

export default Home;

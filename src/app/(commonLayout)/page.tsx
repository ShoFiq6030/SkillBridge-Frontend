import Hero from "@/components/modules/homepage/Hero";
import LearningHeroSection from "../../components/modules/homepage/LearningHeroSection";
import PopularTutorSection from "@/components/modules/homepage/PopularTutorSection";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <LearningHeroSection />
      <PopularTutorSection />
    </div>
  );
}

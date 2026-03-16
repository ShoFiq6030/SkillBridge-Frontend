import Hero from "@/components/homepage/Hero";
import LearningHeroSection from "./../../components/homepage/LearningHeroSection";
import PopularTutorSection from "@/components/homepage/PopularTutorSection";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <LearningHeroSection />
      <PopularTutorSection />
    </div>
  );
}

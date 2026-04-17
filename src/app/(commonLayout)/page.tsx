import Hero from "@/components/modules/homepage/Hero";
import LearningHeroSection from "../../components/modules/homepage/LearningHeroSection";
import PopularTutorSection from "@/components/modules/homepage/PopularTutorSection";
import ReviewSection from "@/components/modules/homepage/ReviewSection";
import WhyLearnSection from "@/components/modules/homepage/WhyLearnSection";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <LearningHeroSection />
      <PopularTutorSection />
      <ReviewSection/>
      <WhyLearnSection/>
    </div>
  );
}

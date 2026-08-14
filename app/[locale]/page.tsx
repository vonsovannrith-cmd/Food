import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Categories from "@/components/Categories";
import PromotionSection from "@/components/PromotionSection";
import PopularFoods from "@/components/PopularFoods";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      {/* Main Content Wrapper ដើម្បីការពារការធ្លាក់ប្លង់ និងរៀបចំគម្លាតស្អាត */}
      <main className="flex-grow space-y-12 sm:space-y-16 pb-16">
        <HeroSlider />
        <Categories />
        <PromotionSection />
        <PopularFoods />
        <FeaturedRestaurants />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
}
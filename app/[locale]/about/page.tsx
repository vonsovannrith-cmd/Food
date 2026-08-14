"use client"; // Marks this component to run on the client-side (Browser)

import Image from "next/image";
import Link from "next/link";
import { Utensils, ShieldCheck, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  // Fetch translation strings for the AboutPage namespace using next-intl
  const t = useTranslations("AboutPage");

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Renders the top navigation bar */}
      <Navbar />

      <main>
        {/* Hero Section: Displays main heading, promotional banner, and background accents */}
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-orange-500/10 via-transparent to-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="space-y-6">
              {/* Top Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-wider shadow-sm">
                {t("badge", { default: "About Mhob Khmer" })}
              </span>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {t("heroTitle1", { default: "Authentic Khmer Flavors," })}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  {t("heroTitleHighlight", { default: "Delivered To Your Door" })}
                </span>
              </h1>

              {/* Descriptive Paragraph */}
              <p className="text-gray-600 dark:text-gray-400 text-base lg:text-lg font-medium leading-relaxed">
                {t("heroDescription", {
                  default:
                    "We bring you the rich culinary heritage of Cambodia, crafted with fresh local ingredients, traditional recipes, and a modern passion for exceptional food service.",
                })}
              </p>

              {/* Action Button linking to the menu */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/menu"
                  className="flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <span>{t("exploreMenu", { default: "Explore Menu" })}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative h-[400px] lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-800">
              <Image
                src="/foods/khmer-cuisin.jpg"
                alt="Khmer Cuisine"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

          </div>
        </section>

        {/* Features Section: Highlight cards detailing unique service points */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              {t("whyChooseUs", { default: "Why Food Lovers Choose Us" })}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base font-medium">
              {t("whyChooseUsSub", {
                default: "Dedicated to preserving traditional taste while offering fast and reliable digital ordering.",
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature Card 1: Authentic Recipes */}
            <div className="group p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <Utensils size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("feature1Title", { default: "Authentic Recipes" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("feature1Desc", {
                  default: "Prepared using classic Cambodian herbs, spices, and cooking methods passed down through generations.",
                })}
              </p>
            </div>

            {/* Feature Card 2: Quality Ingredients */}
            <div className="group p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("feature2Title", { default: "Quality Ingredients" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("feature2Desc", {
                  default: "We source fresh vegetables, meat, and ingredients daily from trusted local markets and farmers.",
                })}
              </p>
            </div>

            {/* Feature Card 3: Fast Delivery */}
            <div className="group p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <Award size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("feature3Title", { default: "Fast Delivery" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("feature3Desc", {
                  default: "Hot, fresh meals packaged securely and delivered straight to your doorstep in optimal time.",
                })}
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* Renders the global footer component */}
      <Footer />
    </div>
  );
}
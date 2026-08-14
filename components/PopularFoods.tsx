"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import FoodCard from "./FoodCard";
import { foods } from "@/data/foods";
import { useTranslations } from "next-intl";

export default function PopularFoods() {
  const t = useTranslations("PopularFoods");

  // Display only top 8 popular items on the homepage
  const popularList = foods.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/60 px-3.5 py-1 rounded-full border border-orange-200/60 dark:border-orange-800/50 mb-3">
            <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
            {t("badge", { default: "Top Recommendations" })}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight font-sans">
            {t("title", { default: "Popular Foods" })}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {t("subtitle", { default: "Our customer favorites and most ordered Khmer dishes" })}
          </p>
        </div>

        {/* View All Link */}
        <Link
          href="/menu"
          className="
            inline-flex items-center gap-2 self-start sm:self-auto
            px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200
            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            shadow-sm hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200
            dark:hover:bg-gray-700/80 dark:hover:text-orange-400
            transition-all duration-200 group active:scale-95
          "
        >
          <span>{t("viewFullMenu", { default: "View Full Menu" })}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {popularList.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}
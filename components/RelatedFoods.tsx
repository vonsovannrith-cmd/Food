"use client";

import FoodCard from "./FoodCard";
import { foods } from "@/data/foods";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

interface Props {
  currentId: number;
}

export default function RelatedFoods({ currentId }: Props) {
  const t = useTranslations("RelatedFoods");

  const related = foods
    .filter((food) => food.id !== currentId)
    .slice(0, 4);

  // ប្រសិនបើគ្មានមុខម្ហូបពាក់ព័ន្ធទេ សូមកុំបង្ហាញផ្នែកនេះ
  if (related.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 font-sans border-t border-gray-100 dark:border-gray-800/80 mt-12">
      {/* Header Section */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-200/60 dark:border-orange-800/50 mb-3 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" /> 
          {t("badge", { default: "You May Also Like" })}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("title", { default: "Related Foods" })}
        </h2>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {related.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}
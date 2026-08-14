"use client";

import { Utensils, SearchX } from "lucide-react";
import FoodCard from "./FoodCard";
import { Food } from "@/data/foods";
import { useTranslations } from "next-intl";

interface MenuGridProps {
  foods: Food[];
  title?: string;
}

export default function MenuGrid({ foods, title }: MenuGridProps) {
  const t = useTranslations("MenuGrid");

  // Empty State View
  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 border border-dashed border-gray-200 dark:border-gray-800 my-8">
        <div className="p-4 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-500 mb-4">
          <SearchX className="h-10 w-10 stroke-[1.5]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t("noFoodFound", { default: "No food found" })}
        </h3>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {t("noFoodDescription", { 
            default: "We couldn't find any dishes matching your criteria. Try adjusting your search or category filters." 
          })}
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Optional Grid Header & Item Count Counter */}
      <div className="flex items-center justify-between mb-6">
        {title && (
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-sans">
            {title}
          </h2>
        )}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          <Utensils className="h-3.5 w-3.5 text-orange-500" />
          <span>
            {foods.length} {foods.length === 1 ? t("dishAvailable", { default: "dish available" }) : t("dishesAvailable", { default: "dishes available" })}
          </span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}
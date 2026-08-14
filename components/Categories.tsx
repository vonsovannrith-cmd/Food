"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const categoryKeys = [
  "all",
  "soups",
  "kariAmok",
  "stirFries",
  "salads",
  "prahokDips",
  "breakfast",
];

export default function Categories() {
  const t = useTranslations("Categories");
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {categoryKeys.map((key) => {
          const isActive = activeCategory === key;
          const label = t(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`group flex items-center justify-center rounded-2xl border p-4 text-center shadow-sm transition-all duration-300 active:scale-95 ${
                isActive
                  ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20 -translate-y-1"
                  : "border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white hover:shadow-lg hover:shadow-orange-500/20"
              }`}
            >
              <span
                className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-800 dark:text-gray-200 group-hover:text-white"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
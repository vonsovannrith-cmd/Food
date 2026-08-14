"use client";

import { useTranslations } from "next-intl";

const categoryKeys = [
  "all",
  "soups",
  "kariAmok",
  "stirFries",
  "salads",
  "prahokDips",
  "breakfast",
  "drinksDesserts",
];

export default function CategorySection() {
  const t = useTranslations("CategorySection");

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        {t("title")}
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categoryKeys.map((key) => {
          const categoryName = t(key);

          return (
            <div
              key={key}
              className="group cursor-pointer rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 text-center shadow-sm transition-all hover:bg-red-500 hover:text-white dark:hover:bg-red-600 hover:border-transparent"
            >
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-white">
                {categoryName}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
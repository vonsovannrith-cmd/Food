"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  // ហៅប្រើប្រាស់ Translation namespace សម្រាប់ categories
  const t = useTranslations("MenuPage.categories");

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
      {categories.map((cat) => {
        const isActive = selected === cat;
        
        // បកប្រែឈ្មោះ Category តាម JSON ប្រសិនបើរកមិនឃើញវាបង្ហាញតម្លៃដើម (cat) វិញ
        const translatedCat = t(cat as any, { default: cat });

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25 scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {translatedCat}
          </button>
        );
      })}
    </div>
  );
}
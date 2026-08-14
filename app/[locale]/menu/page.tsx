"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import MenuGrid from "@/components/MenuGrid";
import { foods } from "@/data/foods";
import { useTranslations } from "next-intl";
import { UtensilsCrossed } from "lucide-react";

export default function MenuPage() {
  const t = useTranslations("MenuPage");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort] = useState("default");

  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category)),
  ];

  const filteredFoods = useMemo(() => {
    let result = [...foods];

    if (category !== "All") {
      result = result.filter(
        (food) => food.category === category
      );
    }

    if (search) {
      result = result.filter((food) =>
        food.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Title Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {t("title", { default: "Explore Khmer Menu 🍲" })}
          </h1>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">
            {t("subtitle", { default: "Discover authentic and delicious Cambodian dishes freshly prepared." })}
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="mb-10 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-5 sm:p-7 shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-200/70 dark:border-gray-800">
          <div className="grid gap-5 lg:grid-cols-2 items-center">
            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={setCategory}
            />
          </div>
        </div>

        {/* Menu Grid Content */}
        {filteredFoods.length > 0 ? (
          <MenuGrid foods={filteredFoods} />
        ) : (
          <div className="py-24 text-center max-w-md mx-auto space-y-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/70 dark:border-gray-800 p-8 shadow-xl shadow-gray-100/50 dark:shadow-none">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 shadow-sm">
              <UtensilsCrossed size={30} />
            </div>
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">
              {t("noDishesFound", { default: "No dishes found matching your criteria." })}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
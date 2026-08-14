"use client"; // Marks this component to execute on the client-side (Browser)

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Plus, Search, Trash2, Edit3, Utensils, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

// Interface representing the data structure of a food item
interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: {
    name: string; // Name of the category the food belongs to
  };
}

export default function FoodsPage() {
  const t = useTranslations("FoodsPage"); // Initializes translation hook for food inventory page
  const params = useParams();
  const locale = (params?.locale as string) || "km"; // Extracts current locale from URL parameters with a fallback to Khmer ("km")

  const [foods, setFoods] = useState<Food[]>([]);     // Stores the full list of fetched food items
  const [search, setSearch] = useState("");           // Stores the current search query string
  const [loading, setLoading] = useState(true);       // Tracks data fetching loading state

  // Automatically fetch food items when the component mounts
  useEffect(() => {
    loadFoods();
  }, []);

  // Asynchronous function to fetch all food items from the backend API
  async function loadFoods() {
    try {
      setLoading(true);
      const res = await fetch("/api/foods");
      const data = await res.json();
      setFoods(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Handles food item deletion after user confirmation
  async function deleteFood(id: number) {
    const confirmDelete = confirm(t("confirmDelete", { default: "Are you sure you want to delete this food item?" }));
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/foods/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadFoods(); // Refreshes the food list upon successful deletion
      } else {
        alert(t("alertDeleteFailed", { default: "Failed to delete food item." }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Filters food items based on the search query input (case-insensitive)
  const filterFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header & Add New Food Button Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("menuInventory", { default: "បញ្ជីសារពើភណ្ឌមុខម្ហូប" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <Utensils className="text-orange-500" size={32} />
            <span>{t("pageTitle", { default: "គ្រប់គ្រងមុខម្ហូប 🍜" })}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {t("pageSubtitle", { default: "គ្រប់គ្រងមុខម្ហូប តម្លៃ និងស្តុកក្នុងប្រព័ន្ធរបស់អ្នកយ៉ាងងាយស្រួល។" })}
          </p>
        </div>

        {/* Action Link button to navigate to the Add Food page */}
        <Link
          href={`/${locale}/admin/foods/add`}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 w-fit cursor-pointer"
        >
          <Plus size={18} />
          <span>{t("addNewFoodBtn", { default: "បន្ថែមមុខម្ហូបថ្មី" })}</span>
        </Link>
      </div>

      {/* Main Container Card */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        
        {/* Search Bar Header Section */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800">
          <div className="relative flex items-center max-w-md">
            <span className="absolute left-4 text-orange-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder={t("searchPlaceholder", { default: "ស្វែងរកមុខម្ហូបតាមឈ្មោះ..." })}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table Content & Conditional Loading State */}
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center gap-3 text-orange-500 font-black">
            <Loader2 className="animate-spin" size={24} />
            <span>{t("loadingText", { default: "កំពុងទាញយកទិន្នន័យមុខម្ហូប..." })}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-4 px-6">{t("tableImage", { default: "រូបភាព" })}</th>
                  <th className="py-4 px-6">{t("tableFoodName", { default: "ឈ្មោះមុខម្ហូប" })}</th>
                  <th className="py-4 px-6">{t("tableCategory", { default: "ប្រភេទ" })}</th>
                  <th className="py-4 px-6">{t("tablePrice", { default: "តម្លៃ" })}</th>
                  <th className="py-4 px-6">{t("tableStockStatus", { default: "ស្ថានភាពស្តុក" })}</th>
                  <th className="py-4 px-6 text-right">{t("tableAction", { default: "សកម្មភាព" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {filterFoods.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-500 dark:text-gray-400 font-black text-sm">
                      {t("noFoodsFound", { default: "រកមិនឃើញមុខម្ហូប." })}
                    </td>
                  </tr>
                ) : (
                  filterFoods.map((food) => (
                    <tr
                      key={food.id}
                      className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                    >
                      
                      {/* Food Image Column */}
                      <td className="py-4 px-6">
                        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800 shadow-sm">
                          <Image
                            src={food.image || "/placeholder.png"}
                            alt={food.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Food Name Column */}
                      <td className="py-4 px-6 font-bold text-gray-900 dark:text-white tracking-tight">
                        {food.name}
                      </td>

                      {/* Category Badge Column */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {food.category?.name || t("uncategorized", { default: "មិនមានប្រភេទ" })}
                        </span>
                      </td>

                      {/* Price Column */}
                      <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                        ${Number(food.price).toFixed(2)}
                      </td>

                      {/* Stock Status Badge Column */}
                      <td className="py-4 px-6">
                        {food.stock > 0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40 shadow-sm">
                            {t("availableText", { default: "មានក្នុងស្តុក" })} ({food.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40 shadow-sm">
                            {t("outOfStockText", { default: "អស់ពីស្តុក" })}
                          </span>
                        )}
                      </td>

                      {/* Actions Column (Edit & Delete Buttons) */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Edit Button Link */}
                          <Link
                            href={`/${locale}/admin/foods/edit/${food.id}`}
                            aria-label={`Edit ${food.name}`}
                            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm transition-all hover:border-blue-500 active:scale-95 cursor-pointer"
                          >
                            <Edit3 size={16} />
                          </Link>

                          {/* Delete Button Trigger */}
                          <button
                            type="button"
                            onClick={() => deleteFood(food.id)}
                            aria-label={`Delete ${food.name}`}
                            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-sm transition-all hover:border-rose-500 active:scale-95 cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { useWishlist } from "@/store/wishlistStore";
import { Food } from "@/data/foods";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "km";
  const t = useTranslations("FavoritesPage"); // ឬប្រើ string ធម្មតាបើមិនទាន់មាន i18n ជាក់លាក់

  const favorites = useWishlist((state) => state.favorites);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch("/api/foods");
        if (res.ok) {
          const data = await res.json();
          setFoods(data);
        }
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  const favoriteFoods = foods.filter((food) => favorites.includes(food.id));

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between font-sans">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* ប៊ូតុងត្រឡប់ក្រោយ (Back to Menu) */}
          <Link
            href={`/${locale}/menu`}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-6 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} /> 
            <span>{locale === "km" ? "ត្រឡប់ទៅកាន់មុខម្ហូបវិញ" : "Back to Menu"}</span>
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart size={26} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-black">
                {locale === "km" ? "ម្ហូបដែលខ្ញុំចូលចិត្ត" : "My Favorite Foods"}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {locale === "km" ? "មុខម្ហូបដែលអ្នកបានរក្សាទុកក្នុងបញ្ជី" : "Items you have saved to your wishlist"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">
              {locale === "km" ? "កំពុងទាញយកទិន្នន័យ..." : "Loading favorites..."}
            </div>
          ) : favoriteFoods.length === 0 ? (
            <div className="text-center py-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-3xl p-8 space-y-4 shadow-xl shadow-gray-100/50 dark:shadow-none">
              <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-700" />
              <h2 className="text-xl font-bold">
                {locale === "km" ? "គ្មានម្ហូបដែលចូលចិត្តនៅឡើយទេ" : "No favorites yet"}
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium">
                {locale === "km" 
                  ? "ស្វែងរកមុខម្ហូបរបស់យើង ហើយចុចលើរូបសញ្ញាបេះដូងដើម្បីរក្សាទុកវានៅទីនេះ។" 
                  : "Explore our menu and click the heart icon on any food item to save it here."}
              </p>
              <Link
                href={`/${locale}/menu`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 text-sm uppercase tracking-wider"
              >
                {locale === "km" ? "ទៅកាន់មុខម្ហូប" : "Explore Menu"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteFoods.map((food) => (
                <div key={food.id} className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  {/* អ្នកអាចប្តូរដាក់ FoodCard វិញតាមតម្រូវការ */}
                  <h3 className="font-bold text-lg">
                    {locale === "km" && (food as any).nameKm ? (food as any).nameKm : food.name}
                  </h3>
                  <p className="text-orange-600 font-black mt-2">${food.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
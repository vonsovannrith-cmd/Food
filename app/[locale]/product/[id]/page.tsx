"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, ArrowLeft, Star, Clock, Flame, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/store/CartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const locale = (params?.locale as string) || "km";
  const t = useTranslations("ProductDetailPage");

  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    if (!id) return;
    async function fetchFoodDetail() {
      try {
        const res = await fetch(`/api/foods/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFood(data);
        }
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFoodDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-between font-sans">
        <Navbar />
        <div className="text-center py-32 flex justify-center items-center">
          <Loader2 className="animate-spin text-orange-500" size={36} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-between font-sans">
        <Navbar />
        <div className="text-center py-24 space-y-6 max-w-lg mx-auto px-6">
          <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 shadow-xl space-y-4">
            <h2 className="text-2xl font-black tracking-tight">
              {t("notFoundTitle", { default: "Product Not Found" })}
            </h2>
            <Link
              href={`/${locale}/menu`}
              className="inline-flex items-center justify-center bg-orange-500 text-white font-black px-8 py-3.5 rounded-2xl"
            >
              {t("backToMenu", { default: "Back to Menu" })}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 1. Safe String Resolution for Name & Description
  const displayName = 
    locale === "km" 
      ? (food.nameKm || food.name) 
      : food.name;

  const displayDescription = 
    locale === "km" 
      ? (food.descriptionKm || food.description) 
      : food.description;

  // 2. Safe Category String Extraction (Preventing Object-as-Child React Error)
  let categoryName = "Khmer Dish";
  if (food.category) {
    if (typeof food.category === "object") {
      categoryName = locale === "km" 
        ? (food.category.nameKm || food.category.name || "ម្ហូបខ្មែរ")
        : (food.category.name || "Khmer Dish");
    } else if (typeof food.category === "string") {
      categoryName = food.category;
    }
  }

  const handleAddToCart = () => {
    if (!food) return;

    addToCart({
      id: food.id,
      name: displayName,
      price: food.price,
      image: food.image,
      quantity: quantity,
    });

    alert(`Added ${quantity} ${displayName} to cart successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between font-sans">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          <Link
            href={`/${locale}/menu`}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-8 hover:opacity-80"
          >
            <ArrowLeft size={16} /> <span>{t("backToMenu", { default: "Back to Menu" })}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Food Image */}
            <div className="relative h-80 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <Image
                src={food.image || "/foods/khmer-cuisin.jpg"}
                alt={typeof displayName === "string" ? displayName : "Food image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Food Info */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                  {categoryName}
                </span>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mt-3">
                  {displayName}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-bold text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-xl">
                    <Star size={14} fill="currentColor" /> {food.rating || 4.8} (120+ reviews)
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-xl">
                    <Clock size={14} /> 20-30 mins
                  </span>
                  <span className="flex items-center gap-1 text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-xl">
                    <Flame size={14} /> {t("popular", { default: "Popular" })}
                  </span>
                </div>
              </div>

              <div className="text-3xl font-black text-orange-600 dark:text-orange-400">
                ${food.price?.toFixed(2)}
              </div>

              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                {displayDescription}
              </p>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/60">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3.5 font-black text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-6 font-black text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3.5 font-black text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all text-sm uppercase tracking-wider"
                >
                  <ShoppingCart size={18} /> 
                  <span>{t("addToCart", { default: "Add to Cart" })} - ${(food.price * quantity).toFixed(2)}</span>
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
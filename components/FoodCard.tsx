"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag, Star, Clock, Sparkles } from "lucide-react";
import { Food } from "@/data/foods";
import { useCart } from "@/store/CartStore";
import { useWishlist } from "@/store/wishlistStore";
import { useTranslations } from "next-intl";

interface FoodCardProps {
  food: Food;
}

export default function FoodCard({ food }: FoodCardProps) {
  const t = useTranslations("FoodCard");
  const pathname = usePathname();
  
  // Detect current locale (defaults to 'km')
  const currentLocale = pathname.split("/")[1] || "km";
  const isKm = currentLocale === "km";

  // Dynamic localization selection
  const foodName = isKm && food.nameKm ? food.nameKm : food.name;
  const foodDescription = isKm && food.descriptionKm ? food.descriptionKm : food.description;

  const addToCart = useCart((state) => state.addToCart);
  const favorites = useWishlist((state) => state.favorites);
  const toggleFavorite = useWishlist((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(food.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[28px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5">
      
      {/* Image & Header Overlay Container */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={food.image}
          alt={foodName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70" />

        {/* Sale Badge */}
        {food.oldPrice && (
          <div className="absolute left-3.5 top-3.5 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[10px] font-black tracking-wider uppercase text-white shadow-md shadow-orange-500/20">
            <Sparkles size={11} /> {t("sale")}
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          type="button"
          onClick={() => toggleFavorite(food.id)}
          aria-label={t("saveToWishlist")}
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            size={18}
            className={`transition-colors duration-200 ${
              isFavorite
                ? "fill-rose-500 text-rose-500"
                : "text-stone-600 dark:text-stone-300 hover:text-rose-500"
            }`}
          />
        </button>

        {/* Delivery Time Pill */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-stone-900/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-stone-100 border border-white/10 shadow-sm">
          <Clock size={13} className="text-orange-400" />
          <span>{food.deliveryTime || "20-30 min"}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        
        {/* Title, Category & Rating */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
              {foodName}
            </h3>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 px-2.5 py-1 rounded-xl text-amber-600 dark:text-amber-400">
              <Star size={13} fill="currentColor" />
              <span className="text-xs font-black">{food.rating}</span>
            </div>
          </div>

          <p className="text-[11px] font-bold tracking-wider uppercase text-orange-600 dark:text-orange-400">
            {food.category}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
          {foodDescription}
        </p>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/80">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                ${food.price.toFixed(2)}
              </span>
              {food.oldPrice && (
                <span className="text-xs font-medium text-stone-400 dark:text-stone-500 line-through">
                  ${food.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={() =>
              addToCart({
                id: food.id,
                name: foodName, // Store localized name in cart
                image: food.image,
                price: food.price,
                quantity: 1,
              })
            }
            aria-label={t("addToCart")}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* View Details Link */}
        <Link
          href={`/${currentLocale}/product/${food.id}`}
          className="flex w-full items-center justify-center rounded-2xl border border-orange-500/25 bg-orange-50/60 dark:bg-orange-950/20 py-3 text-xs font-bold text-orange-600 dark:text-orange-400 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm"
        >
          {t("viewDetails")}
        </Link>

      </div>
    </div>
  );
}
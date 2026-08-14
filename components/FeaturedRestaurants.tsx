"use client";

import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function FeaturedRestaurants() {
  const locale = useLocale(); // ទាញយក Locale បច្ចុប្បន្ន (km ឬ en)
  const t = useTranslations("FeaturedRestaurants");

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-orange-600 dark:text-orange-400 mb-2 block">
            {t("topPicks")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            {t("title")} 🏪
          </h2>
        </div>
        
        {/* បន្ថែម `/${locale}` ទៅលើតំណភ្ជាប់ Explore All */}
        <Link
          href={`/${locale}/restaurants`}
          className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors group"
        >
          <span>{t("exploreAll")}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Restaurant Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-orange-500/10"
          >
            {/* Restaurant Image Wrapper */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={500}
                height={300}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Delivery Time Badge Overlay */}
              <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10">
                <Clock size={13} className="text-orange-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {restaurant.name}
                  </h3>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 px-2.5 py-1 rounded-xl text-amber-600 dark:text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-black">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ({restaurant.reviews} {t("reviews")})
                </p>
              </div>

              {/* បន្ថែម `/${locale}` ទៅលើតំណភ្ជាប់ View Menu */}
              <Link
                href={`/${locale}/restaurants/${restaurant.id}`}
                className="flex w-full items-center justify-center rounded-2xl bg-orange-500 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 active:scale-95"
              >
                {t("viewMenu")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
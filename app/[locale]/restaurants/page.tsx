import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { Star, Clock, Sparkles, ArrowRight, UtensilsCrossed, ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RestaurantsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("RestaurantsPage");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100/50 to-gray-50 dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors w-fit bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>{t("backButton", { default: "Back" })}</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 dark:border-gray-800/80 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-black tracking-wider uppercase border border-orange-500/20 shadow-sm">
              <Sparkles size={14} className="animate-pulse" /> {t("badge")}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              {t("title")} <span className="inline-block hover:rotate-12 transition-transform">🏪</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm self-start md:self-auto">
            <UtensilsCrossed size={16} className="text-orange-500" />
            <span>{restaurants.length} {t("availablePartners")}</span>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Restaurant Image Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Delivery Time Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-2xl bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/10 shadow-lg">
                  <Clock size={14} className="text-orange-400" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                {/* Verified Tag Overlay */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white p-2 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Sparkles size={14} />
                </div>
              </div>

              {/* Card Body Content */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors tracking-tight">
                      {restaurant.name}
                    </h3>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/30 px-3 py-1.5 rounded-2xl text-amber-600 dark:text-amber-400 shadow-sm">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black">{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    ({restaurant.reviews} {t("reviews")}) • <span className="text-emerald-600 dark:text-emerald-400 font-bold">Open Now</span>
                  </p>
                </div>

                {/* View Detail Button */}
                <Link
                  href={`/${locale}/restaurants/${restaurant.id}`}
                  className="group/btn relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 dark:bg-gray-800 py-3.5 text-xs font-extrabold text-white shadow-md transition-all duration-300 hover:bg-orange-500 dark:hover:bg-orange-500 hover:shadow-orange-500/25 active:scale-95"
                >
                  <span>{t("viewDetail", { default: "View Detail" })}</span>
                  <ArrowRight size={16} className="transform transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
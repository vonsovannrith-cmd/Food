import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { Star, Clock, ArrowLeft, MapPin, Phone, Mail, Sparkles, ShieldCheck, ExternalLink, Calendar, ShoppingBag, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const t = await getTranslations("RestaurantDetail");
  
  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl font-black">
            404
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">{t("notFoundTitle")}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t("notFoundDesc")}</p>
          <Link 
            href={`/${locale}/restaurants`} 
            className="flex items-center justify-center w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-orange-500/25 transition-all active:scale-95"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  // Proper external Google Maps target link
  const mapQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.name}, Phnom Penh, Cambodia`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-slate-100/30 to-slate-50/60 dark:from-slate-950 dark:via-slate-900/20 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link
          href={`/${locale}/restaurants`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 shadow-sm transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>{t("back")}</span>
        </Link>

        {/* Shop Header Banner */}
        <div className="relative h-80 sm:h-[28rem] w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover transform hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 space-y-4 text-white">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500 text-xs font-black tracking-wider uppercase shadow-lg shadow-orange-500/20">
              <Sparkles size={14} /> {t("verifiedPartner")}
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
              {restaurant.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm pt-1">
              <div className="flex items-center gap-1.5 bg-amber-500 px-4 py-2 rounded-2xl font-black text-white shadow-lg">
                <Star size={16} fill="currentColor" />
                <span>{restaurant.rating}</span>
                <span className="opacity-80">({restaurant.reviews} {t("reviews")})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-white font-bold">
                <Clock size={16} className="text-orange-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Bio, Contact, Gallery */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Card */}
            <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-orange-500/10 text-orange-500">
                  <ShieldCheck size={22} />
                </div> 
                {t("aboutTitle")} {restaurant.name}
              </h2>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {t("aboutDescriptionPrefix")} {restaurant.name}! {t("aboutDescriptionBody")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="p-3 rounded-xl bg-orange-500 text-white shadow-sm">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("phoneContact")}</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white">+855 12 345 678</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="p-3 rounded-xl bg-orange-500 text-white shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("emailSupport")}</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white truncate">support@{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Atmosphere */}
            <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{t("atmosphereGallery")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[1, 2, 3].map((imgIdx) => (
                  <div key={imgIdx} className="relative h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-md">
                    <Image
                      src={restaurant.image}
                      alt="Shop view"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Location & Hours */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-orange-500/10 text-orange-500">
                  <MapPin size={20} />
                </div>
                {t("locationAddress")}
              </h3>
              
              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-bold text-slate-900 dark:text-white leading-relaxed">
                  #123, Monivong Blvd, Sangkat Boeung Keng Kang, Khan BKK, Phnom Penh, Cambodia
                </p>
                
                {/* Clickable Map Preview Container */}
                <Link
                  href={mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center group block cursor-pointer shadow-inner"
                >
                  <Image
                    src={restaurant.image}
                    alt="Map location preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover opacity-60 blur-[2px] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center text-white p-3 text-center">
                    <div className="p-3 bg-orange-500 rounded-full shadow-lg mb-2 animate-bounce">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <span className="font-black text-xs flex items-center gap-1">
                      {t("viewInteractiveMap")} <ExternalLink size={12} />
                    </span>
                  </div>
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{t("operatingHours")}</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <span>{t("daysOpen")}</span>
                  <span className="font-black text-orange-500">08:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
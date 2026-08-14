"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tag, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function OffersPage() {
  const t = useTranslations("OffersPage");

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-8 lg:p-14 text-white shadow-2xl mb-12">
            <div className="relative z-10 max-w-xl space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm">
                <Sparkles size={14} /> {t("badge", { default: "Special Promotions" })}
              </span>
              <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                {t("title", { default: "Delicious Deals & Discounts" })}
              </h1>
              <p className="text-white/90 text-sm lg:text-base font-medium leading-relaxed">
                {t("subtitle", {
                  default: "Enjoy your favorite authentic Khmer dishes with exclusive discounts, combo offers, and free delivery promotions available today!",
                })}
              </p>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Offer Card 1 */}
            <div className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/70 dark:border-gray-800 p-8 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <Tag size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("offer1Title", { default: "Weekend Family Combo" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("offer1Desc", {
                  default: "Get 20% off on all traditional family platters, including Beef Lok Lak and Samlor Korkor.",
                })}
              </p>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
                >
                  <span>{t("orderNow", { default: "Order Now" })}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Offer Card 2 */}
            <div className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/70 dark:border-gray-800 p-8 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <Tag size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("offer2Title", { default: "Free Delivery Promo" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("offer2Desc", {
                  default: "Enjoy zero delivery fees on all orders above $15 within the city center.",
                })}
              </p>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
                >
                  <span>{t("claimOffer", { default: "Claim Offer" })}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Offer Card 3 */}
            <div className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/70 dark:border-gray-800 p-8 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110">
                <Tag size={26} />
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {t("offer3Title", { default: "Lunch Hour Special" })}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {t("offer3Desc", {
                  default: "Save $3 on selected rice bowls and noodle soups every weekday from 11 AM to 2 PM.",
                })}
              </p>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-black text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors"
                >
                  <span>{t("viewMenu", { default: "View Menu" })}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
"use client";

import { Bell, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminNavbar() {
  const t = useTranslations("AdminNavbar");

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 px-6 sm:px-8 backdrop-blur-xl transition-colors font-sans">
      
      {/* Left Greeting Section */}
      <div className="space-y-0.5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
          {t("welcome", { default: "Welcome Admin 👋" })}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
          {t("subtitle", { default: "Manage your restaurant easily" })}
        </p>
      </div>

      {/* Right Search & Action Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Search Bar Input */}
        <div className="hidden md:flex items-center rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 px-4 py-2.5 transition-all focus-within:border-orange-500 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:shadow-md focus-within:shadow-orange-500/10">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={t("searchPlaceholder", { default: "Search menu, orders..." })}
            className="ml-2.5 bg-transparent text-xs sm:text-sm font-bold text-gray-900 dark:text-white outline-none placeholder:text-gray-400 w-40 lg:w-64"
          />
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          aria-label={t("notificationsAria", { default: "View Notifications" })}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-sm transition-all hover:border-orange-500 hover:text-orange-500 active:scale-95 cursor-pointer"
        >
          <Bell size={20} />
          {/* Notification status dot */}
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
        </button>

        {/* Admin Avatar Profile Pill */}
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 font-black text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/20">
          A
        </div>

      </div>
    </header>
  );
}
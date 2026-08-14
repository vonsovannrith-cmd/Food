"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("DashboardHeader");

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 px-6 sm:px-8 backdrop-blur-xl transition-colors font-sans">
      
      {/* Left Title / Branding Section */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block">
            {t("overview", { default: "Overview" })}
          </span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            {t("title", { default: "Dashboard 🚀" })}
          </h1>
        </div>
      </div>

      {/* Right Controls & Role Pill */}
      <div className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />

        {/* Professional Admin Role Pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-orange-500/30 bg-orange-50 dark:bg-orange-950/40 px-4 py-2.5 shadow-sm shadow-orange-500/5">
          <Sparkles size={14} className="text-orange-600 dark:text-orange-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-black text-orange-700 dark:text-orange-300">
            {t("role", { default: "Admin" })}
          </span>
        </div>
      </div>

    </header>
  );
}
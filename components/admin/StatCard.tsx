"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface Props {
  title?: string;
  value: number;
  icon: ReactNode;
  translationKey?: string; // Optional key for localization
}

export default function StatCard({
  title = "Statistic",
  value,
  icon,
  translationKey,
}: Props) {
  const t = useTranslations("StatCard");

  // Use localized title if translationKey exists, otherwise fallback to title prop
  const displayTitle = translationKey ? t(translationKey, { default: title }) : title;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-7 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 font-sans">
      
      {/* Background Accent Glow on Hover */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl" />

      <div className="relative flex items-center justify-between">
        
        {/* Title and Value Section */}
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {displayTitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white tabular-nums">
            {value.toLocaleString()}
          </h2>
        </div>

        {/* Dynamic Icon Container with Theme Match */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

      </div>
    </div>
  );
}
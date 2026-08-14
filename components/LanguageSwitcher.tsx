"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // ជំនួស locale ចាស់ក្នុង pathname ទៅ locale ថ្មីដោយសុវត្ថិភាព
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  return (
    <div className="relative flex items-center group">
      {/* Icon ខាងមុខជួយឱ្យ UI មើលទៅមានភាពទាក់ទាញ និងចំណាំងាយ */}
      <Globe className="absolute left-2.5 h-3.5 w-3.5 text-gray-500 dark:text-gray-400 pointer-events-none group-hover:text-orange-500 transition-colors" />

      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        aria-label="Select Language"
        className="
          appearance-none cursor-pointer
          pl-8 pr-7 py-1.5 rounded-xl text-xs font-bold
          bg-gray-100/80 dark:bg-gray-800/80
          text-gray-700 dark:text-gray-200
          border border-gray-200/80 dark:border-gray-700/80
          hover:border-orange-400 dark:hover:border-orange-600
          focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500
          transition-all duration-200 shadow-sm
        "
      >
        <option value="en" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium">
          English
        </option>
        <option value="km" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium">
          ខ្មែរ
        </option>
      </select>

      {/* Custom Dropdown Arrow ឱ្យស្អាតជាងមុន */}
      <div className="absolute right-2.5 pointer-events-none text-gray-400 text-[10px]">
        ▼
      </div>
    </div>
  );
}
"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const t = useTranslations("SearchBar");

  // ប្រើប្រាស់ placeholder ដែលបានផ្ញើមក ឬយកពី translation ជាលំនាំដើម
  const defaultPlaceholder = placeholder || t("placeholder", { default: "Search Khmer food..." });

  return (
    <div className="relative w-full max-w-2xl mx-auto group font-sans">
      {/* Search Icon with dynamic color on focus */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={defaultPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full py-3.5 pl-12 pr-12
          text-sm sm:text-base font-bold text-gray-900 placeholder:text-gray-400
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
          border border-gray-200/80 dark:border-gray-800 rounded-2xl
          shadow-lg shadow-gray-100/50 dark:shadow-none
          outline-none transition-all duration-300
          
          hover:border-orange-300 dark:hover:border-gray-700 hover:shadow-xl
          focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/15 focus:shadow-2xl focus:shadow-orange-500/10
          
          dark:text-gray-100 dark:placeholder:text-gray-500
          dark:focus:border-orange-500 dark:focus:ring-orange-500/20
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute right-3.5 top-1/2 -translate-y-1/2
            p-1.5 rounded-full cursor-pointer
            text-gray-400 bg-gray-100 hover:bg-orange-100 hover:text-orange-600
            active:scale-95 transition-all duration-200
            dark:bg-gray-800 dark:hover:bg-orange-950 dark:hover:text-orange-400
          "
          aria-label={t("clearLabel", { default: "Clear search" })}
        >
          <X size={16} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
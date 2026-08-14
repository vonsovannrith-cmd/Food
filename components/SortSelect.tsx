"use client";

import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: Props) {
  const t = useTranslations("SortSelect");

  return (
    <div className="relative w-full sm:w-auto font-sans">
      {/* Icon */}
      <ArrowDownUp
        className="
          absolute
          left-3.5
          top-1/2
          -translate-y-1/2
          h-4
          w-4
          text-orange-500
          pointer-events-none
        "
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          sm:w-auto
          appearance-none
          cursor-pointer
          rounded-2xl
          border
          border-gray-200/80
          bg-white/90
          py-3
          pl-10
          pr-10
          text-sm
          font-bold
          text-gray-900
          shadow-lg
          shadow-gray-100/50
          outline-none
          transition-all
          duration-300
          
          hover:border-orange-400
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/15
          
          dark:border-gray-800
          dark:bg-gray-900/90
          dark:text-gray-100
          dark:hover:border-orange-500
          dark:focus:ring-orange-500/20
        "
      >
        <option value="default">{t("default", { default: "🍽️ Sort By" })}</option>
        <option value="priceLow">{t("priceLow", { default: "💰 Price: Low → High" })}</option>
        <option value="priceHigh">{t("priceHigh", { default: "💎 Price: High → Low" })}</option>
        <option value="rating">{t("rating", { default: "⭐ Highest Rating" })}</option>
      </select>
    </div>
  );
}
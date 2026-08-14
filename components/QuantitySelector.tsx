"use client";

import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 1,
  max,
}: QuantitySelectorProps) {
  const t = useTranslations("QuantitySelector");

  const handleDecrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (max === undefined || quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const isMinReached = quantity <= min;
  const isMaxReached = max !== undefined && quantity >= max;

  return (
    <div className="inline-flex items-center gap-2 p-1.5 bg-gray-100/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 shadow-inner backdrop-blur-md font-sans">
      {/* Decrease Button */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMinReached}
        aria-label={t("decreaseLabel", { default: "Decrease quantity" })}
        className={`
          flex items-center justify-center h-10 w-10 rounded-xl font-bold text-sm
          transition-all duration-200 select-none cursor-pointer
          ${
            isMinReached
              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-transparent"
              : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 shadow-sm hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-600 active:scale-95"
          }
        `}
      >
        <Minus className="h-4 w-4 stroke-[3]" />
      </button>

      {/* Quantity Display */}
      <span className="w-10 text-center font-black text-base text-gray-900 dark:text-white select-none tabular-nums">
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={isMaxReached}
        aria-label={t("increaseLabel", { default: "Increase quantity" })}
        className={`
          flex items-center justify-center h-10 w-10 rounded-xl font-bold text-sm
          transition-all duration-200 select-none cursor-pointer
          ${
            isMaxReached
              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed bg-transparent"
              : "text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 active:scale-95"
          }
        `}
      >
        <Plus className="h-4 w-4 stroke-[3]" />
      </button>
    </div>
  );
}
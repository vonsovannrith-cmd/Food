"use client";

import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/store/CartStore";
import { useTranslations } from "next-intl";

interface Props {
  item: {
    id: number;
    name: string;
    nameKh?: string;
    price: number;
    image: string;
    quantity: number;
  };
  locale: string;
}

export default function CartItem({ item }: Props) {
  const t = useTranslations("CartItem");
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);

  return (
    <div className="group flex items-center gap-4 sm:gap-6 rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      
      {/* Item Image */}
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={item.image}
          alt={item.name}
          width={120}
          height={120}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content & Controls Container */}
      <div className="flex flex-1 flex-col justify-between space-y-3">
        
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm font-black text-orange-600 dark:text-orange-400 mt-0.5">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {/* Delete Action Button */}
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label={t("removeItem")}
            className="rounded-xl p-2 text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Quantity Controls & Subtotal */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 p-1 border border-gray-200/50 dark:border-gray-700/50">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              aria-label={t("decreaseQuantity")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
            >
              <Minus size={14} />
            </button>

            <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              aria-label={t("increaseQuantity")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Item Total Price */}
          <div className="text-right">
            <span className="text-xs text-gray-400 block">{t("total")}</span>
            <span className="text-base font-black text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
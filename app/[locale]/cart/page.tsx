"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/store/CartStore";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "km";
  const t = useTranslations("CartPage");

  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart((state) => state.cart);
  const subtotal = useCart((state) => state.totalPrice());
  const [note, setNote] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // បង្ហាញ Loading រហូតដល់ Client Mount រួច ដើម្បីការពារ Hydration Error
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-between items-center py-32">
        <Loader2 className="animate-spin text-orange-500" size={36} />
      </div>
    );
  }

  const delivery = subtotal > 0 ? 1.5 : 0;
  const tax = subtotal * 0.1;

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between font-sans transition-colors duration-300">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 flex-1 w-full">
        <h1 className="mb-10 text-4xl font-black tracking-tight">
          🛒 {t("title", { default: "Shopping Cart" })}
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 max-w-md mx-auto shadow-xl space-y-4">
              <h2 className="text-2xl font-black">{t("emptyTitle", { default: "Your cart is empty" })}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {t("emptySub", { default: "Add some delicious Khmer food!" })}
              </p>
              <Link
                href={`/${locale}/menu`}
                className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95"
              >
                {t("browseMenu", { default: "Browse Menu" })}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-5 lg:col-span-2">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} locale={locale} />
              ))}

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-black">{t("orderNotes", { default: "Order Notes" })}</h3>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("notePlaceholder", { default: "Example: No spicy, extra sauce..." })}
                  className="h-32 w-full rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <OrderSummary 
                subtotal={subtotal} 
                delivery={delivery} 
                tax={tax} 
                notes={note} 
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
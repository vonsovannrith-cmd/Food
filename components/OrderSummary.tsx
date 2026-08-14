"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useCart } from "@/store/CartStore";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
  subtotal: number;
  delivery: number;
  tax: number;
  notes?: string;
}

export default function OrderSummary({ subtotal, delivery, tax, notes }: OrderSummaryProps) {
  const t = useTranslations("OrderSummary");
  const router = useRouter();
  const cart = useCart((state) => state.cart);
  const clearCart = useCart((state) => state.clearCart);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = subtotal + delivery + tax;

  async function handleCheckout() {
    setError("");
    
    // 1. Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      setError(t("emptyCartError", { default: "Your cart is empty." }));
      return;
    }

    try {
      setLoading(true);
      const user = JSON.parse(storedUser);

      // 2. Format payload to match backend Prisma schema expectations
      const payload = {
        userId: user.id,
        totalAmount: total,
        address: user.address || "Phnom Penh",
        phone: user.phone || "",
        notes: notes || "",
        items: cart.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // 3. Send POST request to backend orders API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || t("checkoutFailed", { default: "Checkout failed" }));
      }

      // 4. Clear cart and redirect to user orders or success page
      clearCart();
      router.push("/orders");
      router.refresh();

    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || t("genericError", { default: "Something went wrong during checkout." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white font-sans">
        {t("title", { default: "Order Summary" })}
      </h2>

      {/* Promo Code Section */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
          {t("promoLabel", { default: "Promo / Coupon Code" })}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t("promoPlaceholder", { default: "e.g. KHMER20" })}
            className="w-full rounded-xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-3.5 py-2.5 text-xs font-bold text-gray-900 dark:text-white outline-none focus:border-orange-500"
          />
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
          >
            {t("apply", { default: "Apply" })}
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-sm">
        <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
          <span>{t("subtotal", { default: "Subtotal" })}</span>
          <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
          <span>{t("deliveryFee", { default: "Delivery Fee" })}</span>
          <span className="font-bold text-gray-900 dark:text-white">${delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
          <span>{t("tax", { default: "Estimated Tax (10%)" })}</span>
          <span className="font-bold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">{t("total", { default: "Total" })}</span>
          <span className="text-[10px] font-medium text-gray-400">{t("includingTaxes", { default: "Including taxes & delivery" })}</span>
        </div>
        <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
          ${total.toFixed(2)}
        </span>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleCheckout}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all hover:opacity-95 active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>{t("processing", { default: "Processing Order..." })}</span>
          </>
        ) : (
          <>
            <span>{t("proceedToCheckout", { default: "Proceed to Checkout" })}</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-400 pt-1">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>{t("secureCheckout", { default: "Encrypted & Secure Checkout" })}</span>
      </div>
    </div>
  );
}
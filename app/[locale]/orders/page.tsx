"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Package, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function OrdersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  
  // ហៅប្រើប្រាស់ Namespace ឱ្យបានត្រឹមត្រូវ
  const t = useTranslations("OrdersPage");

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push(`/${locale}/login`);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      fetchOrders(user.id);
    } catch (e) {
      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  async function fetchOrders(userId: number) {
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
        <Link
          href={`/${locale}/profile`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span>{t("backToProfile")}</span>
        </Link>

        {/* Header Title */}
        <div className="flex items-center gap-3.5 mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center items-center">
            <Loader2 className="animate-spin text-orange-500" size={36} />
          </div>
        ) : !Array.isArray(orders) || orders.length === 0 ? (
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-3xl p-12 text-center shadow-xl shadow-gray-100/50 dark:shadow-none space-y-6 max-w-lg mx-auto">
            <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 shadow-sm">
              <Package size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">
                {t("emptyTitle")}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t("emptySub")}
              </p>
            </div>
            <div>
              <Link
                href={`/${locale}/menu`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95"
              >
                <span>{t("exploreMenu")}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/70 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-5 transition-all"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                      {t("orderId")} #{order.id}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-wider shadow-sm">
                    <Clock size={12} />
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.orderItems?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm font-bold"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        <span className="text-orange-500 font-black">{item.quantity}x</span> {item.food?.name}
                      </span>
                      <span className="text-orange-600 dark:text-orange-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center font-black">
                  <span className="text-sm uppercase tracking-wider text-gray-500">{t("totalAmount")}</span>
                  <span className="text-lg text-orange-600 dark:text-orange-400">
                    ${Number(order.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
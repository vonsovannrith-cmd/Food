"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: {
    quantity: number;
    food: {
      name: string;
    };
  }[];
}

export default function OrdersPage() {
  const t = useTranslations("OrdersPage");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        loadOrders();
      } else {
        alert(t("alertFailedUpdate", { default: "Failed to update order status." }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("fulfillmentManagement", { default: "Fulfillment Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <ShoppingCart className="text-orange-500" size={32} />
            <span>{t("pageTitle", { default: "Orders Management 🛒" })}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {t("pageSubtitle", { default: "Track live customer orders, review cart items, and update fulfillment states." })}
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center gap-3 text-orange-500 font-black">
            <Loader2 className="animate-spin" size={24} />
            <span>{t("loadingOrders", { default: "Loading orders..." })}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-xs font-black uppercase tracking-wider">
                  <th className="py-4 px-6">{t("tableOrderId", { default: "Order ID" })}</th>
                  <th className="py-4 px-6">{t("tableCustomerDetails", { default: "Customer Details" })}</th>
                  <th className="py-4 px-6">{t("tableOrderedItems", { default: "Ordered Items" })}</th>
                  <th className="py-4 px-6">{t("tableTotalAmount", { default: "Total Amount" })}</th>
                  <th className="py-4 px-6">{t("tableDate", { default: "Date" })}</th>
                  <th className="py-4 px-6">{t("tableStatusControl", { default: "Status Control" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-500 dark:text-gray-400 text-sm font-bold">
                      {t("noOrdersFound", { default: "No orders found in the system." })}
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                    >
                      
                      {/* ID */}
                      <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                        #{order.id}
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900 dark:text-white tracking-tight">
                          {order.user?.name || t("guestText", { default: "Guest" })}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {order.user?.email || t("noEmailText", { default: "No email" })}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0"></span>
                              <span className="font-bold text-gray-900 dark:text-white">{item.food?.name}</span>
                              <span className="text-orange-600 dark:text-orange-400 font-black">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6">
                        <div className="relative flex items-center">
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className={`rounded-xl border px-3.5 py-2 text-xs font-black uppercase tracking-wider outline-none transition-all cursor-pointer appearance-none pr-8 ${
                              order.status === "COMPLETED"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
                                : order.status === "PENDING"
                                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
                                : order.status === "PAID"
                                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40"
                                : order.status === "PREPARING"
                                ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40"
                                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/40"
                            }`}
                          >
                            <option value="PENDING" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">PENDING</option>
                            <option value="PAID" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">PAID</option>
                            <option value="PREPARING" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">PREPARING</option>
                            <option value="COMPLETED" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">COMPLETED</option>
                            <option value="CANCELLED" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">CANCELLED</option>
                          </select>
                          {updatingId === order.id && (
                            <span className="absolute right-2.5 text-orange-500 pointer-events-none">
                              <Loader2 className="animate-spin" size={14} />
                            </span>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
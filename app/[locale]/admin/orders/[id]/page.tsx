"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Loader2, 
  Printer, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  FileText, 
  Clock, 
  Save 
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Order {
  id: number;
  total: number;
  status: string;
  note: string | null;
  createdAt: string;

  user: {
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
  } | null; // <--- កែសម្រួលទីនេះ ដើម្បីការពារករណី user គ្មានតម្លៃ (null/undefined)

  payment: {
    method: string;
    status: string;
    amount: number;
  } | null;

  items: {
    id: number;
    quantity: number;
    price: number;
    food: {
      name: string;
      image: string;
    };
  }[];
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("OrderDetailPage");
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  async function loadOrder() {
    try {
      setFetching(true);
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || t("alertFailedLoad", { default: "Failed to load order" }));
        return;
      }

      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  async function updateStatus() {
    try {
      setSaving(true);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || t("alertFailedUpdate", { default: "Failed to update status" }));
        return;
      }

      alert(t("alertUpdatedSuccess", { default: "Order updated successfully" }));
      await loadOrder();
    } catch (error) {
      console.error(error);
      alert(t("alertUpdateFailed", { default: "Update failed" }));
    } finally {
      setSaving(false);
    }
  }

  if (fetching || !order) {
    return (
      <div className="flex h-96 w-full items-center justify-center gap-3 text-orange-500 font-black">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-lg">{t("loadingDetails", { default: "Loading order details..." })}</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("fulfillmentManagement", { default: "Fulfillment Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <ShoppingBag className="text-orange-500" size={32} />
            <span>{t("orderTitle", { id: order.id, default: `Order #${order.id}` })}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {t("orderSubtitle", { default: "Review detailed invoice data, customer details, and modify order status." })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-md transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{t("backButton", { default: "Back" })}</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-md transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 cursor-pointer"
          >
            <Printer size={16} />
            <span>{t("printButton", { default: "Print" })}</span>
          </button>
        </div>
      </div>

      {/* Customer & Order Info Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Customer Information Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-5">
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2.5">
            <User className="text-orange-500" size={18} />
            <span>{t("customerInfoTitle", { default: "Customer Information" })}</span>
          </h2>

          <div className="space-y-3.5 text-sm">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 shrink-0"><User size={16} /></span>
              {/* ប្រើប្រាស់ Optional Chaining (?.) ដើម្បីការពារ Error ពេល user គ្មានតម្លៃ */}
              <span className="font-bold text-gray-900 dark:text-white">
                {order.user?.name || t("guestCustomer", { default: "Guest Customer" })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 shrink-0"><Mail size={16} /></span>
              <span className="truncate">{order.user?.email || t("noEmail", { default: "No email provided" })}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 shrink-0"><Phone size={16} /></span>
              <span>{order.user?.phone || t("noPhoneProvided", { default: "No phone provided" })}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-orange-500 shrink-0 mt-0.5"><MapPin size={16} /></span>
              <span>{order.user?.address || t("noAddressProvided", { default: "No address provided" })}</span>
            </div>
          </div>
        </div>

        {/* Order Meta Information Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-5">
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2.5">
            <Clock className="text-orange-500" size={18} />
            <span>{t("orderSummaryMeta", { default: "Order Summary Meta" })}</span>
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-gray-500 dark:text-gray-400 font-bold">{t("statusLabel", { default: "Status" })}</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                order.status === "COMPLETED"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40"
                  : order.status === "PENDING"
                  ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40"
                  : order.status === "DELIVERING"
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40"
                  : order.status === "PREPARING"
                  ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/40"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40"
              }`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-gray-500 dark:text-gray-400 font-bold">{t("totalAmountLabel", { default: "Total Amount" })}</span>
              <span className="font-black text-gray-900 dark:text-white text-base">${order.total.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-bold">{t("timestampLabel", { default: "Timestamp" })}</span>
              <span className="font-bold text-gray-700 dark:text-gray-300 text-xs">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Update Order Status Control Box */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white mb-4">
          {t("updateOrderStatusTitle", { default: "Update Order Status" })}
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 cursor-pointer"
          >
            <option value="PENDING">{t("statusPending", { default: "Pending" })}</option>
            <option value="PREPARING">{t("statusPreparing", { default: "Preparing" })}</option>
            <option value="DELIVERING">{t("statusDelivering", { default: "Delivering" })}</option>
            <option value="COMPLETED">{t("statusCompleted", { default: "Completed" })}</option>
            <option value="CANCELLED">{t("statusCancelled", { default: "Cancelled" })}</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>{t("savingStatus", { default: "Saving Status..." })}</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{t("updateStatusButton", { default: "Update Status" })}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ordered Foods Table */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white">
            {t("orderedItemsTitle", { count: order.items.length, default: `Ordered Items (${order.items.length})` })}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-xs font-black uppercase tracking-wider">
                <th className="py-4 px-6">{t("tableFoodItem", { default: "Food Item" })}</th>
                <th className="py-4 px-6">{t("tableQuantity", { default: "Quantity" })}</th>
                <th className="py-4 px-6">{t("tableUnitPrice", { default: "Unit Price" })}</th>
                <th className="py-4 px-6 text-right">{t("tableSubtotal", { default: "Subtotal" })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
              {order.items.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800 shrink-0 shadow-sm">
                        <Image
                          src={item.food.image || "/placeholder.png"}
                          alt={item.food.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white tracking-tight">
                        {item.food.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-black text-orange-600 dark:text-orange-400">
                    ×{item.quantity}
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-600 dark:text-gray-400">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-right font-black text-gray-900 dark:text-white tracking-tight">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment & Customer Notes Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Payment Details */}
        {order.payment && (
          <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-4">
            <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2.5">
              <CreditCard className="text-orange-500" size={18} />
              <span>{t("paymentInfoTitle", { default: "Payment Information" })}</span>
            </h2>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("paymentMethod", { default: "Method" })}</p>
                <p className="mt-1 font-bold text-gray-900 dark:text-white text-sm">{order.payment.method}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("paymentStatus", { default: "Status" })}</p>
                <span className={`mt-1 inline-block rounded-xl px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                  order.payment.status === "PAID"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40"
                    : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40"
                }`}>
                  {order.payment.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("paymentAmount", { default: "Amount" })}</p>
                <p className="mt-1 font-black text-orange-600 dark:text-orange-400 text-base">${order.payment.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Customer Note */}
        {order.note && (
          <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-4">
            <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2.5">
              <FileText className="text-orange-500" size={18} />
              <span>{t("customerNoteTitle", { default: "Customer Note" })}</span>
            </h2>
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 p-4 text-xs font-bold text-gray-700 dark:text-gray-300">
              {order.note}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
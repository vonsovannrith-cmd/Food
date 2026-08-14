"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Ban, 
  ShoppingBag, 
  DollarSign, 
  Hash, 
  ArrowLeft, 
  Eye, 
  Loader2 
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  createdAt: string;
  orders: {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    items: {
      quantity: number;
      food: {
        name: string;
      };
    }[];
  }[];
}

export default function CustomerDetailPage() {
  const t = useTranslations("CustomerDetailPage");
  const params = useParams();
  const id = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCustomer();
    }
  }, [id]);

  async function loadCustomer() {
    try {
      setLoading(true);
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      setCustomer(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !customer) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex items-center gap-3 text-orange-500 font-black">
          <Loader2 className="animate-spin" size={24} />
          <span>{t("loadingText", { default: "Loading customer profile..." })}</span>
        </div>
      </div>
    );
  }

  const totalSpend = customer.orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header / Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("profileViewSubtitle", { default: "Customer Profile View" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <User className="text-orange-500" size={32} />
            <span>{customer.name}</span>
          </h1>
        </div>

        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t("backBtn", { default: "Back to Customers" })}</span>
        </Link>
      </div>

      {/* Main Profile Overview Card */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">{t("emailLabel", { default: "Email Address" })}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">{t("phoneLabel", { default: "Phone Number" })}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{customer.phone || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">{t("addressLabel", { default: "Delivery Address" })}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{customer.address || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">{t("joinedDateLabel", { default: "Joined Date" })}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>

        {/* Profile Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Link
            href={`/admin/customers/${customer.id}/edit`}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Edit3 size={16} />
            <span>{t("editProfileBtn", { default: "Edit Profile" })}</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-sm transition-all hover:bg-rose-100 active:scale-95 cursor-pointer"
          >
            <Ban size={16} />
            <span>{t("blockCustomerBtn", { default: "Block Customer" })}</span>
          </button>
        </div>
      </div>

      {/* Statistics Metric Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        
        {/* Orders Count Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("totalOrdersCard", { default: "Total Orders" })}</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mt-1">
                {customer.orders.length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 shadow-sm">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        {/* Total Spending Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("totalSpendingCard", { default: "Total Spending" })}</p>
              <h2 className="text-3xl font-black tracking-tight text-orange-600 dark:text-orange-400 mt-1">
                ${totalSpend.toFixed(2)}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 shadow-sm">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Customer ID Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-gray-400">{t("customerIdCard", { default: "Customer ID" })}</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mt-1">
                #{customer.id}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 shadow-sm">
              <Hash size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* Order History Table Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">{t("orderHistoryTitle", { default: "Order History" })}</h2>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">{t("orderHistorySubtitle", { default: "All food orders placed by this customer." })}</p>
        </div>

        {customer.orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 mb-4 shadow-sm">
              <ShoppingBag size={32} />
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white">{t("noOrdersTitle", { default: "No orders found" })}</p>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {t("noOrdersSubtitle", { default: "This customer hasn't placed any orders yet." })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-4 px-6">{t("tableOrderId", { default: "Order ID" })}</th>
                  <th className="py-4 px-6">{t("tableItems", { default: "Items Summary" })}</th>
                  <th className="py-4 px-6">{t("tableTotal", { default: "Total Amount" })}</th>
                  <th className="py-4 px-6">{t("tableStatus", { default: "Status" })}</th>
                  <th className="py-4 px-6">{t("tableDate", { default: "Date" })}</th>
                  <th className="py-4 px-6 text-right">{t("tableAction", { default: "Action" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {customer.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    
                    {/* Order ID */}
                    <td className="py-4 px-6">
                      <span className="font-black text-gray-900 dark:text-white tracking-tight">
                        #{order.id}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-xs font-bold text-gray-600 dark:text-gray-300">
                            {item.food.name} <span className="text-orange-500 font-black">x {item.quantity}</span>
                          </p>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-6">
                      <span className="font-black text-gray-900 dark:text-white tracking-tight">
                        ${order.total.toFixed(2)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          order.status === "COMPLETED"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40"
                            : order.status === "PENDING"
                            ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40"
                            : "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/40"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        aria-label={`View order #${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>{t("viewBtn", { default: "View" })}</span>
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
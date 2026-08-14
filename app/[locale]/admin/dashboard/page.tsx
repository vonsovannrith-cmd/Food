"use client"; // Marks this component to execute on the client-side (Browser)

import { useEffect, useState } from "react";
import Image from "next/image";
import RevenueChart from "@/components/admin/RevenueChart";
import {
  UtensilsCrossed,
  FolderTree,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Interface representing the analytics data structure for the admin dashboard
interface DashboardData {
  totalFoods: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;

  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];

  topFoods: {
    id: number;
    name: string;
    image: string;
    sold: number;
  }[];

  recentOrders: {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }[];
}

export default function DashboardPage() {
  const t = useTranslations("DashboardPage"); // Initializes translation hook for dashboard metrics and elements

  const [dashboard, setDashboard] = useState<DashboardData | null>(null); // Stores fetched dashboard analytics data
  const [loading, setLoading] = useState(true);                            // Tracks initial loading state

  // Automatically fetch dashboard data when the component mounts
  useEffect(() => {
    loadDashboard();
  }, []);

  // Asynchronous function to fetch overall dashboard analytics from the admin API endpoint
  async function loadDashboard() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Displays a loading spinner screen while fetching dashboard data
  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center gap-3 text-orange-500 font-black">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-lg">{t("loadingAnalytics", { default: "Loading Dashboard Analytics..." })}</span>
      </div>
    );
  }

  // Displays an error message banner if dashboard data failed to load or is null
  if (!dashboard) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-3 text-rose-500 font-black">
        <AlertCircle size={36} />
        <span className="text-base">{t("loadingError", { default: "Failed to load dashboard data. Please try again." })}</span>
      </div>
    );
  }

  // Configuration array mapping statistic summary cards with respective icons and values
  const cards = [
    {
      title: t("cardTotalFoods", { default: "Total Foods" }),
      value: dashboard.totalFoods,
      bgLight: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
      icon: UtensilsCrossed,
    },
    {
      title: t("cardCategories", { default: "Categories" }),
      value: dashboard.totalCategories,
      bgLight: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      icon: FolderTree,
    },
    {
      title: t("cardTotalOrders", { default: "Total Orders" }),
      value: dashboard.totalOrders,
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      icon: ShoppingCart,
    },
    {
      title: t("cardActiveUsers", { default: "Active Users" }),
      value: dashboard.totalUsers,
      bgLight: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      icon: Users,
    },
    {
      title: t("cardTotalRevenue", { default: "Total Revenue" }),
      value: `$${dashboard.totalRevenue.toFixed(2)}`,
      bgLight: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Welcome Header & Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("overviewPanel", { default: "Overview Panel" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <LayoutDashboard className="text-orange-500" size={32} />
            <span>{t("dashboardTitle", { default: "Dashboard 🚀" })}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {t("welcomeMessage", { default: "Welcome back, Administrator. Here is what's happening today." })}
          </p>
        </div>
      </div>

      {/* Statistics Summary Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    {card.title}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </h2>
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${card.bgLight}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Layout Grid: Monthly Revenue Chart + Top Selling Foods */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Monthly Revenue Chart Container Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none lg:col-span-2 transition-colors">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-orange-500" />
                <span>{t("monthlyRevenueTitle", { default: "Monthly Revenue" })}</span>
              </h2>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                {t("monthlyRevenueDesc", { default: "Revenue overview and performance for the current year." })}
              </p>
            </div>
          </div>

          {/* Revenue Chart Component Rendering */}
          <div className="w-full pt-2">
            <RevenueChart data={dashboard.monthlyRevenue} />
          </div>
        </div>

        {/* Top Selling Foods List Container Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
          <div className="mb-6">
            <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
              {t("topFoodsTitle", { default: "Top Selling Foods 🍔" })}
            </h2>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              {t("topFoodsDesc", { default: "Most popular customer choices." })}
            </p>
          </div>

          <div className="space-y-4">
            {dashboard.topFoods.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm font-bold">
                {t("noTopFoods", { default: "No food items sold yet." })}
              </div>
            ) : (
              dashboard.topFoods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center justify-between gap-4 p-2.5 rounded-2xl transition-colors hover:bg-orange-50/40 dark:hover:bg-orange-950/20"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <Image
                        src={food.image || "/placeholder.png"}
                        alt={food.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                        {food.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                        {t("totalSoldText", { default: "Total sold:" })} <span className="text-orange-600 dark:text-orange-400 font-bold">{food.sold}</span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/50 dark:border-orange-900/40 px-3 py-1 text-xs font-black text-orange-600 dark:text-orange-400 shadow-sm">
                    {food.sold}x
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Recent Orders Table Section */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
              {t("recentOrdersTitle", { default: "Recent Orders 🛍️" })}
            </h2>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              {t("recentOrdersDesc", { default: "Latest customer orders processed through the system." })}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                <th className="py-4 px-6">{t("tableOrderId", { default: "Order ID" })}</th>
                <th className="py-4 px-6">{t("tableCustomerDetails", { default: "Customer Details" })}</th>
                <th className="py-4 px-6">{t("tableTotalAmount", { default: "Total Amount" })}</th>
                <th className="py-4 px-6">{t("tableStatus", { default: "Status" })}</th>
                <th className="py-4 px-6">{t("tableDate", { default: "Date" })}</th>
                <th className="py-4 px-6 text-right">{t("tableAction", { default: "Action" })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
              {dashboard.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500 dark:text-gray-400 text-sm font-bold">
                    {t("noRecentOrders", { default: "No recent orders found." })}
                  </td>
                </tr>
              ) : (
                dashboard.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    
                    {/* Order ID Column */}
                    <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                      #{order.id}
                    </td>

                    {/* Customer Information Column */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 dark:text-white tracking-tight">
                        {order.user?.name || t("guestUser", { default: "Guest User" })}
                      </div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                        {order.user?.email || t("noEmail", { default: "No email provided" })}
                      </div>
                    </td>

                    {/* Total Amount Column */}
                    <td className="py-4 px-6 font-black text-gray-900 dark:text-white tracking-tight">
                      ${order.total.toFixed(2)}
                    </td>

                    {/* Order Status Badge Column */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          order.status === "COMPLETED"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40"
                            : order.status === "PENDING"
                            ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40"
                            : order.status === "CANCELLED"
                            ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40"
                            : "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Created Date Column */}
                    <td className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action Button Column (View Order Details) */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        aria-label={`View order #${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95"
                      >
                        <Eye size={14} />
                        <span>{t("viewBtn", { default: "View" })}</span>
                      </Link>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
"use client";

import { ShoppingBag, Clock, CheckCircle2, DollarSign, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  total: number;
  pending: number;
  completed: number;
  revenue: number;
}

export default function OrderStats({
  total,
  pending,
  completed,
  revenue,
}: Props) {
  const t = useTranslations("OrderStats");

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4 font-sans">
      
      {/* Total Orders Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {t("totalOrders", { default: "Total Orders" })}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white tabular-nums">
              {total}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110 shadow-sm">
            <ShoppingBag size={26} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={14} />
          <span>{t("totalTrend", { default: "+12% from last week" })}</span>
        </div>
      </div>

      {/* Pending Orders Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {t("pendingOrders", { default: "Pending Orders" })}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-amber-600 dark:text-amber-400 tabular-nums">
              {pending}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110 shadow-sm">
            <Clock size={26} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
          <span>{t("pendingSub", { default: "Requires kitchen attention" })}</span>
        </div>
      </div>

      {/* Completed Orders Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {t("completedOrders", { default: "Completed Orders" })}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
              {completed}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 shadow-sm">
            <CheckCircle2 size={26} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <span>{t("completedSub", { default: "Successfully delivered" })}</span>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {t("totalRevenue", { default: "Total Revenue" })}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-orange-600 dark:text-orange-400 tabular-nums">
              ${revenue.toFixed(2)}
            </h2>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110 shadow-sm">
            <DollarSign size={26} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={14} />
          <span>{t("revenueTrend", { default: "+18.4% this month" })}</span>
        </div>
      </div>

    </div>
  );
}
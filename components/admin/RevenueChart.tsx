"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface RevenueData {
  date: string;
  revenue: number;
}

const defaultData = [
  { date: "Mon", revenue: 0 },
  { date: "Tue", revenue: 0 },
  { date: "Wed", revenue: 0 },
  { date: "Thu", revenue: 0 },
  { date: "Fri", revenue: 0 },
  { date: "Sat", revenue: 0 },
  { date: "Sun", revenue: 0 },
];

export default function RevenueChart() {
  const t = useTranslations("RevenueChart");
  const [data, setData] = useState<RevenueData[]>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const res = await fetch("/api/admin/revenue");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRevenue();
  }, []);

  return (
    <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300 font-sans">
      
      {/* Chart Header & Action Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shadow-sm">
              <TrendingUp size={20} />
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white">
              {t("title", { default: "Revenue Overview" })}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">
            {t("subtitle", { default: "Track daily earning trends & performance" })}
          </p>
        </div>

        {/* Filter / Date Pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm">
          <Calendar size={14} className="text-orange-500" />
          <span>{t("filter", { default: "This Week" })}</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[280px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm font-bold text-gray-400">
            Loading revenue data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
                strokeOpacity={0.4}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 700 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 700 }}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip
                formatter={(value: any) => [
                  `$${Number(value || 0).toFixed(2)}`,
                  t("tooltipLabel", { default: "Revenue" }),
                ]}
                contentStyle={{
                  backgroundColor: "#111827",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  padding: "12px 16px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fb923c", fontWeight: "bold" }}
                labelStyle={{ color: "#9ca3af", fontSize: "11px", marginBottom: "4px" }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                dot={{ r: 4, fill: "#f97316", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, fill: "#f97316", strokeWidth: 3, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
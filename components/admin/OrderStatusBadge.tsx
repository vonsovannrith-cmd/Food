"use client";

import { Clock, ChefHat, Bike, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  status: "PENDING" | "PREPARING" | "DELIVERING" | "COMPLETED" | "CANCELLED" | string;
}

export default function OrderStatusBadge({ status }: Props) {
  const t = useTranslations("OrderStatusBadge");
  const normalizedStatus = status?.toUpperCase() || "PENDING";

  // Configuration mapping status keys to translation and styles
  const statusConfig: Record<
    string,
    { 
      labelKey: string; 
      fallbackLabel: string;
      color: string; 
      icon: React.ComponentType<{ size: number; className?: string }> 
    }
  > = {
    PENDING: {
      labelKey: "pending",
      fallbackLabel: "Pending",
      color: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
      icon: Clock,
    },
    PREPARING: {
      labelKey: "preparing",
      fallbackLabel: "Preparing",
      color: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30",
      icon: ChefHat,
    },
    DELIVERING: {
      labelKey: "delivering",
      fallbackLabel: "On the Way",
      color: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      icon: Bike,
    },
    COMPLETED: {
      labelKey: "completed",
      fallbackLabel: "Completed",
      color: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
    },
    CANCELLED: {
      labelKey: "cancelled",
      fallbackLabel: "Cancelled",
      color: "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30",
      icon: XCircle,
    },
  };

  const config = statusConfig[normalizedStatus] || {
    labelKey: "",
    fallbackLabel: status,
    color: "bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30",
    icon: AlertCircle,
  };

  const IconComponent = config.icon;
  const displayLabel = config.labelKey ? t(config.labelKey, { default: config.fallbackLabel }) : config.fallbackLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-black tracking-wider shadow-sm transition-all duration-300 font-sans ${config.color}`}
    >
      <IconComponent size={14} className="shrink-0 animate-pulse" />
      <span>{displayLabel}</span>
    </span>
  );
}
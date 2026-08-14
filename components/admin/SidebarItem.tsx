"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  title: string;
}

export default function SidebarItem({
  href,
  icon,
  title,
}: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer font-sans ${
        active
          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
          : "text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800/80 hover:text-orange-600 dark:hover:text-orange-400"
      }`}
    >
      {/* Active Indicator Glow / Pill */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1.5 rounded-r-full bg-white shadow-sm animate-pulse" />
      )}

      {/* Icon with Hover Scale */}
      <div className={`transition-transform duration-200 group-hover:scale-110 ${active ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-orange-500"}`}>
        {icon}
      </div>

      <span className="tracking-tight">
        {title}
      </span>
    </Link>
  );
}
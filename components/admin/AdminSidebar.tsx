"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminSidebar() {
  const t = useTranslations("AdminSidebar");
  const pathname = usePathname();
  const router = useRouter();

  // ទាញយក locale បច្ចុប្បន្នពី URL (ឧទាហរណ៍៖ "km" ឬ "en")
  const currentLocale = pathname.split("/")[1] || "km";

  function logout() {
    localStorage.removeItem("user");
    router.push(`/${currentLocale}/login`);
  }

  const menus = [
    {
      name: t("dashboard", { default: "Dashboard" }),
      href: `/${currentLocale}/admin/dashboard`,
      icon: LayoutDashboard,
    },
    {
      name: t("foods", { default: "Foods" }),
      href: `/${currentLocale}/admin/foods`,
      icon: Utensils,
    },
    {
      name: t("categories", { default: "Categories" }),
      href: `/${currentLocale}/admin/categories`,
      icon: FolderTree,
    },
    {
      name: t("orders", { default: "Orders" }),
      href: `/${currentLocale}/admin/orders`,
      icon: ShoppingCart,
    },
    {
      name: t("payments", { default: "Payments" }),
      href: `/${currentLocale}/admin/payments`,
      icon: ShoppingCart,
    },
    {
      name: t("users", { default: "Users" }),
      href: `/${currentLocale}/admin/users`,
      icon: Users,
    },
    {
      name: t("settings", { default: "Settings" }),
      href: `/${currentLocale}/admin/settings`,
      icon: Settings,
    },
  ];

  return (
    <aside className="flex flex-col justify-between w-72 min-h-screen border-r border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-sm transition-colors font-sans">
      
      {/* Top Section: Logo & Navigation */}
      <div>
        {/* Brand Logo Header */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-gray-900 dark:text-white">
                Mhob Khmer
              </h1>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                {t("adminPanel", { default: "Admin Panel" })}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                    : "text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800/80 hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    active ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-orange-500"
                  }`}
                />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Logout Button & Footer status */}
      <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-rose-600 transition-all duration-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-95 group cursor-pointer"
        >
          <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>{t("logout", { default: "Logout System" })}</span>
        </button>
      </div>

    </aside>
  );
}
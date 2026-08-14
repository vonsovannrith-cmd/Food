"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  LogOut,
  LayoutDashboard,
  Heart,
  ShoppingBag,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import Logo from "./Logo";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // ទាញយក Locale បច្ចុប្បន្ន (km ឬ en)
  const t = useTranslations("Navbar");

  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUserSession = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse user session:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUserSession();

    window.addEventListener("storage", checkUserSession);
    window.addEventListener("userLoggedIn", checkUserSession);

    return () => {
      window.removeEventListener("storage", checkUserSession);
      window.removeEventListener("userLoggedIn", checkUserSession);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push(`/${locale}/login`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // បន្ថែម locale ពីមុខ href ទាំងអស់
  const mainNavLinks = [
    { name: t("home"), href: `/${locale}` },
    { name: t("menu"), href: `/${locale}/menu` },
    { name: t("offers"), href: `/${locale}/offers`, icon: Sparkles, badge: "New" },
    { name: t("about"), href: `/${locale}/about` },
  ];

  const userNavLinks = user
    ? [
        { name: t("orders"), href: `/${locale}/orders`, icon: ShoppingBag },
        { name: t("favorites"), href: `/${locale}/favorites`, icon: Heart },
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800/80 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Global Search Input */}
        <form
          onSubmit={handleSearch}
          className="mx-4 hidden flex-1 max-w-sm lg:flex group"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search")}
              className="
                w-full py-2 pl-10 pr-4 text-sm font-medium
                bg-gray-100/80 dark:bg-gray-800/80
                border border-transparent rounded-full
                text-gray-900 dark:text-white placeholder:text-gray-400
                outline-none transition-all duration-200
                focus:bg-white dark:focus:bg-gray-900
                focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
              "
            />
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center lg:flex gap-x-1">
          <div className="flex items-center gap-x-1 mr-1">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                        : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    }
                  `}
                >
                  {Icon && <Icon className="h-3.5 w-3.5 text-orange-500 shrink-0" />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-extrabold uppercase bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {userNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-2.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                        : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {user?.role === "ADMIN" && (
              <Link
                href={`/${locale}/admin/dashboard`}
                className="
                  inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold
                  text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60
                  border border-orange-200/80 dark:border-orange-800/60
                  hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 transition-all duration-200 whitespace-nowrap
                "
              >
                <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Action Tools & User Actions */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200 dark:border-gray-800 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <CartBadge />

            {/* Mounted Check to Prevent Hydration/Auth Mismatch */}
            {mounted && (
              <>
                {!user ? (
                  <Link
                    href={`/${locale}/login`}
                    className="
                      ml-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold text-white
                      bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600
                      shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30
                      active:scale-95 transition-all duration-200 whitespace-nowrap
                    "
                  >
                    {t("login")}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 ml-1">
                    <Link
                      href={`/${locale}/profile`}
                      className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Profile"
                    >
                      <UserIcon className="h-5 w-5 text-orange-500" />
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      title="Logout"
                      className="
                        p-2 rounded-xl text-gray-500 dark:text-gray-400
                        hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50
                        active:scale-95 transition-all duration-200
                      "
                      aria-label="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>

        {/* Mobile View Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartBadge />
          {mounted && user && (
            <Link
              href={`/${locale}/profile`}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Profile"
            >
              <UserIcon className="h-5 w-5 text-orange-500" />
            </Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
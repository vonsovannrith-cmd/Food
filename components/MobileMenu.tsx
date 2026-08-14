"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Home,
  UtensilsCrossed,
  Sparkles,
  Info,
  ShoppingBag,
  Heart,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Search,
} from "lucide-react";

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
}

export default function MobileMenu() {
  const t = useTranslations("MobileMenu");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user session:", error);
      }
    }
  }, [open]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setOpen(false);
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: t("home", { default: "Home" }), href: "/", icon: Home },
    { name: t("menu", { default: "Menu" }), href: "/menu", icon: UtensilsCrossed },
    { name: t("offers", { default: "Offers" }), href: "/offers", icon: Sparkles, badge: t("newBadge", { default: "New" }) },
    { name: t("about", { default: "About Us" }), href: "/about", icon: Info },
    ...(user
      ? [
          { name: t("orders", { default: "My Orders" }), href: "/orders", icon: ShoppingBag },
          { name: t("favorites", { default: "Favorites" }), href: "/favorites", icon: Heart },
          { name: t("profile", { default: "Profile" }), href: "/profile", icon: UserIcon },
        ]
      : []),
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          p-2 rounded-xl text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          active:scale-95 transition-all duration-200 md:hidden
        "
        aria-label="Toggle Mobile Menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop & Drawer Container */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Sliding Drawer */}
          <div
            className="
              fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-white dark:bg-gray-900
              shadow-2xl flex flex-col justify-between p-6 overflow-y-auto
              animate-in slide-in-from-right duration-300
            "
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="font-extrabold text-lg text-gray-900 dark:text-white font-sans">
                  {t("navigation", { default: "Navigation" })}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("searchPlaceholder", { default: "Search dishes..." })}
                    className="
                      w-full py-2.5 pl-10 pr-4 text-sm font-medium
                      bg-gray-100 dark:bg-gray-800 rounded-xl
                      text-gray-900 dark:text-white placeholder:text-gray-400
                      outline-none border border-transparent focus:border-orange-500
                    "
                  />
                </div>
              </form>

              {/* Admin Dashboard Option */}
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center gap-3 px-4 py-3 mb-3 rounded-2xl text-sm font-bold
                    text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60
                    border border-orange-200/80 dark:border-orange-800/60
                  "
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>{t("adminDashboard", { default: "Admin Dashboard" })}</span>
                </Link>
              )}

              {/* Navigation Links List */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold
                        transition-all duration-200
                        ${
                          isActive
                            ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${isActive ? "text-orange-500" : "text-gray-400"}`} />
                        <span>{link.name}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[10px] font-extrabold uppercase bg-orange-500 text-white px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Auth CTA */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              {!user ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center justify-center w-full py-3 px-4 rounded-2xl text-sm font-bold text-white
                    bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20
                    active:scale-95 transition-all duration-200
                  "
                >
                  {t("loginSignup", { default: "Log In / Sign Up" })}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="
                    flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl text-sm font-bold
                    text-rose-600 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50
                    transition-all duration-200
                  "
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("logout", { default: "Log Out" })}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
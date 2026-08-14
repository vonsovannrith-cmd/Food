"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Shield, LogOut, Package, Heart, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const t = useTranslations("ProfilePage");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("user");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-between font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
        <Navbar />
        <div className="text-center py-32 flex justify-center items-center">
          <Loader2 className="animate-spin text-orange-500" size={36} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-between font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-12">
          
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/70 dark:border-gray-800 p-8 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-8">
            
            {/* User Header Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="flex h-24 w-24 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex-shrink-0 items-center justify-center text-4xl font-black shadow-lg shadow-orange-500/25">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={40} />}
              </div>
              <div className="space-y-1.5 flex-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {user?.name || t("defaultName", { default: "User Profile" })}
                </h1>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                  <Mail size={16} className="text-orange-500" /> 
                  <span>{user?.email || t("noEmail", { default: "No email available" })}</span>
                </p>
              </div>
            </div>

            {/* Role & Quick Navigation Links */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-4">
              
              {/* Role Box */}
              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-2.5">
                  <Shield size={18} className="text-orange-500" /> {t("accountRole", { default: "Account Role" })}
                </span>
                <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 shadow-sm">
                  {user?.role || "Customer"}
                </span>
              </div>

              {/* My Orders Link */}
              <Link
                href="/orders"
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-2.5">
                  <Package size={18} className="text-orange-500" /> {t("myOrders", { default: "My Orders" })}
                </span>
                <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
              </Link>

              {/* Favorites Link */}
              <Link
                href="/favorites"
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-2.5">
                  <Heart size={18} className="text-rose-500" /> {t("myFavorites", { default: "My Favorites" })}
                </span>
                <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 group-hover:text-rose-500 transition-all" />
              </Link>

            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/50 px-8 py-4 text-sm font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <LogOut size={18} />
                <span>{t("logoutBtn", { default: "Log Out" })}</span>
              </button>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
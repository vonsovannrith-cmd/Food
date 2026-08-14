"use client";

import { Bell, Menu, UserCircle, ChevronDown, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  setOpen?: (value: boolean) => void;
}

export default function AdminHeader({ setOpen }: Props) {
  const t = useTranslations("AdminHeader");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "km";

  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // មុខងារសម្រាប់ Logout
  const handleLogout = () => {
    // លុបទិន្នន័យ user ពី localStorage
    localStorage.removeItem("user");
    
    // បញ្ជូនទៅកាន់ទំព័រ login តាម locale នីមួយៗ
    router.push(`/${locale}/login`);
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 px-6 backdrop-blur-xl transition-colors font-sans">
      
      {/* Left: Mobile Menu & Dashboard Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen?.(true)}
          aria-label={t("openSidebar", { default: "Open Sidebar Menu" })}
          className="flex h-11 w-11 lg:hidden items-center justify-center rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-500 active:scale-95 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block">
            {t("managementPortal", { default: "Management Portal" })}
          </span>
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white">
            {t("dashboardTitle", { default: "Admin Dashboard ⚡" })}
          </h2>
        </div>
      </div>

      {/* Right Side: Notifications & Profile Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notification Button */}
        <button
          type="button"
          aria-label={t("notifications", { default: "View Notifications" })}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-sm transition-all hover:border-orange-500 hover:text-orange-500 active:scale-95 cursor-pointer"
        >
          <Bell size={20} />
          {/* Unread notification ping */}
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
        </button>

        {/* Profile Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            aria-expanded={showProfile}
            aria-label={t("profileMenu", { default: "User Profile Menu" })}
            className="flex items-center gap-3 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-1.5 sm:pr-4 shadow-sm transition-all hover:border-orange-500 active:scale-95 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-black">
              <UserCircle size={24} />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                {t("adminName", { default: "Admin User" })}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                admin@mhobkhmer.com
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`hidden md:block text-gray-400 transition-transform duration-300 ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Animated Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-xl shadow-gray-200/50 dark:shadow-none animate-in fade-in zoom-in duration-200">
              
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 md:hidden mb-1">
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("adminName", { default: "Admin User" })}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">admin@mhobkhmer.com</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  router.push(`/${locale}/admin/settings`); // ឬទំព័រ Profile របស់អ្នក
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 cursor-pointer"
              >
                <User size={16} />
                <span>{t("profileSettings", { default: "Profile Settings" })}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout} // 🔴 ភ្ជាប់មុខងារ Logout នៅទីនេះ
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
              >
                <LogOut size={16} />
                <span>{t("logout", { default: "Log Out" })}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
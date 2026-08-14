"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  MapPin, 
  Calendar, 
  Save, 
  Loader2, 
  UserCheck 
} from "lucide-react";
import { useTranslations } from "next-intl";

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  createdAt: string;
}

export default function AdminProfilePage() {
  const t = useTranslations("AdminProfilePage");

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setFetching(true);
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  async function saveProfile() {
    if (!profile) return;

    try {
      setLoading(true);
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
        }),
      });

      if (res.ok) {
        alert(t("successUpdate", { default: "Profile updated successfully." }));
      } else {
        alert(t("errorUpdate", { default: "Failed to update profile." }));
      }
    } catch (error) {
      console.error(error);
      alert(t("errorGeneric", { default: "Something went wrong." }));
    } finally {
      setLoading(false);
    }
  }

  if (fetching || !profile) {
    return (
      <div className="flex h-96 w-full items-center justify-center gap-3 text-orange-500 font-black">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-lg">{t("loadingProfile", { default: "Loading Profile..." })}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header section */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
          {t("badge", { default: "Account Security & Preferences" })}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <UserCheck className="text-orange-500" size={32} />
          <span>{t("title", { default: "Administrator Profile 👤" })}</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          {t("subtitle", { default: "Manage your personal credentials, contact points, and dashboard authority settings." })}
        </p>
      </div>

      {/* Main Container Card */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-8">
        
        {/* Avatar & Title Header inside card */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl shadow-orange-500/10 mb-4">
            <Image
              src="/images/avatar.png"
              alt="Admin Avatar"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {profile.name || t("defaultAdminName", { default: "Administrator" })}
          </h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-xl text-xs font-black uppercase tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/40">
            <Shield size={12} />
            <span>{profile.role}</span>
          </span>
        </div>

        {/* Form Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <User size={14} className="text-orange-500" />
              <span>{t("labelFullName", { default: "Full Name" })}</span>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>

          {/* Email (Disabled) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Mail size={14} className="text-orange-500" />
              <span>{t("labelEmail", { default: "Email Address (Locked)" })}</span>
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-2xl border border-gray-200/50 dark:border-gray-800/65 bg-gray-100/60 dark:bg-gray-800/30 px-4 py-3.5 text-sm font-black text-gray-500 dark:text-gray-400 cursor-not-allowed select-none"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Phone size={14} className="text-orange-500" />
              <span>{t("labelPhone", { default: "Phone Number" })}</span>
            </label>
            <input
              type="text"
              value={profile.phone ?? ""}
              placeholder="e.g. +1 (555) 019-2834"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>

          {/* Role (Disabled) */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Shield size={14} className="text-orange-500" />
              <span>{t("labelRole", { default: "System Role" })}</span>
            </label>
            <input
              value={profile.role}
              disabled
              className="w-full rounded-2xl border border-gray-200/50 dark:border-gray-800/65 bg-gray-100/60 dark:bg-gray-800/30 px-4 py-3.5 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-not-allowed select-none"
            />
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <MapPin size={14} className="text-orange-500" />
              <span>{t("labelAddress", { default: "Physical Address" })}</span>
            </label>
            <textarea
              rows={3}
              value={profile.address ?? ""}
              placeholder={t("placeholderAddress", { default: "Enter your street address..." })}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 p-4 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 resize-none"
            />
          </div>

          {/* Member Since */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Calendar size={14} className="text-orange-500" />
              <span>{t("labelMemberSince", { default: "Member Since" })}</span>
            </label>
            <input
              disabled
              value={new Date(profile.createdAt).toLocaleDateString()}
              className="w-full rounded-2xl border border-gray-200/50 dark:border-gray-800/65 bg-gray-100/60 dark:bg-gray-800/30 px-4 py-3.5 text-sm font-black text-gray-500 dark:text-gray-400 cursor-not-allowed select-none"
            />
          </div>

        </div>

        {/* Action Button Footer */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            onClick={saveProfile}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:opacity-95 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>{t("savingProfile", { default: "Saving Profile..." })}</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{t("saveChanges", { default: "Save Changes" })}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
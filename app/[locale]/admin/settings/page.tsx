"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  Coins, 
  Upload, 
  Save, 
  Loader2, 
  Sliders, 
  Globe
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Setting {
  restaurant: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  facebook: string;
  telegram: string;
}

const defaultSetting: Setting = {
  restaurant: "",
  logo: "",
  phone: "",
  email: "",
  address: "",
  currency: "USD",
  facebook: "",
  telegram: "",
};

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  const [setting, setSetting] = useState<Setting>(defaultSetting);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadSetting();
  }, []);

  async function loadSetting() {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();

      if (data) {
        setSetting({
          ...defaultSetting,
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setSetting({
      ...setting,
      [e.target.name]: e.target.value,
    });
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(t("alertImageOnly", { default: "Please select an image file" }));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSetting({
          ...setting,
          logo: data.url,
        });
      } else {
        alert(t("alertUploadFailed", { default: "Upload failed" }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  async function saveSetting() {
    if (!setting.restaurant) {
      alert(t("alertNameRequired", { default: "Restaurant name required" }));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setting),
      });

      if (res.ok) {
        alert(t("alertUpdateSuccess", { default: "Settings updated successfully" }));
      } else {
        alert(t("alertUpdateFailed", { default: "Update failed" }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center gap-3 text-orange-500 font-black">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-lg">{t("loadingSettings", { default: "Loading settings..." })}</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header section */}
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
          {t("badge", { default: "System Configuration" })}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <Sliders className="text-orange-500" size={32} />
          <span>{t("title", { default: "Restaurant Settings ⚙️" })}</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          {t("subtitle", { default: "Manage your general restaurant identity, communication links, branding, and billing currencies." })}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors space-y-8">
        
        {/* Two Column Form Inputs */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Restaurant Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Store size={14} className="text-orange-500" />
                <span>{t("labelRestaurantName", { default: "Restaurant Name" })}</span>
              </label>
              <input
                name="restaurant"
                value={setting.restaurant}
                onChange={handleChange}
                placeholder={t("placeholderRestaurantName", { default: "e.g. Mhob Khmer" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Phone size={14} className="text-orange-500" />
                <span>{t("labelPhone", { default: "Phone Number" })}</span>
              </label>
              <input
                name="phone"
                value={setting.phone}
                onChange={handleChange}
                placeholder={t("placeholderPhone", { default: "e.g. +855 12 345 678" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Mail size={14} className="text-orange-500" />
                <span>{t("labelEmail", { default: "Email Address" })}</span>
              </label>
              <input
                type="email"
                name="email"
                value={setting.email}
                onChange={handleChange}
                placeholder={t("placeholderEmail", { default: "contact@restaurant.com" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Coins size={14} className="text-orange-500" />
                <span>{t("labelCurrency", { default: "Default Currency" })}</span>
              </label>
              <select
                name="currency"
                value={setting.currency}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 cursor-pointer"
              >
                <option value="USD">{t("currencyUsd", { default: "USD ($)" })}</option>
                <option value="KHR">{t("currencyKhr", { default: "KHR (៛)" })}</option>
              </select>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Upload Logo */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Upload size={14} className="text-orange-500" />
                <span>{t("labelLogo", { default: "Restaurant Logo" })}</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={uploadLogo}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/65 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer text-xs font-black text-gray-500 dark:text-gray-400 p-2 outline-none transition-all cursor-pointer"
              />

              {uploading && (
                <p className="text-orange-500 text-xs font-black flex items-center gap-2 mt-2">
                  <Loader2 className="animate-spin" size={14} />
                  <span>{t("uploadingLogo", { default: "Uploading logo asset..." })}</span>
                </p>
              )}

              {setting.logo && (
                <div className="relative mt-4 h-36 w-36 rounded-2xl overflow-hidden border border-gray-200/70 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-2 shadow-sm">
                  <Image
                    src={setting.logo}
                    alt="Logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" />
                <span>{t("labelAddress", { default: "Physical Address" })}</span>
              </label>
              <textarea
                name="address"
                value={setting.address}
                onChange={handleChange}
                rows={3}
                placeholder={t("placeholderAddress", { default: "Enter street address, city, region..." })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 p-4 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 resize-none"
              />
            </div>

          </div>

        </div>

        {/* SOCIAL MEDIA / EXTRAS GRID */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
          <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-4">
            <Globe size={14} className="text-orange-500" />
            <span>{t("labelSocialChannels", { default: "Social & Communication Channels" })}</span>
          </label>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <input
                name="facebook"
                value={setting.facebook}
                onChange={handleChange}
                placeholder={t("placeholderFacebook", { default: "Facebook Page URL or Username" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>

            <div className="space-y-2">
              <input
                name="telegram"
                value={setting.telegram}
                onChange={handleChange}
                placeholder={t("placeholderTelegram", { default: "Telegram Contact or Channel Link" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-black text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900"
              />
            </div>

          </div>
        </div>

        {/* SAVE BUTTON FOOTER */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            onClick={saveSetting}
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:opacity-95 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>{t("savingSettings", { default: "Saving Settings..." })}</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>{t("saveConfiguration", { default: "Save Configuration" })}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
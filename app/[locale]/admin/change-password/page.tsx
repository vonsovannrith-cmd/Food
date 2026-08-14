"use client";

import { useState } from "react";
import { Lock, KeyRound, CheckCircle2, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChangePasswordPage() {
  const t = useTranslations("ChangePasswordPage");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(t("alertPasswordMismatch", { default: "New password and confirm password do not match" }));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || t("alertUpdateFailed", { default: "Failed to update password" }));
        return;
      }

      alert(t("alertSuccess", { default: "Password changed successfully" }));

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert(t("alertError", { default: "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header Label */}
      <div className="mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
          {t("securitySettings", { default: "Security Settings" })}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <ShieldCheck className="text-orange-500" size={32} />
          <span>{t("title", { default: "Change Password 🔒" })}</span>
        </h1>
      </div>

      {/* Main Card Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        
        <form onSubmit={changePassword} className="space-y-6">
          
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              {t("currentPasswordLabel", { default: "Current Password" })} <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <KeyRound size={18} />
              </span>
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t("currentPasswordPlaceholder", { default: "Enter current password" })}
                required
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-12 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                aria-label="Toggle current password visibility"
                className="absolute right-4 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              {t("newPasswordLabel", { default: "New Password" })} <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("newPasswordPlaceholder", { default: "Enter new secure password" })}
                required
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-12 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                aria-label="Toggle new password visibility"
                className="absolute right-4 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              {t("confirmPasswordLabel", { default: "Confirm New Password" })} <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirmPasswordPlaceholder", { default: "Re-enter new password" })}
                required
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-12 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label="Toggle confirm password visibility"
                className="absolute right-4 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t("updatingText", { default: "Updating Password..." })}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>{t("submitBtn", { default: "Change Password" })}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
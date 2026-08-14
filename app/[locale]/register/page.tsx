"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, MapPin, Loader2, UserPlus, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("RegisterPage");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert(t("alertFields", { default: "Please fill in the required fields (Name, Email, and Password)" }));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(t("alertSuccess", { default: "Account created successfully! Please log in to your account." }));
        router.push("/login");
      } else {
        alert(data.message || t("alertFailed", { default: "Registration failed." }));
      }
    } catch (error) {
      console.error("Register error:", error);
      alert(t("alertError", { default: "An error occurred while connecting to the server." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Back to Home Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 px-4 sm:px-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span>{t("backToHome", { default: "Back to Home" })}</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4 sm:px-0">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          {t("title", { default: "Create New Account 🚀" })}
        </h2>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2">
          {t("subtitle", { default: "Sign up to order delicious food from Mhob Khmer" })}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-8 px-6 shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-200/70 dark:border-gray-800 rounded-3xl sm:px-10">
          
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <User size={14} className="text-orange-500" />
                <span>{t("fullName", { default: "Full Name" })} <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chan Sophea"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Mail size={14} className="text-orange-500" />
                <span>{t("email", { default: "Email" })} <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Lock size={14} className="text-orange-500" />
                <span>{t("password", { default: "Password" })} <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Phone size={14} className="text-orange-500" />
                <span>{t("phone", { default: "Phone Number" })}</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="012 345 678"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            {/* Delivery Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" />
                <span>{t("address", { default: "Delivery Address" })}</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Phnom Penh"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>{t("loadingText", { default: "Creating Account..." })}</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>{t("submitBtn", { default: "Register" })}</span>
                </>
              )}
            </button>

          </form>

          {/* Login Link Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {t("hasAccount", { default: "Already have an account?" })}{" "}
              <Link
                href="/login"
                className="font-black text-orange-600 dark:text-orange-400 hover:underline"
              >
                {t("loginLink", { default: "Log In" })}
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
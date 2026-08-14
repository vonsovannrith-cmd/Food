"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, LogIn, ArrowLeft, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LoginPage");

  // ទាញយក locale បច្ចុប្បន្នពី URL (ឧទាហរណ៍៖ "km" ឬ "en")
  const currentLocale = pathname.split("/")[1] || "km";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("validationError", { default: "Please enter your email and password." }));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || t("invalidError", { default: "Invalid email or password." }));
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "ADMIN") {
        router.replace(`/${currentLocale}/admin/dashboard`);
      } else {
        router.replace(`/${currentLocale}`);
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      setError(t("systemError", { default: "Something went wrong. Please try again." }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Back to Home Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 px-4 sm:px-0">
        <Link
          href={`/${currentLocale}`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span>{t("backToHome", { default: "Back to Home" })}</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/40 border border-orange-200/70 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-2xl mb-3 shadow-sm">
          <Sparkles size={14} />
          <span>{t("portalBadge", { default: "Mhob Khmer Portal" })}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          {t("welcomeTitle", { default: "Welcome Back! 👋" })}
        </h2>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2">
          {t("welcomeSub", { default: "Log in to manage your orders or account dashboard" })}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-8 px-6 shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-200/70 dark:border-gray-800 rounded-3xl sm:px-10">
          
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Mail size={14} className="text-orange-500" />
                <span>{t("emailLabel", { default: "Email Address" })} <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Lock size={14} className="text-orange-500" />
                <span>{t("passwordLabel", { default: "Password" })} <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold text-center shadow-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>{t("loggingIn", { default: "Logging in..." })}</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>{t("logInBtn", { default: "Log In" })}</span>
                </>
              )}
            </button>

          </form>

          {/* Register Redirect Link */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {t("noAccount", { default: "Don't have an account?" })}{" "}
              <Link
                href={`/${currentLocale}/register`}
                className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                {t("registerLink", { default: "Register" })}
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
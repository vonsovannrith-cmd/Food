"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserCheck, User, Phone, MapPin, Shield, Activity, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EditCustomerPage() {
  const t = useTranslations("EditCustomerPage");
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    role: "CUSTOMER",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (id) {
      loadCustomer();
    }
  }, [id]);

  async function loadCustomer() {
    try {
      setFetching(true);
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        role: data.role || "CUSTOMER",
        status: data.status || "ACTIVE",
      });
    } catch (error) {
      console.error(error);
      alert(t("alertLoadError", { default: "Failed to load customer details." }));
    } finally {
      setFetching(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function updateCustomer(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(t("alertNameRequired", { default: "Customer name is required" }));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(t("alertUpdateSuccess", { default: "Customer updated successfully" }));
        router.push(`/admin/customers/${id}`);
      } else {
        alert(t("alertUpdateFailed", { default: "Update failed" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertUpdateError", { default: "An error occurred while updating." }));
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex items-center gap-3 text-orange-500 font-black">
          <Loader2 className="animate-spin" size={24} />
          <span>{t("loadingText", { default: "Loading customer profile..." })}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header and Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("userManagement", { default: "User Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <UserCheck className="text-orange-500" size={32} />
            <span>{t("title", { default: "Edit Customer Profile" })}</span>
          </h1>
        </div>

        <Link
          href={`/admin/customers/${id}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t("backBtn", { default: "Back to Profile" })}</span>
        </Link>
      </div>

      {/* Main Container Form */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        
        <form onSubmit={updateCustomer} className="space-y-6">
          
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
              {t("nameLabel", { default: "Customer Name *" })}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-orange-500">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("namePlaceholder", { default: "Enter customer name" })}
                required
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
              {t("phoneLabel", { default: "Phone Number" })}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-orange-500">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("phonePlaceholder", { default: "+855 12 345 678" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
              {t("addressLabel", { default: "Delivery Address" })}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-orange-500">
                <MapPin size={18} />
              </span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder={t("addressPlaceholder", { default: "Street, City, Country" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Grid Row for Role and Status Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
                {t("roleLabel", { default: "User Role" })}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-500 pointer-events-none">
                  <Shield size={18} />
                </span>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 cursor-pointer appearance-none shadow-sm"
                >
                  <option value="CUSTOMER" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("roleCustomer", { default: "CUSTOMER" })}</option>
                  <option value="ADMIN" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("roleAdmin", { default: "ADMIN" })}</option>
                </select>
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
                {t("statusLabel", { default: "Account Status" })}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-500 pointer-events-none">
                  <Activity size={18} />
                </span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 cursor-pointer appearance-none shadow-sm"
                >
                  <option value="ACTIVE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("statusActive", { default: "ACTIVE" })}</option>
                  <option value="BLOCKED" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("statusBlocked", { default: "BLOCKED" })}</option>
                </select>
              </div>
            </div>

          </div>

          {/* Submit Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t("savingText", { default: "Saving Profile..." })}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>{t("saveBtn", { default: "Save Customer Profile" })}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
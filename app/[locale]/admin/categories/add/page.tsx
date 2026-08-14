"use client"; // Marks this component to execute on the client-side (Browser)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, Image as ImageIcon, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AddCategoryPage() {
  const router = useRouter();
  const t = useTranslations("AddCategoryPage"); // Initializes translation hook for category creation

  const [loading, setLoading] = useState(false); // Manages loading spinner state during async requests
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  // Handles input value changes and updates the form state dynamically
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Handles form submission to send category data to the backend API
  async function saveCategory(e: React.FormEvent) {
    e.preventDefault();

    // Validates that the category name is not empty
    if (!form.name.trim()) {
      alert(t("alertNameRequired", { default: "Category name is required" }));
      return;
    }

    try {
      setLoading(true); // Enables loading state to show spinner

      // Sends a POST request to the categories API endpoint
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(t("alertSuccess", { default: "Category created successfully" }));
        router.push("/admin/categories"); // Redirects back to the category listing page upon success
      } else {
        alert(t("alertFailed", { default: "Create failed" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertError", { default: "An error occurred while saving." }));
    } finally {
      setLoading(false); // Resets loading state
    }
  }

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header Navigation & Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("catalogManagement", { default: "Catalog Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <FolderPlus className="text-orange-500" size={32} />
            <span>{t("title", { default: "Add New Category" })}</span>
          </h1>
        </div>

        {/* Back button linking to the category management list */}
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 w-fit"
        >
          <ArrowLeft size={16} />
          <span>{t("backToCategories", { default: "Back to Categories" })}</span>
        </Link>
      </div>

      {/* Main Form Container Card */}
      <div className="max-w-2xl rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none">
        <form onSubmit={saveCategory} className="space-y-6">
          
          {/* Category Name Input Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              {t("categoryNameLabel", { default: "Category Name" })} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("categoryNamePlaceholder", { default: "e.g. Traditional Khmer Food" })}
              required
              className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
            />
          </div>

          {/* Category Image URL Input Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              {t("categoryImageLabel", { default: "Category Image URL" })}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <ImageIcon size={18} />
              </span>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Live Image Preview Section (displays if an image URL is provided) */}
          {form.image && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t("livePreview", { default: "Live Image Preview" })}
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-3 w-fit shadow-sm">
                <img
                  src={form.image}
                  alt="Category visual preview"
                  onError={(e) => {
                    // Hides the image element if the provided URL fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="h-36 w-36 rounded-xl object-cover shadow-sm"
                />
              </div>
            </div>
          )}

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
                  <span>{t("savingText", { default: "Saving Category..." })}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>{t("saveBtn", { default: "Save Category" })}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
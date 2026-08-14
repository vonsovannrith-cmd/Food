"use client"; // Marks this component to execute on the client-side (Browser)

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { FolderEdit, Image as ImageIcon, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function EditCategoryPage({ params }: PageProps) {
  // Unwrap Next.js 15+ asynchronous dynamic route parameters using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const locale = resolvedParams?.locale || "en";
  
  const router = useRouter();
  const t = useTranslations("EditCategoryPage"); // Initializes translation hook for category editing

  const [loading, setLoading] = useState(false);       // Tracks submission loading state
  const [fetching, setFetching] = useState(true);     // Tracks initial data fetching state
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  // Automatically fetch existing category details when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  // Fetches category data from the API endpoint based on the given ID
  async function loadCategory() {
    try {
      setFetching(true);
      const res = await fetch(`/api/categories/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      // Populates the form state with fetched database values
      setForm({
        name: data.name || "",
        image: data.image || "",
      });
    } catch (error) {
      console.error(error);
      alert(t("alertLoadError", { default: "Failed to load category details." }));
    } finally {
      setFetching(false);
    }
  }

  // Handles input value changes and updates the form state dynamically
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Handles form submission to update category data via a PUT request
  async function updateCategory(e: React.FormEvent) {
    e.preventDefault();

    // Validates that the category name is not empty
    if (!form.name.trim()) {
      alert(t("alertNameRequired", { default: "Category name is required" }));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(t("alertSuccess", { default: "Category updated successfully" }));
        router.push(`/${locale}/admin/categories`); // Redirects back to localized category list
      } else {
        alert(t("alertFailed", { default: "Update failed" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertError", { default: "An error occurred while updating." }));
    } finally {
      setLoading(false);
    }
  }

  // Displays a loading spinner screen while fetching existing category data
  if (fetching) {
    return (
      <div className="flex h-96 w-full items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-orange-500 font-black">
          <Loader2 className="animate-spin" size={24} />
          <span>{t("loadingText", { default: "Loading category data..." })}</span>
        </div>
      </div>
    );
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
            <FolderEdit className="text-orange-500" size={32} />
            <span>{t("title", { default: "Edit Category" })}</span>
          </h1>
        </div>

        {/* Back button linking back to the category management list with locale support */}
        <Link
          href={`/${locale}/admin/categories`}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 w-fit"
        >
          <ArrowLeft size={16} />
          <span>{t("backToCategories", { default: "Back to Categories" })}</span>
        </Link>
      </div>

      {/* Main Form Container Card */}
      <div className="max-w-2xl rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none">
        <form onSubmit={updateCategory} className="space-y-6">
          
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

          {/* Category Image URL / Asset Path Input Field */}
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
                placeholder="/foods/chakhgei.jpg or https://..."
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Live Image Preview Section (displays if an image value is provided) */}
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
                  <span>{t("updatingText", { default: "Updating Category..." })}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>{t("updateBtn", { default: "Update Category" })}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
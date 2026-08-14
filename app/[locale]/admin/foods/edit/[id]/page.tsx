"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Utensils, 
  ArrowLeft, 
  Loader2, 
  Save, 
  FileText, 
  DollarSign, 
  Layers, 
  Package, 
  ImageIcon 
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Category {
  id: number;
  name: string;
}

export default function EditFoodPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("EditFoodPage");
  
  const id = params.id as string;
  const locale = (params.locale as string) || "km"; // ទាញយក locale បច្ចុប្បន្ន

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    categoryId: ""
  });

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  async function loadData() {
    try {
      setFetching(true);
      await Promise.all([loadFood(), loadCategories()]);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  async function loadFood() {
    const res = await fetch(`/api/foods/${id}`);
    const data = await res.json();

    setForm({
      name: data.name || "",
      description: data.description || "",
      price: data.price ? String(data.price) : "",
      image: data.image || "",
      stock: data.stock !== undefined ? String(data.stock) : "",
      categoryId: data.categoryId ? String(data.categoryId) : ""
    });
  }

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function updateFood(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);

      // បម្លែងប្រភេទ dữ liệu ឱ្យត្រូវជាមួយ Prisma Schema (Number) មុននឹងផ្ញើទៅ API
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        categoryId: parseInt(form.categoryId, 10)
      };

      const res = await fetch(`/api/foods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // រក្សាភាសា (Locale) ពេល Redirect ទៅកាន់បញ្ជីមុខម្ហូប Admin
        router.push(`/${locale}/admin/foods`);
      } else {
        alert(t("alertFailedUpdate", { default: "Failed to update food item." }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex h-96 w-full items-center justify-center gap-3 text-orange-500 font-black">
        <Loader2 className="animate-spin" size={28} />
        <span className="text-lg">{t("loadingDetails", { default: "Loading food details..." })}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("menuManagement", { default: "Menu Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <Utensils className="text-orange-500" size={32} />
            <span>{t("pageTitle", { default: "Edit Food Item ✏️" })}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            {t("pageSubtitle", { default: "Update existing meal information, pricing, stock levels, and preview imagery." })}
          </p>
        </div>

        <Link
          href={`/${locale}/admin/foods`}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 shadow-md transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95 w-fit cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t("backToFoods", { default: "Back to Foods" })}</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        <form onSubmit={updateFood} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {t("foodNameLabel", { default: "Food Name" })} <span className="text-orange-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-orange-500">
                <Utensils size={18} />
              </span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={t("foodNamePlaceholder", { default: "e.g. Spicy Chicken Burger" })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {t("descriptionLabel", { default: "Description" })}
            </label>
            <div className="relative">
              <span className="absolute top-4 left-4 text-orange-500">
                <FileText size={18} />
              </span>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder={t("descriptionPlaceholder", { default: "Write a mouth-watering description for this food item..." })}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Image URL & Preview */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {t("imageUrlLabel", { default: "Image URL" })}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-500">
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

            {form.image && (
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shrink-0 shadow-sm">
                  <Image
                    src={form.image}
                    alt="Food preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-500">{t("imagePreviewText", { default: "Image Preview" })}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-sm mt-0.5">{form.image}</p>
                </div>
              </div>
            )}
          </div>

          {/* Price & Stock Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {t("priceLabel", { default: "Price ($)" })} <span className="text-orange-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-500">
                  <DollarSign size={18} />
                </span>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {t("stockLabel", { default: "Stock Quantity" })} <span className="text-orange-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-500">
                  <Package size={18} />
                </span>
                <input
                  type="number"
                  name="stock"
                  required
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
                />
              </div>
            </div>

          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {t("categoryLabel", { default: "Category" })} <span className="text-orange-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-orange-500 pointer-events-none">
                <Layers size={18} />
              </span>
              <select
                name="categoryId"
                required
                value={form.categoryId}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 appearance-none cursor-pointer"
              >
                <option value="" disabled>{t("selectCategory", { default: "Select Category" })}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{t("updatingText", { default: "Updating Food Item..." })}</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>{t("updateButton", { default: "Update Food Item" })}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
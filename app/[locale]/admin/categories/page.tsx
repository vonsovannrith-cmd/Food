"use client"; // Marks this component to execute on the client-side (Browser)

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, FolderTree, Image as ImageIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

// Interface representing the data structure of a Category
interface Category {
  id: number;
  name: string;
  image: string;
  _count?: {
    foods: number; // Count of food items associated with this category
  };
}

export default function CategoriesPage() {
  const t = useTranslations("CategoriesPage"); // Initializes translation hook for category list page

  const [categories, setCategories] = useState<Category[]>([]); // Stores the list of fetched categories
  const [loading, setLoading] = useState(true);                  // Tracks data fetching loading state

  // Automatically fetches categories when the component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  // Asynchronous function to fetch all categories from the backend API
  async function loadCategories() {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  }

  // Handles category deletion after user confirmation
  async function deleteCategory(id: number) {
    if (!confirm(t("confirmDelete", { default: "Are you sure you want to delete this category?" }))) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadCategories(); // Refreshes the category list upon successful deletion
      } else {
        alert(t("alertDeleteFailed", { default: "Failed to delete category" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertDeleteError", { default: "An error occurred during deletion." }));
    }
  }

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header & Add New Category Button Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("catalogManagement", { default: "Catalog Management" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <FolderTree className="text-orange-500" size={32} />
            <span>{t("title", { default: "Categories 📂" })}</span>
          </h1>
        </div>

        {/* Action Link button to navigate to the Add Category page */}
        <Link
          href="/admin/categories/add"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all duration-300 active:scale-95 w-fit cursor-pointer"
        >
          <Plus size={18} />
          <span>{t("addNewBtn", { default: "Add New Category" })}</span>
        </Link>
      </div>

      {/* Main Table Container Card */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-100/50 dark:shadow-none overflow-hidden transition-colors">
        
        {/* Conditional rendering based on loading state or empty category list */}
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center gap-3 text-orange-500 font-black">
            <Loader2 className="animate-spin" size={24} />
            <span>{t("loadingText", { default: "Loading categories..." })}</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 mb-4 shadow-sm">
              <FolderTree size={32} />
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white">
              {t("noCategoriesTitle", { default: "No categories found" })}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {t("noCategoriesSubtitle", { default: "Get started by creating your first food category to organize your menu items." })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-4 px-6">{t("tableImage", { default: "Image" })}</th>
                  <th className="py-4 px-6">{t("tableName", { default: "Category Name" })}</th>
                  <th className="py-4 px-6">{t("tableFoods", { default: "Associated Foods" })}</th>
                  <th className="py-4 px-6 text-right">{t("tableActions", { default: "Actions" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    
                    {/* Category Image Column */}
                    <td className="py-4 px-6">
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-sm">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            onError={(e) => {
                              // Hides image if it fails to load
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Category Name Column */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-900 dark:text-white tracking-tight">
                        {category.name}
                      </span>
                    </td>

                    {/* Associated Foods Count Badge Column */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/40">
                        {t("itemsCount", { count: category._count?.foods || 0, default: `${category._count?.foods || 0} items` })}
                      </span>
                    </td>

                    {/* Actions Column (Edit & Delete Buttons) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Edit Button Link */}
                        <Link
                          href={`/admin/categories/edit/${category.id}`}
                          aria-label={`Edit ${category.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 active:scale-95"
                        >
                          <Edit size={16} />
                        </Link>

                        {/* Delete Button Trigger */}
                        <button
                          type="button"
                          onClick={() => deleteCategory(category.id)}
                          aria-label={`Delete ${category.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 text-rose-600 shadow-sm transition-all hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-95 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
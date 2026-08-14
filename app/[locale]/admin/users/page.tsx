"use client";

import { useEffect, useState } from "react";
import { Users, Search, Trash2, Mail, Shield, User as UserIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function UsersPage() {
  const t = useTranslations("UsersPage");

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(id: number, role: string) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        loadUsers();
      } else {
        alert(t("alertRoleFailed", { default: "Failed to update user role" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertRoleError", { default: "An error occurred while updating role." }));
    }
  }

  async function deleteUser(id: number) {
    if (!confirm(t("confirmDelete", { default: "Are you sure you want to delete this user?" }))) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadUsers();
      } else {
        alert(t("alertDeleteFailed", { default: "Failed to delete user" }));
      }
    } catch (error) {
      console.error(error);
      alert(t("alertDeleteError", { default: "An error occurred during deletion." }));
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 block mb-1">
            {t("accessControl", { default: "Access Control" })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="text-orange-500" size={32} />
            <span>{t("title", { default: "Users Management 👥" })}</span>
          </h1>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none transition-colors">
        
        {/* Search Input Bar */}
        <div className="relative mb-6 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder={t("searchPlaceholder", { default: "Search by username or email..." })}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/60 pl-11 pr-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400"
          />
        </div>

        {/* Users Table / List */}
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center gap-3 text-orange-500 font-black">
            <Loader2 className="animate-spin" size={24} />
            <span>{t("loadingText", { default: "Loading user profiles..." })}</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 mb-4 shadow-sm">
              <Users size={32} />
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white">
              {t("noUsersTitle", { default: "No users found" })}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              {t("noUsersSubtitle", { default: "Try adjusting your search query or check back later for registered profiles." })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-400 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-4 px-6">{t("tableProfile", { default: "User Profile" })}</th>
                  <th className="py-4 px-6">{t("tableEmail", { default: "Email Address" })}</th>
                  <th className="py-4 px-6">{t("tableRole", { default: "Role Assignment" })}</th>
                  <th className="py-4 px-6 text-right">{t("tableActions", { default: "Actions" })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
                  >
                    
                    {/* Username Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 font-black text-white shadow-md shadow-orange-500/20">
                          {user.username?.charAt(0).toUpperCase() || <UserIcon size={16} />}
                        </div>
                        <span className="font-black text-gray-900 dark:text-white tracking-tight">
                          {user.username}
                        </span>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold">
                        <Mail size={14} className="text-orange-500 shrink-0" />
                        <span>{user.email}</span>
                      </div>
                    </td>

                    {/* Role Dropdown Column */}
                    <td className="py-4 px-6">
                      <div className="relative inline-block w-36">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                          <Shield size={14} />
                        </div>
                        <select
                          value={user.role}
                          onChange={(e) => updateRole(user.id, e.target.value)}
                          className={`w-full rounded-xl border px-3.5 py-2 text-xs font-black uppercase tracking-wider outline-none transition-all cursor-pointer appearance-none shadow-sm ${
                            user.role === "ADMIN"
                              ? "border-orange-500/40 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400"
                              : "border-gray-200/70 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <option value="USER" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("roleUser", { default: "USER" })}</option>
                          <option value="ADMIN" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">{t("roleAdmin", { default: "ADMIN" })}</option>
                        </select>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          aria-label={`Delete user ${user.username}`}
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
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
  variant?: "danger" | "outline" | "ghost";
  showIcon?: boolean;
}

export default function LogoutButton({
  className = "",
  variant = "danger",
  showIcon = true,
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const variantStyles = {
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/20",
    outline: "border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-500 hover:text-white",
    ghost: "text-gray-600 hover:text-rose-600 hover:bg-rose-50",
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${variantStyles[variant]} ${className}`}
    >
      {showIcon && <LogOut className="h-4 w-4 stroke-[2.2]" />}
      <span>Logout</span>
    </button>
  );
}
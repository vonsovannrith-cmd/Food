"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/CartStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = useCart((state) => state.totalItems());
  
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  // Ensures the component only renders the dynamic badge count on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all shadow-sm flex items-center justify-center group"
      aria-label="កន្ត្រកទំនិញ"
    >
      <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
      {isMounted && totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white shadow-md ring-2 ring-white dark:ring-slate-950 animate-bounce">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
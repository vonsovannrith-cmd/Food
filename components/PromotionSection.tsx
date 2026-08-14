"use client";

import { useState } from "react";
import { Tag, Truck, Gift, Copy, Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PromotionSection() {
  const t = useTranslations("PromotionSection");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const promotions = [
    {
      id: 1,
      title: t("promo1.title", { default: "20% OFF" }),
      badge: t("promo1.badge", { default: "Popular Deal" }),
      description: t("promo1.description", { default: "Get 20% discount on all Khmer traditional dishes." }),
      code: "KHMER20",
      gradient: "from-rose-500 via-pink-600 to-red-600",
      accent: "bg-white/20",
      icon: Tag,
    },
    {
      id: 2,
      title: t("promo2.title", { default: "Free Delivery" }),
      badge: t("promo2.badge", { default: "Orders $15+" }),
      description: t("promo2.description", { default: "Free fast delivery directly to your door for qualifying orders." }),
      code: "FREEDEL",
      gradient: "from-emerald-500 via-teal-600 to-cyan-600",
      accent: "bg-white/20",
      icon: Truck,
    },
    {
      id: 3,
      title: t("promo3.title", { default: "Buy 2 Get 1" }),
      badge: t("promo3.badge", { default: "Every Friday" }),
      description: t("promo3.description", { default: "Order any 2 main courses and get a free drink or dessert." }),
      code: "B2G1FREE",
      gradient: "from-amber-500 via-orange-500 to-yellow-600",
      accent: "bg-white/20",
      icon: Gift,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full border border-orange-200/60 dark:border-orange-800/50 mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-pulse" /> {t("badge", { default: "Special Offers" })}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("title", { default: "Today's Promotions" })}
          </h2>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {t("subtitle", { default: "Apply these codes at checkout to claim your savings" })}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {promotions.map((promo) => {
          const Icon = promo.icon;
          const isCopied = copiedCode === promo.code;

          return (
            <div
              key={promo.id}
              className={`
                relative overflow-hidden rounded-3xl bg-gradient-to-br ${promo.gradient}
                p-7 text-white shadow-xl shadow-gray-200/50 dark:shadow-none
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                flex flex-col justify-between group border border-white/10
              `}
            >
              {/* Decorative Background Glows */}
              <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/15 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-black/15 blur-2xl pointer-events-none" />

              <div>
                {/* Badge & Icon Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`p-3 rounded-2xl ${promo.accent} backdrop-blur-xl border border-white/20 shadow-inner`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white border border-white/25 shadow-sm">
                    {promo.badge}
                  </span>
                </div>

                {/* Offer Title & Description */}
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 drop-shadow-sm">
                    {promo.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Coupon Code Copy Section */}
              <div className="pt-4 border-t border-white/25 flex items-center justify-between relative z-10 bg-black/10 -mx-7 -mb-7 p-5 backdrop-blur-md">
                <div>
                  <span className="block text-[10px] uppercase font-black text-white/70 tracking-wider">
                    {t("promoCodeLabel", { default: "Promo Code" })}
                  </span>
                  <span className="font-mono font-black text-base tracking-widest text-white drop-shadow">
                    {promo.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(promo.code)}
                  className="
                    inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                    bg-white text-gray-900 text-xs font-black shadow-lg
                    hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer
                  "
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                      <span className="text-emerald-700">{t("copied", { default: "Copied!" })}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-gray-600" />
                      <span>{t("copyCode", { default: "Copy Code" })}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
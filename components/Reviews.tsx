"use client";

import { Star, Quote, MessageSquareQuote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Reviews() {
  const t = useTranslations("Reviews");

  const reviews = [
    {
      id: 1,
      name: t("review1.name", { default: "Sokha" }),
      role: t("review1.role", { default: "Verified Customer" }),
      rating: 5,
      comment: t("review1.comment", { default: "Amazing Khmer food and super fast delivery! Everything was hot and nicely packaged." }),
      date: t("review1.date", { default: "2 days ago" }),
    },
    {
      id: 2,
      name: t("review2.name", { default: "Dara" }),
      role: t("review2.role", { default: "Food Enthusiast" }),
      rating: 5,
      comment: t("review2.comment", { default: "The Fish Amok tastes incredible. Authentic flavor and highly recommended for everyone!" }),
      date: t("review2.date", { default: "1 week ago" }),
    },
    {
      id: 3,
      name: t("review3.name", { default: "Vanna" }),
      role: t("review3.role", { default: "Regular Diner" }),
      rating: 5,
      comment: t("review3.comment", { default: "Great service and a stunning website interface. The ordering process was seamless!" }),
      date: t("review3.date", { default: "2 weeks ago" }),
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/60 px-4 py-1.5 rounded-full border border-orange-200/70 dark:border-orange-800/50 mb-3 shadow-sm">
          <MessageSquareQuote className="h-3.5 w-3.5 text-orange-500" />
          {t("badge", { default: "Testimonials" })}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("title", { default: "What Our Customers Say" })}
        </h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium leading-relaxed">
          {t("subtitle", { default: "Real reviews from food lovers who ordered from our restaurant." })}
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
              relative flex flex-col justify-between
              rounded-3xl bg-white dark:bg-gray-900 
              p-7 border border-gray-100 dark:border-gray-800
              shadow-lg shadow-gray-200/50 dark:shadow-none
              hover:shadow-2xl hover:-translate-y-2
              transition-all duration-300 group
            "
          >
            {/* Background Quote Watermark */}
            <Quote className="absolute top-6 right-6 h-10 w-10 text-gray-100 dark:text-gray-800/60 group-hover:text-orange-100 dark:group-hover:text-orange-950/60 transition-colors pointer-events-none" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed relative z-10 font-medium italic">
                "{review.comment}"
              </p>
            </div>

            {/* Footer / Profile */}
            <div className="mt-8 pt-5 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Avatar Circle */}
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-black flex items-center justify-center shadow-md shadow-orange-500/25 text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-sm">
                    {review.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                    {review.role}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
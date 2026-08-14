"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/banners";
import { useTranslations } from "next-intl";

export default function HeroSlider() {
  const t = useTranslations("HeroSlider");

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-gray-100 dark:border-gray-800 group">
        <Swiper
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          speed={800}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          navigation={{
            prevEl: ".custom-swiper-prev",
            nextEl: ".custom-swiper-next",
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="w-full h-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                {/* Background Banner Image */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />

                {/* Layered Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content Banner Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full px-6 sm:px-12 lg:px-16 max-w-3xl">
                    {/* Offer Tag Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{t("badge")}</span>
                    </div>

                    {/* Headline Title */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4 text-balance drop-shadow-sm">
                      {banner.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-medium leading-relaxed mb-8 max-w-xl text-balance">
                      {banner.subtitle}
                    </p>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href="/menu"
                        className="
                          inline-flex items-center gap-2 px-7 py-3.5 sm:py-4 rounded-2xl
                          bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600
                          text-white font-bold text-base shadow-lg shadow-orange-500/30
                          hover:shadow-xl hover:shadow-orange-500/40 active:scale-95
                          transition-all duration-200 group/btn
                        "
                      >
                        <span>{t("orderNow")}</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>

                      <Link
                        href="/offers"
                        className="
                          inline-flex items-center px-6 py-3.5 sm:py-4 rounded-2xl
                          bg-white/10 hover:bg-white/20 backdrop-blur-md
                          border border-white/25 text-white font-semibold text-base
                          active:scale-95 transition-all duration-200
                        "
                      >
                        {t("exploreOffers")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Slide"
          className="custom-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="custom-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 active:scale-95"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Custom Pagination Indicator Dots */}
        <div className="custom-swiper-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:bg-orange-500 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300" />
      </div>
    </section>
  );
}
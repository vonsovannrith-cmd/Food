"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Send,
  Heart,
} from "lucide-react";
import Logo from "./Logo";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        mt-auto
        border-t
        border-gray-200
        bg-white
        text-gray-700
        transition-colors
        duration-300

        dark:border-gray-800
        dark:bg-gray-950
        dark:text-gray-300
      "
    >
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* =====================================================
            FOOTER GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* =====================================================
              COLUMN 1 — BRAND
          ====================================================== */}

          <div className="space-y-4 lg:col-span-2">

            <Logo showText={true} />

            <p
              className="
                mt-3
                max-w-sm
                text-sm
                leading-relaxed
                text-gray-600

                dark:text-gray-400
              "
            >
              {t("description")}
            </p>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <div className="flex items-center gap-3 pt-2">

              {/* =================================================
                  TELEGRAM
              ================================================== */}

              <a
                href="https://t.me/von_sovannrith"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl

                  bg-gray-100
                  text-gray-500

                  transition-all
                  duration-200

                  hover:bg-orange-500
                  hover:text-white

                  active:scale-95

                  dark:bg-gray-800
                  dark:text-gray-400

                  dark:hover:bg-orange-500
                  dark:hover:text-white
                "
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.7c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.2-15.1c.3-1.4-.5-2-1.6-1.6ZM8.1 13.3l10.9-6.9c.5-.3.9-.1.5.2l-8.8 7.9-.3 3.2-1.6-4.4-2.8-.9c-.6-.2-.6-.6.1-.9Z" />
                </svg>
              </a>

              {/* =================================================
                  FACEBOOK
              ================================================== */}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl

                  bg-gray-100
                  text-gray-500

                  transition-all
                  duration-200

                  hover:bg-orange-500
                  hover:text-white

                  active:scale-95

                  dark:bg-gray-800
                  dark:text-gray-400

                  dark:hover:bg-orange-500
                  dark:hover:text-white
                "
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.955.93-1.955 1.886v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                </svg>
              </a>

              {/* =================================================
                  GITHUB
              ================================================== */}

              <a
                href="https://github.com/vonsovannrith-cmd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl

                  bg-gray-100
                  text-gray-500

                  transition-all
                  duration-200

                  hover:bg-orange-500
                  hover:text-white

                  active:scale-95

                  dark:bg-gray-800
                  dark:text-gray-400

                  dark:hover:bg-orange-500
                  dark:hover:text-white
                "
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              </a>

            </div>
          </div>

          {/* =====================================================
              COLUMN 2 — QUICK LINKS
          ====================================================== */}

          <div>
            <h4
              className="
                mb-4
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-gray-900

                dark:text-white
              "
            >
              {t("quickLinks")}
            </h4>

            <ul className="space-y-2.5 text-sm">

              <li>
                <Link
                  href="/"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("home")}
                </Link>
              </li>

              <li>
                <Link
                  href="/menu"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("fullMenu")}
                </Link>
              </li>

              <li>
                <Link
                  href="/offers"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("specialOffers")}
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("aboutUs")}
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("trackOrder")}
                </Link>
              </li>

            </ul>
          </div>

          {/* =====================================================
              COLUMN 3 — CATEGORIES
          ====================================================== */}

          <div>
            <h4
              className="
                mb-4
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-gray-900

                dark:text-white
              "
            >
              {t("categories")}
            </h4>

            <ul className="space-y-2.5 text-sm">

              <li>
                <Link
                  href="/menu?category=amok"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("catAmok")}
                </Link>
              </li>

              <li>
                <Link
                  href="/menu?category=noodles"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("catNoodles")}
                </Link>
              </li>

              <li>
                <Link
                  href="/menu?category=grilled"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("catGrilled")}
                </Link>
              </li>

              <li>
                <Link
                  href="/menu?category=desserts"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("catDesserts")}
                </Link>
              </li>

              <li>
                <Link
                  href="/menu?category=vegetarian"
                  className="
                    text-gray-600
                    transition-colors
                    hover:text-orange-500

                    dark:text-gray-400
                    dark:hover:text-orange-400
                  "
                >
                  {t("catVegetarian")}
                </Link>
              </li>

            </ul>
          </div>

          {/* =====================================================
              COLUMN 4 — NEWSLETTER + CONTACT
          ====================================================== */}

          <div>
            <h4
              className="
                mb-4
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-gray-900

                dark:text-white
              "
            >
              {t("stayUpdated")}
            </h4>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <div className="relative">

                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    py-2.5
                    pl-3.5
                    pr-11
                    text-xs
                    font-medium
                    text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition

                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-500/20

                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-white
                    dark:placeholder:text-gray-500
                  "
                />

                <button
                  type="submit"
                  aria-label="Submit Newsletter"
                  className="
                    absolute
                    right-1
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange-500
                    p-1.5
                    text-white
                    transition-colors
                    hover:bg-orange-600
                  "
                >
                  <Send className="h-3.5 w-3.5" />
                </button>

              </div>
            </form>

            {/* Contact Information */}

            <div
              className="
                mt-5
                space-y-3
                text-xs
                text-gray-500

                dark:text-gray-400
              "
            >

              <div className="flex items-center gap-2">

                <MapPin
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-orange-500
                  "
                />

                <span>{t("address")}</span>

              </div>

              <div className="flex items-center gap-2">

                <Phone
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-orange-500
                  "
                />

                <span>+855 974979155</span>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ====================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-gray-200
            pt-8
            text-xs
            text-gray-500

            sm:flex-row

            dark:border-gray-800
            dark:text-gray-500
          "
        >

          <p>
            © {currentYear} Mhob Khmer. {t("rights")}
          </p>

          <div className="flex items-center gap-1">

            <span>{t("madeWith")}</span>

            <Heart
              className="
                h-3.5
                w-3.5
                fill-rose-500
                text-rose-500
              "
            />

            <span>{t("forLovers")}</span>

          </div>

        </div>

      </div>
    </footer>
  );
}
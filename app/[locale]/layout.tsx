import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Kantumruy_Pro } from "next/font/google";
import { Metadata } from "next";

import { ThemeProvider } from "@/components/ThemeProvider";

import "@/app/globals.css";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kantumruy",
});

/* =========================================
   បន្ថែម Metadata សម្រាប់ SEO (ដោះស្រាយបញ្ហា High & Medium SEO)
========================================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: "MHOB-KHMER - វេបសាយបញ្ជាទិញម្ហូបអាហារ",
      template: "%s | MHOB-KHMER",
    },
    description: "ស្វែងរកម្ហូបអាហារដ៏ឈ្ងុយឆ្ងាញ់ និងបញ្ជាទិញយ៉ាងងាយស្រួលនៅលើវេបសាយរបស់យើង។",
    generator: "Next.js",
    applicationName: "MHOB-KHMER",
    referrer: "origin-when-cross-origin",
    keywords: ["khmer food", "delivery", "ម្ហូបខ្មែរ", "បញ្ជាទិញម្ហូប"],
    authors: [{ name: "MHOB-KHMER Team" }],
    creator: "MHOB-KHMER",
    publisher: "MHOB-KHMER",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://food-ashy-iota.vercel.app"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "km": "/km",
        "en": "/en",
      },
    },
    openGraph: {
      title: "MHOB-KHMER - វេបសាយបញ្ជាទិញម្ហូបអាហារ",
      description: "ស្វែងរកម្ហូបអាហារដ៏ឈ្ងុយឆ្ងាញ់ និងបញ្ជាទិញយ៉ាងងាយស្រួលនៅលើវេបសាយរបស់យើង។",
      url: `https://food-ashy-iota.vercel.app/${locale}`,
      siteName: "MHOB-KHMER",
      locale: locale === "km" ? "km_KH" : "en_US",
      type: "website",
      images: [
        {
          url: "/mhob-khmer.jpg", // ត្រូវប្រាកដថាអ្នកមានរូបភាពនេះក្នុងថត public
          width: 1200,
          height: 630,
          alt: "MHOB-KHMER Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "MHOB-KHMER - វេបសាយបញ្ជាទិញម្ហូបអាហារ",
      description: "ស្វែងរកម្ហូបអាហារដ៏ឈ្ងុយឆ្ងាញ់ និងបញ្ជាទិញយ៉ាងងាយស្រួល។",
      images: ["/mhob-khmer.jpg"],
    },
    icons: {
      icon: "/logo/logo.png",
      shortcut: "/logo/logo.png",
      apple: "/logo/logo.png",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  /* =========================================
     Validate locale
  ========================================= */

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  /* =========================================
     Load translations
  ========================================= */

  const messages = await getMessages({
    locale,
  });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={kantumruyPro.variable}
    >
      <body
        className="
          min-h-screen
          bg-gray-50
          text-gray-900
          antialiased
          font-sans

          dark:bg-gray-950
          dark:text-gray-100
        "
      >
        <ThemeProvider defaultTheme="system">
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
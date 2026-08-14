import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Kantumruy_Pro } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";

import "@/app/globals.css";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kantumruy",
});

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
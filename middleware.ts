import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // រត់ next-intl middleware មុនគេដើម្បីដោះស្រាយរឿង language/locale
  const response = intlMiddleware(request);

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // ស្រង់យក locale បច្ចុប្បន្នពី URL (ឧទាហរណ៍៖ "km" ឬ "en")
  const currentLocale = pathname.split("/")[1] || "km";

  // ការពារ Admin Routes (ពិនិត្យថាតើមានពាក្យ /admin ក្នុង URL ដែរឬទេ)
  if (pathname.includes("/admin") && !token) {
    // បញ្ជូនទៅកាន់ទំព័រ login ដែលមានភ្ជាប់ locale ស្រាប់ ឧទាហរណ៍៖ /km/login ឬ /en/login
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
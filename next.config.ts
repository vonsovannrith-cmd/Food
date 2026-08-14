import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // បើអ្នកប្រើ Cloudinary តាម Scope គម្រោងរបស់អ្នក
      },
      // អ្នកអាចបន្ថែម domain ផ្សេងទៀតនៅទីនេះបើចាំបាច់
    ],
  },
};

export default withNextIntl(nextConfig);
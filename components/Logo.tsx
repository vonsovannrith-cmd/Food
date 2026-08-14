import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-all duration-200 active:scale-95 ${className}`}
    >
      {/* Clean Transparent Logo Container */}
      <div className="relative h-11 w-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
        <Image
          src="/logo/logo.png"
          alt="Mhob Khmer Logo"
          width={44}
          height={44}
          className="h-full w-full object-contain rounded-full"
          priority
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
          Mhob<span className="text-orange-500">Khmer</span>
        </span>
      )}
    </Link>
  );
}
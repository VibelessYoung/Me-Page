"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flower2 } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Blog", href: "blog" },
  { label: "Music", href: "music" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${
          scrolled
            ? "border-b border-white/10 bg-black/30 backdrop-blur-xl"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className="
            group flex items-center
            transition-transform duration-300
            hover:scale-105
          "
        >
          <div
            className="
              relative flex size-10 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/5
              shadow-[0_0_30px_rgba(255,255,255,0.04)]
              backdrop-blur-md
              transition-all duration-500
              group-hover:border-white/20
              group-hover:bg-white/10
              group-hover:shadow-[0_0_35px_rgba(255,255,255,0.1)]
            "
          >
            <Flower2
              size={21}
              strokeWidth={1.5}
              className="
                text-white/80
                transition-all duration-500
                group-hover:rotate-45
                group-hover:text-white
              "
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="
            flex items-center gap-1
            rounded-full
            border border-white/10
            bg-white/[0.03]
            px-1.5 py-1.5
            backdrop-blur-sm
          "
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                rounded-full
                px-3 py-2
                text-xs font-medium
                text-white/55
                transition-all duration-300
                hover:bg-white/8
                hover:text-white
                sm:px-4
                sm:text-sm
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

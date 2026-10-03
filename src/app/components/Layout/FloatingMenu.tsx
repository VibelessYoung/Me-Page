"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flower2, X } from "lucide-react";

import { navigation } from "./navigation";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <div
            className={`
              flex items-center gap-2
              rounded-full
              border border-white/10
              bg-black/30
              p-2
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
              transition-all duration-500
              ${
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-3 scale-90 opacity-0"
              }
            `}
          >
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  aria-label={item.label}
                  onClick={() => setOpen(false)}
                  className="
                    group relative
                    flex size-10 items-center justify-center
                    rounded-full
                    text-white/45
                    transition-all duration-300
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span
                    className="
                      pointer-events-none
                      absolute bottom-full left-1/2 mb-2
                      -translate-x-1/2
                      rounded-md
                      border border-white/10
                      bg-black/70
                      px-2 py-1
                      text-[10px] text-white/70
                      opacity-0
                      backdrop-blur-md
                      transition-opacity duration-200
                      group-hover:opacity-100
                    "
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="
              group
              flex size-14 items-center justify-center
              rounded-full
              border border-white/10
              bg-black/30
              text-white/70
              shadow-[0_15px_50px_rgba(0,0,0,0.4)]
              backdrop-blur-xl
              transition-all duration-500
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
              active:scale-95
            "
          >
            {open ? (
              <X
                size={20}
                strokeWidth={1.6}
                className="transition-transform duration-500"
              />
            ) : (
              <Flower2
                size={21}
                strokeWidth={1.5}
                className="
                  transition-transform duration-500
                  group-hover:rotate-45
                "
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

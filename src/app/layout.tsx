import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sipc.ink — Quietly making waves.",
  description: "A pixel-faithful glassmorphism dashboard recreation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

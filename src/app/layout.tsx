import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";

import Background from "./components/Dashboard/Background";
import FloatingMenu from "./components/Layout/FloatingMenu";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibelessYoung",
  description: "About Page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vazirmatn.variable}>
      <body>
        <Background />

        <div className="relative z-10">{children}</div>

        <FloatingMenu />
      </body>
    </html>
  );
}

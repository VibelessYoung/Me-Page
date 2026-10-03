import type { Metadata } from "next";

import "./globals.css";

import Background from "./components/Dashboard/Background";
import FloatingMenu from "./components/Layout/FloatingMenu";

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
    <html lang="en">
      <body className="relative min-h-screen">
        <Background />

        <div className="relative z-10">{children}</div>

        <FloatingMenu />
      </body>
    </html>
  );
}

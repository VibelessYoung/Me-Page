import type { Metadata } from "next";

import "./globals.css";

import Header from "./components/Layout/Header";
import Background from "./components/Dashboard/Background";

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

        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

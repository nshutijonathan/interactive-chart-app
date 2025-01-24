"use client";

import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { Provider } from "@components/ui/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Data Visualization",
  description: "Admin Dashboard",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider forcedTheme="light">
          <Navbar />
          <div className="flex">
            <div className="hidden md:block h-[100vh] w-[300px]">
              <Sidebar />
            </div>
            <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salon & Spa Management",
  description: "Manage your salon and spa business efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen flex bg-slate-900 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-slate-900 overflow-auto">
          <div className="p-6 min-h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

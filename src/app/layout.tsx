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

export const metadata: Metadata = {
  title: "Repliq AI - Rebuild the Web from Code & Vision",
  description: "AI-powered website reconstruction engine. Provide a repository and screenshots, and Repliq AI will reconstruct the interface into a live, interactive web page.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full w-full flex flex-col bg-[#050505] text-[#F5F5F5] selection:bg-[#8B5CF6]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

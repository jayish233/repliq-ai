import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontHeading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
      className={`${fontHeading.variable} ${fontBody.variable} ${geistMono.variable} min-h-full w-full antialiased`}
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


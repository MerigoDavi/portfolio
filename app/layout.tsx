import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticCursor from "@/components/effects/MagneticCursor";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Creative Developer | Modern Portfolio",
  description: "Portfolio moderno e interativo com animações fluidas, WebGL e experiências 3D. Especializado em React, Next.js e desenvolvimento web criativo.",
  keywords: ["portfolio", "creative developer", "web design", "react", "next.js", "three.js", "webgl", "gsap", "framer motion", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://yourwebsite.com",
    title: "Creative Developer | Modern Portfolio",
    description: "Portfolio moderno e interativo com animações fluidas e experiências 3D",
    siteName: "Your Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Developer | Modern Portfolio",
    description: "Portfolio moderno e interativo com animações fluidas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Navigation />
          <MagneticCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

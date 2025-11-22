import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
// import MagneticCursor from "@/components/effects/MagneticCursor";
import Navigation from "@/components/Navigation";

// Premium Variable Fonts for Award-Winning Typography
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourportfolio.com'),
  title: {
    default: "Crafting Digital Experiences | Creative Developer",
    template: "%s | Creative Developer Portfolio",
  },
  description: "Award-winning portfolio showcasing cutting-edge web experiences. Specializing in interactive design, WebGL, and performant React applications that push creative boundaries.",
  keywords: [
    "creative developer",
    "frontend engineer",
    "web designer",
    "react developer",
    "next.js",
    "three.js",
    "webgl",
    "gsap animations",
    "framer motion",
    "typescript",
    "ui/ux design",
    "interactive experiences",
    "portfolio",
    "award-winning design"
  ],
  authors: [{ name: "Your Name", url: "https://yourportfolio.com" }],
  creator: "Your Name",
  publisher: "Your Name",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    url: "https://yourportfolio.com",
    title: "Crafting Digital Experiences | Creative Developer",
    description: "Award-winning portfolio showcasing cutting-edge web experiences with WebGL, React, and creative animations.",
    siteName: "Creative Developer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Developer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafting Digital Experiences | Creative Developer",
    description: "Award-winning portfolio with cutting-edge web experiences",
    creator: "@yourhandle",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* <SmoothScroll> */}
          <Navigation />
          {/* <MagneticCursor /> */}
          {children}
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}

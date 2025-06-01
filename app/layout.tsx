import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/header";
import { DataProvider } from "../providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { PUBLISHABLE_KEY } from "@/lib/env";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smal.ly - URL Shortener",
  description: "A modern URL shortener service with analytics",
  icons: {
    icon: ["/images/logo.webp"],
  },
  keywords: ["Url shortner", "url", "shortner", "smally", "bitly", "shortly"],
  authors: [{ name: "Aditya Shenoy K" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smally-by-aditya-shenoy-k.vercel.app",
    title: "Smal.ly - URL Shortener",
    description: "A modern URL shortener service with analytics",
    siteName: "Smal.ly - URL Shortener",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smal.ly - URL Shortener",
    description: "A modern URL shortener service with analytics",
    images: ["/images/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: shadesOfPurple }}
      afterSignOutUrl="/"
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DataProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background"
              >
                Skip to main content
              </a>
              <Header />
              <main id="main-content" tabIndex={-1}>
                {children}
                <Toaster />
              </main>
            </DataProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

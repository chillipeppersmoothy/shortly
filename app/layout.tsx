import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/header";
import { DataProvider } from "../providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { PUBLISHABLE_KEY } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smal.ly - URL Shortener",
  description: "A modern URL shortener service with analytics",
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
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DataProvider>
              <Header />

              <main>{children}</main>
            </DataProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

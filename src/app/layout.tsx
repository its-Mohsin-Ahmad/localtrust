import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
export {};
import { Providers } from "@/components/providers";
import { BrandLoader } from "@/components/brand/brand-loader";
import { BRAND, withBrandPath } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: BRAND.documentTitle,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "service marketplace",
    "Pakistan",
    "local professionals",
    "plumbing",
    "electrical",
    "cleaning",
    "AC repair",
    "carpentry",
    "booking",
  ],
  icons: {
    icon: withBrandPath("/brand/involve-favicon.svg"),
    shortcut: withBrandPath("/brand/involve-favicon.svg"),
    apple: withBrandPath("/brand/involve-favicon.svg"),
  },
  manifest: withBrandPath("/manifest.json"),
  openGraph: {
    siteName: BRAND.name,
    title: BRAND.documentTitle,
    description: BRAND.description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: BRAND.documentTitle,
    description: BRAND.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <BrandLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}

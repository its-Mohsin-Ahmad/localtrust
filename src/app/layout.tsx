import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
export {};
import { Providers } from "@/components/providers";
import { SplashScreen } from "@/components/splash/splash-screen";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "LocalTrust — Find Trusted Professionals Near You",
    template: "%s | LocalTrust",
  },
  description:
    "Connect with reliable local professionals across Pakistan. Discover, compare, and book trusted services with confidence.",
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
  openGraph: {
    siteName: "LocalTrust",
    title: "LocalTrust — Find Trusted Professionals Near You",
    description:
      "Connect with reliable local professionals across Pakistan. Discover, compare, and book trusted services with confidence.",
    type: "website",
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
          <SplashScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}

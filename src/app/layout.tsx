import type { Metadata } from "next";
import "./globals.css";
import { Mulish, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next";

export const metadata: Metadata = {
  title: "Car Dealer",
  description:
    "Your trusted destination for quality vehicles. Browse our extensive selection of new and used cars, trucks, and SUVs with expert guidance from our experienced sales team.",
};

const molish = Mulish({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased overscroll-none  bg-background",
          roboto.variable,
          molish.variable
        )}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <NextTopLoader showSpinner={false} />
        <Toaster />
      </body>
    </html>
  );
}

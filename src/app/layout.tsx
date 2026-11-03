import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import IPhone17Frame from "@/components/IPhone17Frame";
import "./globals.css";
import "./mobile-marketplace.css";
import "./vendor-app.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunday Malls | Vendor Studio",
  description: "Manage your products, orders, inventory and buyer enquiries.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><IPhone17Frame>{children}</IPhone17Frame></body>
    </html>
  );
}

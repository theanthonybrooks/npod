import { AppleDeviceProvider } from "@/contexts/apple-device-context";
import { isAppleUA } from "@/utils/appleFns";
import { cn } from "@/utils/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  title: "No Point of Departure",
  description: "5-14 September 2025 at Hase Studio, Neukölln, Berlin DE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ua = (await headers()).get("user-agent") ?? "";
  const isAppleDevice = isAppleUA(ua);
  console.log(ua);

  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "bg-[#2b51ba] antialiased",
        )}
      >
        <AppleDeviceProvider isAppleDevice={isAppleDevice}>
          {children}
        </AppleDeviceProvider>
      </body>
    </html>
  );
}

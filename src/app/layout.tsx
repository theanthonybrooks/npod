import { AppleDeviceProvider } from "@/contexts/apple-device-context";
import { isAppleUA } from "@/utils/appleFns";
import { cn } from "@/utils/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./css/embla.css";
import "./css/globals.css";

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
  icons: {
    icon: "/images/favicon_3b.png",
    shortcut: "/images/favicon_3b.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ua = (await headers()).get("user-agent") ?? "";
  const result = isAppleUA(ua);
  const { isIOS, isMacSafari, isAppleDevice } = result || {
    isIOS: false,
    isMacSafari: false,
    isAppleDevice: false,
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/pxq0ttg.css"
        ></link>
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "bg-[##cc903a] antialiased",
        )}
      >
        <AppleDeviceProvider
          isAppleDevice={isAppleDevice}
          isIOS={isIOS}
          isMacSafari={isMacSafari}
          uaVal={ua}
        >
          {children}
        </AppleDeviceProvider>
      </body>
    </html>
  );
}

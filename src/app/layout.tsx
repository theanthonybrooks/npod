import { cn } from "@/utils/utils"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "No Point of Departure",
  description: "5-14 September 2025 at Hase Studio, Neukölln, Berlin DE",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          " antialiased relative"
        )}>
        {children}
      </body>
    </html>
  )
}

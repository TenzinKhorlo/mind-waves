import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
import EnokiWrapper from "@/contexts/EnokiWrapper";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindWave - Meditation NFT Platform",
  description: "Transform your meditation practice with blockchain rewards",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <EnokiWrapper>
          {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange> */}
            {children}
          {/* </ThemeProvider> */}
        </EnokiWrapper>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import { TabBarWrapper } from "@/components/TabBarWrapper"
import { Providers } from "./providers"
import "./globals.css"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Favoris — Prototype leboncoin",
  description: "Prototype interactif de gestion des favoris",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={nunitoSans.variable}>
      <body>
        <Providers>
          {children}
          <TabBarWrapper />
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-family",
});

export const metadata: Metadata = {
  title: "Dépôt annonce pro — Motors",
  description: "Prototype dépôt annonce professionnel leboncoin Mobility",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${nunitoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}

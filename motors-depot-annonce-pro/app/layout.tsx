import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dépôt annonce pro — Motors",
  description: "Prototype dépôt annonce professionnel leboncoin Mobility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}

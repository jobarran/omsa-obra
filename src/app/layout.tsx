import type { Metadata } from "next";
import "./globals.css";
import { inter, roboto } from "@/config/fonts";


export const metadata: Metadata = {
  title: "OMSA - gestion de obra",
  description: "Sistema de gestion de obra BETA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>

        {children}

      </body>
    </html>
  );
}

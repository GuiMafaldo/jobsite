"use client";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="pt-br">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>    
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}

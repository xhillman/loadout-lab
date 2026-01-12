import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = localFont({
  src: "../public/fonts/Rajdhani-Variable.woff2",
  variable: "--font-rajdhani"
});

export const metadata: Metadata = {
  title: "Loadout Lab",
  description: "Build your ultimate survival kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased overflow-hidden`}
      >
        <div className="relative z-10 min-h-screen bg-fixed bg-no-repeat bg-cover bg-[linear-gradient(180deg,#08090A_0%,#0D0E0F_30%,#0A0B0C_65%,#050606_100%)]">
          {children}
        </div>
      </body>
    </html>
  );
}

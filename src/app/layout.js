import {
  ClerkProvider
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from './Components/HeaderWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "metaCanvas",
  description: "A Digital Art Marketplace",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en"
        data-arp="">
        <body
          cz-shortcut-listen="true">
          <HeaderWrapper />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

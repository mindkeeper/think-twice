// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s - Think Twice",
    default: "Think Twice",
  },
  description:
    "a social media application designed to foster mindful consumption and empower users to make smarter purchasing decisions. Think Twice aims to reduce impulsive buying by providing a platform for users to share potential purchases, receive feedback from a supportive community, and collectively evaluate spending choices.",
  authors: [{ name: "Devscale", url: "https://devscale.id/" }],
  creator: "Lumiva Team",
  keywords: [
    "think twice",
    "social media",
    "mindful consumption",
    "smart purchasing",
    "community feedback",
    "impulsive buying",
    "spending choices",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

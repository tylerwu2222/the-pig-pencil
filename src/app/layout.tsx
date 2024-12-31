import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";

import { HomeProvider } from "./HomeContextProvider";

import { Open_Sans } from "next/font/google";

import "./globals.css";

const openSans = Open_Sans({
  weight: ['400', '600', '700'], // Adjust based on your needs
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Pig Pencil",
  description: "A pig pen of data visualization, art, and other observations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeProvider>{children}</HomeProvider>

        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.scss'
import Providers from "./providers";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import { APP_URL } from "@/config/url.config";

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description:SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph:{
    type:'website',
    siteName:SITE_NAME,
    emails: ['info@cinemahub.com']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="">
        <Providers>{children}</Providers></body>
    </html>
  );
}

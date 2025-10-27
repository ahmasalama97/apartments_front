
import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import "../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../css/style.css";
import AppProviders from "./providers";
import ClientHeader from "./layoutHeaderClient";
import SiteFooter from "../components/SiteFooter";
import DirectionWrapper from "@/components/DirectionWrapper";

const inter = Titillium_Web({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Real Estate Listings - Find Your Dream Apartment",
    template: ""
  },
  description: "Discover amazing products and shop beyond boundaries with MiniStore. Your trusted e-commerce platform for fashion, electronics, and more.",
  keywords: ["Apartments", "Real Estate", "Property Listings", "Rentals", "Sales", "Housing", "Homes", "Flats", "Condos"],
  authors: [{ name: "Ahmed Salama" }],
  creator: "MiniStore",
  publisher: "MiniStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Real Estate Listings - Find Your Dream Apartment',
    description: '.',
    siteName: 'Real Estate Listings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Listings - Find Your Dream Apartment',
    description: '.',
    creator: '@AhmedSalama',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <DirectionWrapper>
      <body className={inter.className}>
        <AppProviders>
          <ClientHeader />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </DirectionWrapper>
  );
}

export const metadata = {
  title: "Sigla Cargo - Pepsico",
  description:
    "Sistema de Gestão Logística - Plataforma completa para gerenciamento de frotas e logística da Pepsico",
  keywords: [
    "logística",
    "gestão de frotas",
    "transporte",
    "pepsico",
    "sigla cargo",
    "otimização de rotas",
    "gerenciamento de viagens",
  ],
  authors: [{ name: "Sigla Cargo Team" }],
  creator: "Sigla Cargo",
  publisher: "Pepsico",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url:
      process.env.NODE_ENV === "production"
        ? "pepsicobrasil.sigla.app" // Replace with your actual domain
        : "http://localhost:3000",
    siteName: "Sigla Cargo - Pepsico",
    title: "Sigla Cargo - Sistema de Gestão Logística",
    description:
      "Plataforma completa para gerenciamento de frotas e logística da Pepsico. Otimize suas operações de transporte com nossa solução integrada.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sigla Cargo - Sistema de Gestão Logística Pepsico",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Sigla Cargo - Sistema de Gestão Logística",
    description:
      "Plataforma completa para gerenciamento de frotas e logística da Pepsico",
    images: ["/og-image.png"],
    creator: "@pepsico", // Replace with actual Twitter handle if available
  },

  // Additional meta tags
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/pepsico-logo.png",
  },

  // Manifest
  manifest: "/manifest.json",

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  // App specific
  applicationName: "Sigla Cargo",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: "#0066CC",
};

import { Providers } from "@/providers";
import {
  StructuredData,
  organizationStructuredData,
  webApplicationStructuredData,
} from "@/components/StructuredData";

import { Open_Sans } from "next/font/google";
import "./global.css";

const openSans = Open_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-openSans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={webApplicationStructuredData} />
      </head>
      <body className={openSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

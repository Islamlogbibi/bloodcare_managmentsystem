import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { LanguageInitializer } from "@/components/language-initializer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "BloodCare - Blood Transfusion Management System",
    template: "%s | BloodCare",
  },
  description:
    "Professional patient blood transfusion management application for healthcare providers. Manage patient records, schedule transfusions, and track blood transfusion data efficiently.",
  keywords: ["blood transfusion", "healthcare", "patient management", "transfusion", "medical records"],
  authors: [{ name: "BloodCare Team" }],
  creator: "BloodCare",
  publisher: "BloodCare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bloodcare.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bloodcare.app",
    title: "BloodCare - Blood Transfusion Management System",
    description: "Professional patient blood transfusion management application for healthcare providers.",
    siteName: "BloodCare",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloodCare - Blood Transfusion Management System",
    description: "Professional patient blood transfusion management application for healthcare providers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <LanguageInitializer />
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto" role="main" aria-label="Main content">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

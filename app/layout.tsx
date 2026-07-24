import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });
const _ibmPlexSans = IBM_Plex_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Project Nexus — Managed AI Assistant for Business Owners',
  description: 'Project Nexus is a managed AI assistant for local business owners, built and operated by Westside Union. One assistant that knows your business, works through the channels you already use, and helps you stay ahead.',
  keywords: ['AI assistant', 'business assistant', 'managed AI', 'local business', 'WhatsApp business', 'Westside Union', 'Project Nexus'],
  authors: [{ name: 'Westside Union' }],
  openGraph: {
    title: 'Project Nexus — Managed AI Assistant for Business Owners',
    description: 'One assistant that knows your business, works through the channels you already use, and helps you stay ahead without adding another employee or complicated app.',
    type: 'website',
    siteName: 'Project Nexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Nexus — Managed AI Assistant for Business Owners',
    description: 'One assistant that knows your business, works through the channels you already use, and helps you stay ahead.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

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
  title: 'Nexus | A Managed AI Assistant for Your Business',
  description: 'Nexus helps business owners organize follow-ups, reviews, reminders, customer communication, and everyday work through one managed business assistant from Westside Union.',
  keywords: ['AI assistant', 'business assistant', 'managed AI', 'local business', 'WhatsApp business', 'Westside Union', 'Nexus', 'business automation', 'customer follow-up'],
  authors: [{ name: 'Westside Union' }],
  icons: {
    icon: [
      { url: '/nexus-logo-sm.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/nexus-logo.png', sizes: '1024x1024', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Nexus | A Managed AI Assistant for Your Business',
    description: 'Nexus helps business owners organize follow-ups, reviews, reminders, customer communication, and everyday work through one managed business assistant from Westside Union.',
    type: 'website',
    siteName: 'Nexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus | A Managed AI Assistant for Your Business',
    description: 'Nexus helps business owners organize follow-ups, reviews, reminders, customer communication, and everyday work through one managed business assistant from Westside Union.',
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

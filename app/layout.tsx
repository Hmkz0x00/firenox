import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'

// Self-hosted at build time: no third-party font request, no layout shift on swap.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-oswald',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firenoxglobal.com'

const description =
  'FIRENOX Fire Spray is a portable, water-based first-response fire safety spray for homes, vehicles, offices, kitchens, and work sites.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'FIRENOX | Next Generation Fire Safety Spray',
  description,
  keywords: [
    'FIRENOX',
    'fire safety spray',
    'portable fire extinguisher',
    'water based fire spray',
    'first response fire safety',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'FIRENOX',
    title: 'FIRENOX Fire Spray',
    description:
      'Portable first-response fire safety spray for fast action before a small incident becomes a major fire.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRENOX Fire Spray',
    description,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0705',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${oswald.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

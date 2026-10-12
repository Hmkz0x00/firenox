import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://firenox.example'),
  title: 'FIRENOX | Next Generation Fire Safety Spray',
  description:
    'FIRENOX Fire Spray is a portable, water-based first-response fire safety spray for homes, vehicles, offices, kitchens, and work sites.',
  keywords: [
    'FIRENOX',
    'fire safety spray',
    'portable fire extinguisher',
    'water based fire spray',
    'first response fire safety',
  ],
  openGraph: {
    title: 'FIRENOX Fire Spray',
    description:
      'Portable first-response fire safety spray for fast action before a small incident becomes a major fire.',
    images: ['/firenox-action-new.png'],
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
    <html lang="en" className="dark bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

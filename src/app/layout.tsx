import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'NeuroPaths — Support & resources for AuDHD adults in the UK',
  description:
    'NeuroPaths brings together every benefit, service, charity and resource for AuDHD adults in the UK — so you don\'t have to search everywhere.',
  openGraph: {
    title: 'NeuroPaths',
    description: 'Support, services and resources for AuDHD adults in the UK.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}

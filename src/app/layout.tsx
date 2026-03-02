import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import { ScrollToTop } from '@/components/ScrollToTop'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['700'],
  variable: '--font-montserrat',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Plaiss - Unique Designs',
  description: 'Furniture for distinctive spaces',
  icons: {
    icon: '/images/logo3.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}

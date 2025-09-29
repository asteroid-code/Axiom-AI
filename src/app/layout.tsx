import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Axiom AI - 8-Engine Intelligence Platform',
  description: 'Premium content powered by 8 AI engines with ultra-resilient consensus',
  keywords: 'artificial intelligence, AI news, machine learning, prompt engineering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white min-h-screen">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

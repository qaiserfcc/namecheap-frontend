import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Namecheap E-commerce',
  description: 'Modern e-commerce platform with microservices architecture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

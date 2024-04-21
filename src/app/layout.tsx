import './globals.css'
import { roboto } from '@/config/fonts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMSA - Gestion de obra',
  description: 'Sistema de gestion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <body suppressHydrationWarning={true} className={roboto.className}>
        {children}
        </body>
    </html>
  )
}

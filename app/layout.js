import { Inter } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import QueryProvider from '@/lib/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InmoBiera',
  description: 'Las mejores propiedades en venta en Quito y sus valles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
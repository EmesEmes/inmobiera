// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InmoEcuador - Encuentra tu hogar ideal',
  description: 'Las mejores propiedades en venta en Quito y sus valles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
// components/Navbar.js
'use client'
import Link from 'next/link'
import { Home, Building2, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const whatsappNumber = "593999999999" // Cambia por tu número real
  const whatsappMessage = "Hola, estoy interesado en más información sobre sus propiedades"
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src='/logo.svg' className='w-48'/>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
            >
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
            
            <Link 
              href="/propiedades" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
            >
              <Building2 className="h-5 w-5" />
              <span>Propiedades</span>
            </Link>
            <Link
            
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contáctanos</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
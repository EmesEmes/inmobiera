// components/Navbar.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Home, Building2, MessageCircle, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const whatsappNumber = "593999999999" // Cambia por tu número real
  const whatsappMessage = "Hola, estoy interesado en más información sobre sus propiedades"
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <img src='/logo.svg' className='w-40'/>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contáctanos</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Inicio</span>
            </Link>

            <Link
              href="/propiedades"
              onClick={closeMenu}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition"
            >
              <Building2 className="h-5 w-5" />
              <span className="font-medium">Propiedades</span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Contáctanos</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
// app/propiedades/page.js
'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import TodasPropiedades from '@/components/TodasPropiedades'

export default function PropiedadesPage() {
  const searchParams = useSearchParams()

  return (
    <main>
      <Navbar />
      <div className="pt-8">
        <TodasPropiedades searchParams={searchParams} />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 InmoEcuador. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
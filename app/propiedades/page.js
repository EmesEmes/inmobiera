// app/propiedades/page.js
'use client'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import TodasPropiedades from '@/components/TodasPropiedades'
import { Loader2 } from 'lucide-react'

function PropiedadesContent() {
  return (
    <>
      <Navbar />
      <div className="pt-8">
        <TodasPropiedades searchParams={null} />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 InmoEcuador. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default function PropiedadesPage() {
  return (
    <main>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      }>
        <PropiedadesContent />
      </Suspense>
    </main>
  )
}
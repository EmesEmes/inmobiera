// app/page.js
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropiedadesDestacadas from '@/components/PropiedadesDestacadas'
import QuienesSomos from '@/components/QuienesSomos'
import TodasPropiedades from '@/components/TodasPropiedades'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import PropiedadesVendidas from '@/components/PropiedadesVendidas'

function HomeContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PropiedadesDestacadas />
      <QuienesSomos />
      <PropiedadesVendidas /> 
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Inmobiera. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      }>
        <HomeContent />
      </Suspense>
    </main>
  )
}
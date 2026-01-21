// app/page.js
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PropiedadesDestacadas from '@/components/PropiedadesDestacadas'
import QuienesSomos from '@/components/QuienesSomos'
import TodasPropiedades from '@/components/TodasPropiedades'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PropiedadesDestacadas />
      <QuienesSomos />
      {/* <TodasPropiedades searchParams={null} /> */}
      <div className='size-[50%] mx-auto '>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d997.4485719791038!2d-78.4859497!3d-0.1988658!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59bae67b0d60d%3A0xadb7197bac85d10f!2sEsteban%20Donoso%20y%20Asociados!5e0!3m2!1ses!2sec!4v1764379408770!5m2!1ses!2sec" width="100%" height="350"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
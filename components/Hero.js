'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function Hero() {
  const router = useRouter()
  const [sector, setSector] = useState('')
  const [tipoInmueble, setTipoInmueble] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Construir query params
    const params = new URLSearchParams()
    if (sector) params.append('sector', sector)
    if (tipoInmueble) params.append('tipo_inmueble', tipoInmueble)
    
    // Redirigir a la página de propiedades con filtros
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <div className="relative bg-linear-to-r from-primary-900 to-primary-700 text-white">
      <div className="max-w-7xl h-130 mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu hogar ideal en Ecuador
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-primary-100">
            Las mejores propiedades en Quito y sus valles
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select 
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos los sectores</option>
                  <option value="norte">Norte</option>
                  <option value="centro">Centro</option>
                  <option value="sur">Sur</option>
                  <option value="cumbaya">Cumbayá</option>
                  <option value="tumbaco">Tumbaco</option>
                  <option value="los_chillos">Los Chillos</option>
                </select>
              </div>
              
              <div className="flex-1">
                <select 
                  value={tipoInmueble}
                  onChange={(e) => setTipoInmueble(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Tipo de inmueble</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="oficina">Oficina</option>
                  <option value="local">Local Comercial</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Search className="h-5 w-5" />
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  )
}
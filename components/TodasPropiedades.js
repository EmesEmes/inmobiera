// components/TodasPropiedades.js
'use client'
import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { usePropiedades } from '@/lib/queries'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function TodasPropiedades({ searchParams: initialSearchParams }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Obtener filtros iniciales de los query params
  const getInitialFilters = () => {
    const params = initialSearchParams || searchParams
    return {
      sector: params?.get('sector') || '',
      tipo_inmueble: params?.get('tipo_inmueble') || '',
      precioMin: params?.get('precioMin') || '',
      precioMax: params?.get('precioMax') || '',
      areaMin: params?.get('areaMin') || '',
      areaMax: params?.get('areaMax') || ''
    }
  }

  // Obtener página inicial de los query params
  const getInitialPage = () => {
    const params = initialSearchParams || searchParams
    return parseInt(params?.get('page') || '1')
  }

  const [currentPage, setCurrentPage] = useState(getInitialPage)
  
  // Filtros activos (los que están en la URL y se usan para buscar)
  const [activeFilters, setActiveFilters] = useState(getInitialFilters)
  
  // Filtros del formulario (los que el usuario está editando)
  const [filters, setFilters] = useState(getInitialFilters)
  
  const itemsPerPage = 9

  // Usar TanStack Query para obtener propiedades
  const { data, isLoading, error } = usePropiedades(activeFilters, currentPage, itemsPerPage)
  
  const propiedades = data?.propiedades || []
  const totalPages = data?.totalPages || 1

  // Actualizar URL con query params
  const updateURL = useCallback((newFilters, newPage) => {
    const params = new URLSearchParams()
    
    if (newFilters.sector) params.set('sector', newFilters.sector)
    if (newFilters.tipo_inmueble) params.set('tipo_inmueble', newFilters.tipo_inmueble)
    if (newFilters.precioMin) params.set('precioMin', newFilters.precioMin)
    if (newFilters.precioMax) params.set('precioMax', newFilters.precioMax)
    if (newFilters.areaMin) params.set('areaMin', newFilters.areaMin)
    if (newFilters.areaMax) params.set('areaMax', newFilters.areaMax)
    if (newPage > 1) params.set('page', newPage.toString())
    
    const queryString = params.toString()
    const newURL = queryString ? `${pathname}?${queryString}` : pathname
    
    router.push(newURL, { scroll: false })
  }, [pathname, router])

  // Cuando presionan "Buscar"
  const handleSearch = () => {
    setActiveFilters(filters)
    setCurrentPage(1)
    updateURL(filters, 1)
  }

  // Función para resetear filtros
  const handleReset = () => {
    const emptyFilters = {
      sector: '',
      tipo_inmueble: '',
      precioMin: '',
      precioMax: '',
      areaMin: '',
      areaMax: ''
    }
    
    setFilters(emptyFilters)
    setActiveFilters(emptyFilters)
    setCurrentPage(1)
    updateURL(emptyFilters, 1)
  }

  // Cuando cambian de página
  const goToPage = (page) => {
    setCurrentPage(page)
    updateURL(activeFilters, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todas las Propiedades
          </h2>
          <p className="text-gray-600 text-lg">
            Explora nuestro catálogo completo de inmuebles
          </p>
        </div>

        {/* Filtros */}
        <PropertyFilters 
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Propiedades */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">
              Error al cargar propiedades. Por favor, intenta de nuevo.
            </p>
          </div>
        ) : propiedades.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No se encontraron propiedades con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {propiedades.map((propiedad) => (
                <PropertyCard key={propiedad.id} propiedad={propiedad} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page}>...</span>
                  }
                  return null
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
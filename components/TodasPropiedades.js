// components/TodasPropiedades.js
'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TodasPropiedades({ searchParams: initialSearchParams }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasInitialized = useRef(false)
  
  const [propiedades, setPropiedades] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // Filtros activos (los que están en la URL y se usan para buscar)
  const [activeFilters, setActiveFilters] = useState({
    sector: '',
    tipo_inmueble: '',
    precioMin: '',
    precioMax: '',
    areaMin: '',
    areaMax: ''
  })
  
  // Filtros del formulario (los que el usuario está editando)
  const [filters, setFilters] = useState({
    sector: '',
    tipo_inmueble: '',
    precioMin: '',
    precioMax: '',
    areaMin: '',
    areaMax: ''
  })
  
  const itemsPerPage = 9

  // Cargar filtros y página desde query params al inicio (SOLO UNA VEZ)
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    
    const params = initialSearchParams || searchParams
    if (params) {
      const filtersFromURL = {
        sector: params.get('sector') || '',
        tipo_inmueble: params.get('tipo_inmueble') || '',
        precioMin: params.get('precioMin') || '',
        precioMax: params.get('precioMax') || '',
        areaMin: params.get('areaMin') || '',
        areaMax: params.get('areaMax') || ''
      }
      
      setFilters(filtersFromURL)
      setActiveFilters(filtersFromURL)
      
      const page = parseInt(params.get('page') || '1')
      setCurrentPage(page)
    }
  }, [initialSearchParams, searchParams])

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

  // Fetch solo usa activeFilters (no filters)
  const fetchPropiedades = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('propiedades')
        .select('*', { count: 'exact' })

      // Aplicar filtros ACTIVOS
      if (activeFilters.sector) {
        query = query.eq('sector', activeFilters.sector)
      }

      if (activeFilters.tipo_inmueble) {
        query = query.eq('tipo_inmueble', activeFilters.tipo_inmueble)
      }

      // Precio
      if (activeFilters.precioMin) {
        query = query.gte('precio', parseFloat(activeFilters.precioMin))
      }
      if (activeFilters.precioMax) {
        query = query.lte('precio', parseFloat(activeFilters.precioMax))
      }

      // Área
      if (activeFilters.areaMin) {
        query = query.gte('area_total', parseFloat(activeFilters.areaMin))
      }
      if (activeFilters.areaMax) {
        query = query.lte('area_total', parseFloat(activeFilters.areaMax))
      }

      // Paginación
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      setPropiedades(data || [])
      setTotalPages(Math.ceil((count || 0) / itemsPerPage))
    } catch (error) {
      console.error('Error fetching propiedades:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, activeFilters])

  // Solo fetch cuando cambian activeFilters o currentPage
  useEffect(() => {
    fetchPropiedades()
  }, [fetchPropiedades])

  // Cuando presionan "Buscar"
  const handleSearch = () => {
    setActiveFilters(filters) // Activar los filtros del formulario
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
    updateURL(activeFilters, page) // Usar activeFilters, no filters
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
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
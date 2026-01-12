// components/TodasPropiedades.js
'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TodasPropiedades() {
  const [propiedades, setPropiedades] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    sector: '',
    tipo_inmueble: '',
    precio: '',
    area: ''
  })
  
  const itemsPerPage = 9

  const fetchPropiedades = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('propiedades')
        .select('*', { count: 'exact' })

      // Aplicar filtros
      if (filters.sector) {
        query = query.eq('sector', filters.sector)
      }

      if (filters.tipo_inmueble) {
        query = query.eq('tipo_inmueble', filters.tipo_inmueble)
      }

      if (filters.precio) {
        const [min, max] = filters.precio.split('-').map(Number)
        query = query.gte('precio', min).lte('precio', max)
      }

      if (filters.area) {
        const [min, max] = filters.area.split('-').map(Number)
        query = query.gte('area_total', min).lte('area_total', max)
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
  }, [currentPage, filters])

  useEffect(() => {
    fetchPropiedades()
  }, [fetchPropiedades])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPropiedades()
  }

  const goToPage = (page) => {
    setCurrentPage(page)
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
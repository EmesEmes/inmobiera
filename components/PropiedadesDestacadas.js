// components/PropiedadesDestacadas.js
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import PropertyCard from './PropertyCard'
import { Loader2 } from 'lucide-react'

export default function PropiedadesDestacadas() {
  const [propiedades, setPropiedades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPropiedadesDestacadas()
  }, [])

  const fetchPropiedadesDestacadas = async () => {
    try {
      const { data, error } = await supabase
        .from('propiedades')
        .select('*')
        .eq('destacado', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setPropiedades(data || [])
    } catch (error) {
      console.error('Error fetching propiedades destacadas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
          </div>
        </div>
      </section>
    )
  }

  if (propiedades.length === 0) {
    return null // No mostrar la sección si no hay propiedades destacadas
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre nuestras mejores opciones seleccionadas especialmente para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((propiedad) => (
            <PropertyCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
      </div>
    </section>
  )
}
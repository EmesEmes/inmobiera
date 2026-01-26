'use client'
import { usePropiedadesVendidas } from '@/lib/queries'
import Image from 'next/image'
import { MapPin, Bed, Bath, Car, Maximize, CheckCircle2, Loader2 } from 'lucide-react'

export default function PropiedadesVendidas() {
  const { data: propiedades = [], isLoading } = usePropiedadesVendidas()

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
          </div>
        </div>
      </section>
    )
  }

  if (propiedades.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades Vendidas
          </h2>
          <p className="text-gray-600 text-lg">
            Historias de éxito de nuestros clientes satisfechos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((propiedad) => (
            <div 
              key={propiedad.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              {/* Badge de Vendido */}
              <div className="absolute top-4 right-4 z-10 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                VENDIDA
              </div>

              {/* Imagen con overlay */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={propiedad.imagenes && propiedad.imagenes.length > 0 
                    ? propiedad.imagenes[0] 
                    : '/placeholder-property.jpg'}
                  alt={propiedad.titulo}
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-green-900/10"></div>
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="capitalize">{propiedad.sector}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {propiedad.titulo}
                </h3>

                {/* Fecha de venta */}
                {propiedad.fecha_venta && (
                  <p className="text-sm text-green-600 font-semibold mb-3">
                    Vendida en {new Date(propiedad.fecha_venta).toLocaleDateString('es-EC', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                )}
                
                {/* Características */}
                <div className="flex items-center justify-between text-gray-700 pt-4 border-t">
                  {propiedad.habitaciones ? (
                    <div className="flex items-center space-x-1">
                      <Bed className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-sm">{propiedad.habitaciones}</span>
                    </div>
                  ) : (
                    <div className="w-8"></div>
                  )}
                  
                  {propiedad.banios ? (
                    <div className="flex items-center space-x-1">
                      <Bath className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-sm">{propiedad.banios}</span>
                    </div>
                  ) : (
                    <div className="w-8"></div>
                  )}
                  
                  {propiedad.parqueaderos ? (
                    <div className="flex items-center space-x-1">
                      <Car className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-sm">{propiedad.parqueaderos}</span>
                    </div>
                  ) : (
                    <div className="w-8"></div>
                  )}
                  
                  {propiedad.area_total ? (
                    <div className="flex items-center space-x-1">
                      <Maximize className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-sm">{propiedad.area_total}m²</span>
                    </div>
                  ) : (
                    <div className="w-8"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-4">
            ¿Quieres ser parte de nuestras historias de éxito?
          </p>
          <a
            href={`https://wa.me/593999999999?text=${encodeURIComponent('Hola, me gustaría información sobre sus propiedades disponibles')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Contáctanos Ahora
          </a>
        </div>
      </div>
    </section>
  )
}
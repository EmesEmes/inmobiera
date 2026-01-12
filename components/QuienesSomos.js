// components/QuienesSomos.js
import { Award, Users, Home, TrendingUp } from 'lucide-react'

export default function QuienesSomos() {
  const stats = [
    { icon: Home, value: '500+', label: 'Propiedades Vendidas' },
    { icon: Users, value: '1000+', label: 'Clientes Satisfechos' },
    { icon: Award, value: '15+', label: 'Años de Experiencia' },
    { icon: TrendingUp, value: '98%', label: 'Tasa de Éxito' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Quiénes Somos?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Somos una empresa inmobiliaria líder en Ecuador, especializada en la venta de 
              propiedades residenciales y comerciales en Quito y sus valles. Con más de 15 años 
              de experiencia en el mercado, nos comprometemos a ayudarte a encontrar el hogar 
              de tus sueños.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Nuestro equipo de profesionales altamente capacitados trabaja con dedicación para 
              ofrecerte un servicio personalizado, transparente y eficiente en cada paso del proceso 
              de compra o venta de tu propiedad.
            </p>
            <p className="text-gray-600 text-lg">
              Nos enfocamos en construir relaciones duraderas con nuestros clientes, basadas en 
              la confianza, la honestidad y el compromiso con la excelencia.
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className="bg-primary-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
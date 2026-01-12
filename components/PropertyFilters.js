// components/PropertyFilters.js
'use client'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function PropertyFilters({ filters, setFilters, onSearch }) {
  const sectores = [
    { value: '', label: 'Todos los sectores' },
    { value: 'norte', label: 'Norte' },
    { value: 'centro', label: 'Centro' },
    { value: 'sur', label: 'Sur' },
    { value: 'cumbaya', label: 'Cumbayá' },
    { value: 'tumbaco', label: 'Tumbaco' },
    { value: 'los_chillos', label: 'Los Chillos' },
  ]

  const tiposInmueble = [
    { value: '', label: 'Todos los tipos' },
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'local', label: 'Local Comercial' },
  ]

  const rangosPrecios = [
    { value: '', label: 'Cualquier precio' },
    { value: '0-50000', label: 'Hasta $50,000' },
    { value: '50000-100000', label: '$50,000 - $100,000' },
    { value: '100000-200000', label: '$100,000 - $200,000' },
    { value: '200000-300000', label: '$200,000 - $300,000' },
    { value: '300000-500000', label: '$300,000 - $500,000' },
    { value: '500000-99999999', label: 'Más de $500,000' },
  ]

  const rangosArea = [
    { value: '', label: 'Cualquier área' },
    { value: '0-50', label: 'Hasta 50 m²' },
    { value: '50-100', label: '50 - 100 m²' },
    { value: '100-200', label: '100 - 200 m²' },
    { value: '200-300', label: '200 - 300 m²' },
    { value: '300-99999', label: 'Más de 300 m²' },
  ]

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">Filtrar Propiedades</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector
          </label>
          <select
            value={filters.sector}
            onChange={(e) => handleChange('sector', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sectores.map(sector => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Inmueble */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Inmueble
          </label>
          <select
            value={filters.tipo_inmueble}
            onChange={(e) => handleChange('tipo_inmueble', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {tiposInmueble.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio
          </label>
          <select
            value={filters.precio}
            onChange={(e) => handleChange('precio', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {rangosPrecios.map(rango => (
              <option key={rango.value} value={rango.value}>
                {rango.label}
              </option>
            ))}
          </select>
        </div>

        {/* Área */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área
          </label>
          <select
            value={filters.area}
            onChange={(e) => handleChange('area', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {rangosArea.map(rango => (
              <option key={rango.value} value={rango.value}>
                {rango.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón de búsqueda */}
      <div className="mt-6">
        <button
          onClick={onSearch}
          className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Search className="h-5 w-5" />
          Buscar Propiedades
        </button>
      </div>
    </div>
  )
}
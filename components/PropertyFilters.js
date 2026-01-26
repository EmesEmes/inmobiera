'use client'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function PropertyFilters({ filters, setFilters, onSearch, onReset }) {
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
    { value: 'quinta', label: 'Quinta' },
    { value: 'edificio', label: 'Edificio' },
    { value: 'suite', label: 'Suite' },
    { value: 'hosteria', label: 'Hostería / Hotel' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'local', label: 'Local Comercial' },
  ]

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReset = () => {
    setFilters({
      sector: '',
      tipo_inmueble: '',
      precioMin: '',
      precioMax: '',
      areaMin: '',
      areaMax: ''
    })
    if (onReset) {
      onReset()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">Filtrar Propiedades</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Precio Mínimo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio Mínimo (USD)
          </label>
          <input
            type="number"
            value={filters.precioMin}
            onChange={(e) => handleChange('precioMin', e.target.value)}
            placeholder="Ej: 50000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Precio Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio Máximo (USD)
          </label>
          <input
            type="number"
            value={filters.precioMax}
            onChange={(e) => handleChange('precioMax', e.target.value)}
            placeholder="Ej: 200000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Área Mínima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área Mínima (m²)
          </label>
          <input
            type="number"
            value={filters.areaMin}
            onChange={(e) => handleChange('areaMin', e.target.value)}
            placeholder="Ej: 50"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Área Máxima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área Máxima (m²)
          </label>
          <input
            type="number"
            value={filters.areaMax}
            onChange={(e) => handleChange('areaMax', e.target.value)}
            placeholder="Ej: 300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={onSearch}
          className="flex-1 md:flex-none bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <Search className="h-5 w-5" />
          Buscar Propiedades
        </button>

        <button
          onClick={handleReset}
          className="flex-1 md:flex-none bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center justify-center gap-2"
        >
          <X className="h-5 w-5" />
          Limpiar Filtros
        </button>
      </div>
    </div>
  )
}
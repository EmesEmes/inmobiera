// lib/queries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'

// Hook para obtener propiedades con filtros y paginación
export function usePropiedades(filters, currentPage, itemsPerPage = 9) {
  return useQuery({
    queryKey: ['propiedades', filters, currentPage], // Se actualiza automáticamente cuando cambian
    queryFn: async () => {
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

      // Precio
      if (filters.precioMin) {
        query = query.gte('precio', parseFloat(filters.precioMin))
      }
      if (filters.precioMax) {
        query = query.lte('precio', parseFloat(filters.precioMax))
      }

      // Área
      if (filters.areaMin) {
        query = query.gte('area_total', parseFloat(filters.areaMin))
      }
      if (filters.areaMax) {
        query = query.lte('area_total', parseFloat(filters.areaMax))
      }

      // Paginación
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      return {
        propiedades: data || [],
        totalPages: Math.ceil((count || 0) / itemsPerPage),
        totalCount: count || 0
      }
    },
  })
}

// Hook para obtener propiedades destacadas
export function usePropiedadesDestacadas() {
  return useQuery({
    queryKey: ['propiedades-destacadas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('propiedades')
        .select('*')
        .eq('destacado', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      return data || []
    },
  })
}

// Hook para obtener una propiedad por ID
export function usePropiedad(id) {
  return useQuery({
    queryKey: ['propiedad', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('propiedades')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id, // Solo ejecutar si hay ID
  })
}

// Hook para crear propiedad
export function useCreatePropiedad() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (propiedadData) => {
      const { data, error } = await supabase
        .from('propiedades')
        .insert([propiedadData])
        .select()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Invalidar todas las queries de propiedades para que se recarguen
      queryClient.invalidateQueries({ queryKey: ['propiedades'] })
      queryClient.invalidateQueries({ queryKey: ['propiedades-destacadas'] })
    },
  })
}

// Hook para actualizar propiedad
export function useUpdatePropiedad() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, propiedadData }) => {
      const { data, error } = await supabase
        .from('propiedades')
        .update(propiedadData)
        .eq('id', id)
        .select()

      if (error) throw error
      return data
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['propiedades'] })
      queryClient.invalidateQueries({ queryKey: ['propiedades-destacadas'] })
      queryClient.invalidateQueries({ queryKey: ['propiedad', variables.id] })
    },
  })
}

// Hook para eliminar propiedad
export function useDeletePropiedad() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('propiedades')
        .delete()
        .eq('id', id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      // Invalidar queries
      queryClient.invalidateQueries({ queryKey: ['propiedades'] })
      queryClient.invalidateQueries({ queryKey: ['propiedades-destacadas'] })
    },
  })
}
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
        gcTime: 10 * 60 * 1000, // Cache se mantiene por 10 minutos (antes era cacheTime)
        refetchOnWindowFocus: false, // No recargar cuando cambias de pestaña
        retry: 1, // Reintentar 1 vez si falla
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
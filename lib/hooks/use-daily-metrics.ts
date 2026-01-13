/**
 * TanStack Query hook for daily metrics data
 * Handles server state for engagement chart
 */

import { useQuery } from '@tanstack/react-query'

export interface DailyMetric {
  date: string
  engagement: number
  reach: number
}

export function useDailyMetrics() {
  return useQuery({
    queryKey: ['daily-metrics'],
    queryFn: async (): Promise<DailyMetric[]> => {
      const response = await fetch('/api/metrics/daily')
      
      if (!response.ok) {
        throw new Error('Failed to fetch daily metrics')
      }

      const data = await response.json()
      return data || []
    },
  })
}


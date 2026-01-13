/**
 * TanStack Query hook for summary analytics
 * Handles server state for summary cards
 */

import { useQuery } from '@tanstack/react-query'

export interface SummaryData {
  totalEngagement: number
  averageEngagementRate: number
  topPost: {
    id: string
    caption: string | null
    engagement_rate: number | null
    likes: number
  } | null
  trendPercentage: number
}

export function useSummary() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: async (): Promise<SummaryData> => {
      const response = await fetch('/api/analytics/summary')
      
      if (!response.ok) {
        throw new Error('Failed to fetch summary data')
      }

      return response.json()
    },
  })
}


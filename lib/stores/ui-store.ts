/**
 * Zustand store for UI state ONLY
 * No server data should be stored here
 * Server data is managed by TanStack Query
 */

import { create } from 'zustand'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type Platform = 'all' | 'instagram' | 'tiktok'
type SortColumn = 'likes' | 'comments' | 'shares' | 'engagement_rate' | 'posted_at'
type SortDirection = 'asc' | 'desc'
type ChartType = 'line' | 'area'

interface UIState {
  // Posts table filters
  platformFilter: Platform
  setPlatformFilter: (platform: Platform) => void

  // Posts table sorting
  sortColumn: SortColumn
  sortDirection: SortDirection
  setSorting: (column: SortColumn, direction: SortDirection) => void

  // Post detail modal
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void

  // Chart type toggle
  chartType: ChartType
  setChartType: (type: ChartType) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  platformFilter: 'all',
  sortColumn: 'posted_at',
  sortDirection: 'desc',
  selectedPost: null,
  chartType: 'line',

  // Actions
  setPlatformFilter: (platform) => set({ platformFilter: platform }),
  setSorting: (column, direction) => set({ sortColumn: column, sortDirection: direction }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setChartType: (type) => set({ chartType: type }),
}))


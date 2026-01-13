/**
 * TanStack Query hook for posts data
 * Handles server state for posts list
 */

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('posted_at', { ascending: false })

      if (error) throw error
      return data || []
    },
  })
}


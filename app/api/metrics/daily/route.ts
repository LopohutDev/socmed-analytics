/**
 * Daily Metrics API Route
 * Runtime: Edge (for fast response)
 * 
 * Fetches daily engagement metrics for the last 30 days
 * Used by the engagement chart component
 * 
 * Security: Requires authentication, validates user context
 */

export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Validate authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Calculate date range (last 30 days)
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Fetch daily metrics for authenticated user
    const { data: metrics, error: metricsError } = await supabase
      .from('daily_metrics')
      .select('date, engagement, reach')
      .eq('user_id', user.id)
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .lte('date', now.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (metricsError) {
      return NextResponse.json(
        { error: 'Failed to fetch metrics' },
        { status: 500 }
      )
    }

    // Return empty array safely if no data
    return NextResponse.json(metrics || [])
  } catch (error) {
    console.error('Daily metrics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


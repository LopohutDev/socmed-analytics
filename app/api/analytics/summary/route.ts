/**
 * Analytics Summary API Route
 * Runtime: Node.js (default)
 *
 * Aggregates metrics server-side for:
 * - Total engagement
 * - Average engagement rate
 * - Top performing post
 * - Trend percentage (last 30 days vs previous 30 days)
 *
 * Security: Requires authentication, validates user context
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type DailyMetric = Database["public"]["Tables"]["daily_metrics"]["Row"];

export async function GET() {
  try {
    const supabase = await createClient();

    // Validate authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all posts for the authenticated user
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id);

    if (postsError) {
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: 500 }
      );
    }

    const postsList: Post[] = posts || [];

    // Calculate total engagement (likes + comments + shares + saves)
    const totalEngagement = postsList.reduce(
      (sum, post) =>
        sum + post.likes + post.comments + post.shares + post.saves,
      0
    );

    // Calculate average engagement rate
    const postsWithRate = postsList.filter((p) => p.engagement_rate !== null);
    const averageEngagementRate =
      postsWithRate.length > 0
        ? postsWithRate.reduce(
            (sum, post) => sum + (post.engagement_rate || 0),
            0
          ) / postsWithRate.length
        : 0;

    // Find top performing post (by engagement rate)
    const topPost: Post | null =
      postsList.length > 0
        ? postsList.reduce((top, post) => {
            const topRate = top.engagement_rate || 0;
            const postRate = post.engagement_rate || 0;
            return postRate > topRate ? post : top;
          })
        : null;

    // Calculate trend: last 30 days vs previous 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const { data: recentMetrics } = await supabase
      .from("daily_metrics")
      .select("engagement")
      .eq("user_id", user.id)
      .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
      .lte("date", now.toISOString().split("T")[0]);

    const { data: previousMetrics } = await supabase
      .from("daily_metrics")
      .select("engagement")
      .eq("user_id", user.id)
      .gte("date", sixtyDaysAgo.toISOString().split("T")[0])
      .lt("date", thirtyDaysAgo.toISOString().split("T")[0]);

    const recentMetricsList: Pick<DailyMetric, "engagement">[] =
      recentMetrics || [];
    const previousMetricsList: Pick<DailyMetric, "engagement">[] =
      previousMetrics || [];

    const recentTotal = recentMetricsList.reduce(
      (sum, m) => sum + m.engagement,
      0
    );
    const previousTotal = previousMetricsList.reduce(
      (sum, m) => sum + m.engagement,
      0
    );

    const trendPercentage =
      previousTotal > 0
        ? ((recentTotal - previousTotal) / previousTotal) * 100
        : 0;

    return NextResponse.json({
      totalEngagement,
      averageEngagementRate: Math.round(averageEngagementRate * 100) / 100,
      topPost: topPost
        ? {
            id: topPost.id,
            caption: topPost.caption,
            engagement_rate: topPost.engagement_rate,
            likes: topPost.likes,
          }
        : null,
      trendPercentage: Math.round(trendPercentage * 100) / 100,
    });
  } catch (error) {
    console.error("Summary API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

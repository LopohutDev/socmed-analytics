import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SummaryCards } from "@/components/summary/summary-cards";
import { EngagementChart } from "@/components/charts/engagement-chart";
import { PostsTable } from "@/components/posts/posts-table";
import { PostDetailModal } from "@/components/posts/post-detail-modal";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Brand mark */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span className="font-semibold text-sm tracking-tight">Analytiq</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              {user.email}
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your content performance across platforms
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Engagement Chart */}
        <EngagementChart />

        {/* Posts Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Your Posts</h2>
            <p className="text-sm text-muted-foreground">Click a row to view detailed metrics</p>
          </div>
          <PostsTable />
        </div>

        {/* Post Detail Modal */}
        <PostDetailModal />
      </div>
    </div>
  );
}

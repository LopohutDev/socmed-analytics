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
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Social Media Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your content performance across platforms
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <LogoutButton />
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Engagement Chart */}
        <EngagementChart />

        {/* Posts Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          <PostsTable />
        </div>

        {/* Post Detail Modal */}
        <PostDetailModal />
      </div>
    </div>
  );
}

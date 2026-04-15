"use client";

import { useSummary } from "@/lib/hooks/use-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Heart,
  BarChart3,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

export function SummaryCards() {
  const { data: summary, isLoading, error } = useSummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Loading...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-red-500">Error loading summary data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const trendIsPositive = summary.trendPercentage >= 0;

  const cards = [
    {
      title: "Total Engagement",
      icon: Heart,
      value: summary.totalEngagement.toLocaleString(),
      description: "Likes + Comments + Shares + Saves",
      iconBg: "bg-rose-100 dark:bg-rose-950",
      iconColor: "text-rose-500",
    },
    {
      title: "Avg Engagement Rate",
      icon: BarChart3,
      value: `${summary.averageEngagementRate.toFixed(2)}%`,
      description: "Across all posts",
      iconBg: "bg-blue-100 dark:bg-blue-950",
      iconColor: "text-blue-500",
    },
    {
      title: "Top Post",
      icon: Trophy,
      value: summary.topPost
        ? `${summary.topPost.engagement_rate?.toFixed(2) || "N/A"}%`
        : "N/A",
      description: summary.topPost
        ? `${
            summary.topPost.caption || "No caption"
          } (${summary.topPost.likes.toLocaleString()} likes)`
        : "No posts yet",
      iconBg: "bg-amber-100 dark:bg-amber-950",
      iconColor: "text-amber-500",
    },
    {
      title: "30-Day Trend",
      icon: trendIsPositive ? TrendingUp : TrendingDown,
      value: `${trendIsPositive ? "+" : ""}${summary.trendPercentage.toFixed(
        1
      )}%`,
      description: "vs previous 30 days",
      iconBg: trendIsPositive
        ? "bg-green-100 dark:bg-green-950"
        : "bg-red-100 dark:bg-red-950",
      iconColor: trendIsPositive ? "text-green-500" : "text-red-500",
      valueColor: trendIsPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 },
            }}
          >
            <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <motion.div
                  className={`text-2xl font-bold tracking-tight ${card.valueColor || "text-foreground"}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                >
                  {card.value}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1.5 truncate">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

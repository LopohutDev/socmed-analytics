"use client";

import { useUIStore } from "@/lib/stores/ui-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  TrendingUp,
  Instagram,
  Music,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PostDetailModal() {
  const { selectedPost, setSelectedPost } = useUIStore();

  if (!selectedPost) return null;

  return (
    <Dialog
      open={!!selectedPost}
      onOpenChange={(open) => !open && setSelectedPost(null)}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {selectedPost.platform === "instagram" ? (
              <Instagram className="w-5 h-5" />
            ) : (
              <Music className="w-5 h-5" />
            )}
            <span className="capitalize">{selectedPost.platform} Post</span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image Preview */}
          {selectedPost.thumbnail_url && (
            <motion.div
              className="w-full aspect-square rounded-lg overflow-hidden bg-muted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <img
                src={selectedPost.thumbnail_url}
                alt={selectedPost.caption || "Post"}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Caption */}
          {selectedPost.caption && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-2">Caption</h4>
              <p className="text-sm text-muted-foreground">
                {selectedPost.caption}
              </p>
            </motion.div>
          )}

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <h4 className="font-semibold mb-3">Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Heart,
                  label: "Likes",
                  value: selectedPost.likes,
                  color: "text-red-500",
                  delay: 0.3,
                },
                {
                  icon: MessageCircle,
                  label: "Comments",
                  value: selectedPost.comments,
                  color: "text-blue-500",
                  delay: 0.35,
                },
                {
                  icon: Share2,
                  label: "Shares",
                  value: selectedPost.shares,
                  color: "text-green-500",
                  delay: 0.4,
                },
                {
                  icon: Bookmark,
                  label: "Saves",
                  value: selectedPost.saves,
                  color: "text-yellow-500",
                  delay: 0.45,
                },
                {
                  icon: Eye,
                  label: "Reach",
                  value: selectedPost.reach,
                  color: "text-purple-500",
                  delay: 0.5,
                },
                {
                  icon: TrendingUp,
                  label: "Engagement Rate",
                  value:
                    selectedPost.engagement_rate !== null
                      ? `${selectedPost.engagement_rate.toFixed(2)}%`
                      : "N/A",
                  color: "text-orange-500",
                  delay: 0.55,
                  isRate: true,
                },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: metric.delay }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="text-lg font-semibold">
                        {metric.isRate
                          ? metric.value
                          : (metric.value as number).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="grid grid-cols-2 gap-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div>
              <p className="text-muted-foreground">Media Type</p>
              <p className="font-medium capitalize">
                {selectedPost.media_type}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Posted Date</p>
              <p className="font-medium">
                {new Date(selectedPost.posted_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Impressions</p>
              <p className="font-medium">
                {selectedPost.impressions.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* View on Platform Button */}
          {selectedPost.permalink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.65 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild className="w-full">
                <a
                  href={selectedPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on{" "}
                  {selectedPost.platform === "instagram"
                    ? "Instagram"
                    : "TikTok"}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- POSTS TABLE
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT CHECK (platform IN ('instagram','tiktok')) NOT NULL,
  caption TEXT,
  thumbnail_url TEXT,
  media_type TEXT CHECK (media_type IN ('image','video','carousel')) NOT NULL,
  posted_at TIMESTAMPTZ NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  permalink TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAILY METRICS TABLE
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_posted_at ON posts(posted_at);
CREATE INDEX idx_posts_platform ON posts(platform);
CREATE INDEX idx_daily_metrics_user_id ON daily_metrics(user_id);
CREATE INDEX idx_daily_metrics_date ON daily_metrics(date);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for POSTS table
-- SELECT: Users can only view their own posts
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only insert posts with their own user_id
CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own posts
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own posts
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for DAILY_METRICS table
-- SELECT: Users can only view their own metrics
CREATE POLICY "Users can view own metrics"
  ON daily_metrics FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only insert metrics with their own user_id
CREATE POLICY "Users can insert own metrics"
  ON daily_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own metrics
CREATE POLICY "Users can update own metrics"
  ON daily_metrics FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own metrics
CREATE POLICY "Users can delete own metrics"
  ON daily_metrics FOR DELETE
  USING (auth.uid() = user_id);


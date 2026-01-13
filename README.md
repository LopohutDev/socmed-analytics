# 📊 Social Media Analytics Dashboard

A secure, production-ready social media analytics dashboard for content creators that visualizes engagement metrics per post with strict data isolation using Supabase RLS, server-side aggregation, and clean state separation.

## 🎯 Project Overview

This application provides content creators with comprehensive analytics for their Instagram and TikTok posts, featuring:

- **Real-time metrics tracking** (likes, comments, shares, saves, reach, impressions)
- **Interactive data visualization** with customizable charts
- **Secure multi-tenant architecture** with Row Level Security (RLS)
- **Server-side aggregation** for optimal performance
- **Clean state management** separating UI and server state

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Backend**: Supabase (Postgres + Auth + RLS)
- **UI Components**: shadcn/ui (Radix primitives)
- **Styling**: Tailwind CSS v4
- **UI State**: Zustand
- **Server State**: TanStack Query
- **Tables**: TanStack Table
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Key Architecture Decisions

#### 1. **Aggregation Location: API Routes (Server-Side)**

**Decision**: All metric aggregations happen in API routes (`/api/analytics/summary`), not in the database or client.

**Reasoning**:
- ✅ **Performance**: Leverages Next.js server runtime, reducing database load
- ✅ **Scalability**: Easy to add caching layers (Redis, CDN) without schema changes
- ✅ **Flexibility**: Can combine multiple data sources and apply complex business logic
- ✅ **Security**: Keeps aggregation logic server-side, preventing client manipulation
- ⚠️ **Tradeoff**: Slightly higher latency than database functions, but more maintainable

**Alternative Considered**: Postgres functions would be faster but harder to test, version, and cache.

#### 2. **State Ownership: Zustand vs TanStack Query vs URL**

**Decision**: Strict separation of concerns:
- **Zustand**: UI-only state (filters, sort, modal open/close, chart type)
- **TanStack Query**: All server data (posts, metrics, summary)
- **URL**: Not used (could be added for shareable filters)

**Reasoning**:
- ✅ **Clear boundaries**: No confusion about data source of truth
- ✅ **Automatic caching**: TanStack Query handles server state lifecycle
- ✅ **No prop drilling**: Both stores accessible anywhere
- ✅ **Type safety**: Full TypeScript support across state layers

#### 3. **Trend Calculation: Last 30 vs Previous 30 Days**

**Decision**: Compare last 30 days of engagement to the previous 30 days (days 31-60).

**Reasoning**:
- ✅ **Fair comparison**: Equal time periods
- ✅ **Accounts for seasonality**: 30-day window smooths daily variance
- ✅ **Actionable insights**: Shows momentum direction
- 📊 **Formula**: `((recent - previous) / previous) * 100`

**Alternative Considered**: Month-over-month would align with calendar but creates unequal comparison periods.

#### 4. **Empty Data Handling**

**Strategy**:
- **Summary Cards**: Show `0` for totals, `N/A` for rates, `"No posts yet"` for top post
- **Chart**: Display message: `"No data available for the last 30 days"`
- **Engagement Rate**: Show `N/A` when null (prevents division by zero confusion)
- **Posts Table**: Show empty state with call-to-action message

**Reasoning**: Explicit empty states prevent user confusion and guide next actions.

## 🔒 Security Architecture

### Row Level Security (RLS)

**Critical Implementation**: All tables have RLS enabled with full CRUD isolation.

```sql
-- Example: Posts table policies
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Why This Matters**:
- ✅ **Database-level security**: Even if application code is compromised, data is isolated
- ✅ **Zero-trust architecture**: Every query is validated at the database layer
- ✅ **Multi-tenant safe**: Users can NEVER access other users' data
- ✅ **Tested**: Seed data includes 2 users to verify isolation

### Client Architecture

**Browser Client** (`lib/supabase/client.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` only
- Safe for client-side usage
- User context from cookies

**Server Client** (`lib/supabase/server.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` with SSR cookie handling
- Never exposes service role key
- Validates auth on every request

### API Route Security

All API routes (`/api/*`) implement:
1. **Authentication check**: `supabase.auth.getUser()`
2. **User context validation**: Queries filtered by `user_id`
3. **Input validation**: Type checking on parameters
4. **Error handling**: Proper HTTP status codes (401, 500)

## 📁 Project Structure

```
app/
  api/
    analytics/summary/route.ts    # Server-side aggregation (Node runtime)
    metrics/daily/route.ts         # Daily metrics endpoint (Edge runtime)
  auth/
    login/page.tsx                 # Authentication page
  dashboard/
    page.tsx                       # Main dashboard (auth required)
components/
  posts/
    posts-table.tsx                # TanStack Table with sorting/filtering
    post-detail-modal.tsx          # Radix Dialog for post details
  charts/
    engagement-chart.tsx           # Recharts visualization
  summary/
    summary-cards.tsx              # Aggregated metrics display
  ui/                              # shadcn/ui components
  providers/
    query-provider.tsx             # TanStack Query setup
lib/
  supabase/
    client.ts                      # Browser Supabase client
    server.ts                      # Server Supabase client
  stores/
    ui-store.ts                    # Zustand UI state
  hooks/
    use-posts.ts                   # TanStack Query for posts
    use-daily-metrics.ts           # TanStack Query for metrics
    use-summary.ts                 # TanStack Query for summary
  utils/
    cn.ts                          # Tailwind class merger
supabase/
  migrations/
    001_initial_schema.sql         # Database schema + RLS
  seed.sql                         # Test data for 2 users
types/
  database.ts                      # TypeScript database types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- npm/yarn/pnpm

### Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repo-url>
   cd socmed-analytics
   npm install
   ```

2. **Supabase Setup**
   - Create a new Supabase project at https://app.supabase.com
   - Go to Project Settings → API
   - Copy your project URL and anon key

3. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Database Setup**
   - In Supabase Dashboard, go to SQL Editor
   - Run `supabase/migrations/001_initial_schema.sql`
   - Create 2 test users in Authentication → Users
   - Update `supabase/seed.sql` with actual user UUIDs
   - Run `supabase/seed.sql` to populate test data

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

6. **Login**
   - Use your Supabase test user credentials
   - You'll be redirected to `/dashboard`

## 🧪 Testing RLS

To verify data isolation:

1. Create 2 users in Supabase Auth
2. Seed data for both users
3. Login as User 1 → verify you only see User 1's posts
4. Logout and login as User 2 → verify you only see User 2's posts
5. Check browser DevTools → Network → verify API responses contain only user-specific data

## 📊 Features

### Posts Table
- ✅ Sortable columns (likes, comments, shares, engagement rate, date)
- ✅ Platform filter (All / Instagram / TikTok)
- ✅ Click row to open detail modal
- ✅ Responsive design
- ✅ Loading skeleton
- ✅ Empty state

### Engagement Chart
- ✅ Last 30 days of data
- ✅ Toggle between Line and Area chart
- ✅ Dual metrics: Engagement + Reach
- ✅ Responsive container
- ✅ Hover tooltips
- ✅ Axis labels + legend

### Summary Cards
- ✅ Total Engagement (sum of all interactions)
- ✅ Average Engagement Rate (across all posts)
- ✅ Top Performing Post (highest engagement rate)
- ✅ 30-Day Trend (% change vs previous period)
- ✅ Visual trend indicators (↑/↓)

### Post Detail Modal
- ✅ Large image preview
- ✅ Full metrics breakdown
- ✅ Platform indicator
- ✅ External link to original post
- ✅ Keyboard accessible (Escape to close)
- ✅ Focus trap
- ✅ Smooth animations with Framer Motion

### Animations
- ✅ **Summary Cards**: Staggered fade-in with scale animation on values
- ✅ **Engagement Chart**: Fade-in on load, smooth transitions when switching chart types
- ✅ **Post Detail Modal**: Cascading animations for content sections
- ✅ **Metric Cards**: Hover scale effects for interactivity
- ✅ **Buttons**: Tap and hover animations for better UX
- ✅ **Chart Toggle**: Smooth AnimatePresence transitions between line/area views

## 🎨 Design Decisions

### Why Recharts over Visx?
- ✅ **Simpler API**: Faster development for standard charts
- ✅ **Better TypeScript support**: Out-of-the-box types
- ✅ **Responsive by default**: Less configuration needed
- ⚠️ **Tradeoff**: Less customization than Visx (acceptable for this use case)

### Why TanStack Table?
- ✅ **Headless**: Full control over UI
- ✅ **Type-safe**: Excellent TypeScript integration
- ✅ **Feature-rich**: Sorting, filtering, pagination built-in
- ✅ **Performance**: Virtual scrolling support for large datasets

### Why Zustand over Context API?
- ✅ **Less boilerplate**: No providers needed
- ✅ **Better performance**: Selective re-renders
- ✅ **DevTools**: Redux DevTools integration
- ✅ **Simpler testing**: Direct store access

### Why Framer Motion?
- ✅ **Production-ready**: Battle-tested animation library
- ✅ **Declarative API**: Easy to read and maintain
- ✅ **Performance**: GPU-accelerated animations
- ✅ **Gesture support**: Built-in hover, tap, drag interactions
- ✅ **AnimatePresence**: Smooth enter/exit animations
- ✅ **TypeScript**: Full type safety

## 🔧 What I'd Improve With More Time

1. **Caching Layer**
   - Add Redis for API route caching
   - Implement stale-while-revalidate pattern
   - Cache invalidation on data mutations

2. **Advanced Features**
   - URL-based filters for shareable links
   - Export data to CSV/PDF
   - Comparison mode (compare 2 posts side-by-side)
   - Scheduled reports via email

3. **Performance Optimizations**
   - Virtual scrolling for large post lists
   - Image optimization with Next.js Image
   - Lazy loading for chart components
   - Database indexes optimization

4. **Testing**
   - Unit tests for hooks and utilities
   - Integration tests for API routes
   - E2E tests with Playwright
   - RLS policy tests

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (PostHog)
   - Performance monitoring (Vercel Analytics)
   - Database query performance tracking

6. **UX Enhancements**
   - Skeleton loaders for all components
   - Optimistic updates for mutations
   - Infinite scroll for posts table
   - Keyboard shortcuts

## 📝 Environment Variables

See `.env.example` for required variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

**⚠️ Security Note**: Never commit `.env.local` or expose the service role key in frontend code.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel automatically:
- Detects Next.js
- Configures build settings
- Enables Edge runtime for API routes
- Sets up preview deployments

### Manual Deployment

```bash
npm run build
npm run start
```

## 📄 License

MIT

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- shadcn for the beautiful UI components
- TanStack for Query and Table libraries

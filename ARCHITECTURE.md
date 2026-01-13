# Architecture Overview

## System Design

This application follows a modern, secure, multi-tenant architecture with strict data isolation.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Zustand    │  │ TanStack     │  │  Components  │      │
│  │  (UI State)  │  │   Query      │  │              │      │
│  │              │  │ (Server      │  │              │      │
│  │ - Filters    │  │  State)      │  │ - Table      │      │
│  │ - Sort       │  │              │  │ - Charts     │      │
│  │ - Modal      │  │ - Posts      │  │ - Cards      │      │
│  │ - Chart Type │  │ - Metrics    │  │ - Modal      │      │
│  └──────────────┘  │ - Summary    │  └──────────────┘      │
│                     └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 Server                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes (Server-Side)                 │   │
│  │  ┌────────────────────┐  ┌────────────────────┐     │   │
│  │  │ /api/analytics/    │  │ /api/metrics/      │     │   │
│  │  │      summary       │  │     daily          │     │   │
│  │  │                    │  │                    │     │   │
│  │  │ - Auth Check       │  │ - Auth Check       │     │   │
│  │  │ - Aggregate Data   │  │ - Fetch Metrics    │     │   │
│  │  │ - Calculate Trends │  │ - Filter by User   │     │   │
│  │  │ - Return JSON      │  │ - Return JSON      │     │   │
│  │  │                    │  │                    │     │   │
│  │  │ Runtime: Node      │  │ Runtime: Edge      │     │   │
│  │  └────────────────────┘  └────────────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Middleware                           │   │
│  │  - Auth validation                                    │   │
│  │  - Route protection                                   │   │
│  │  - Cookie management                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Supabase Client
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  PostgreSQL Database                  │   │
│  │                                                       │   │
│  │  ┌─────────────┐              ┌─────────────┐       │   │
│  │  │   posts     │              │daily_metrics│       │   │
│  │  │             │              │             │       │   │
│  │  │ RLS: ✓      │              │ RLS: ✓      │       │   │
│  │  │             │              │             │       │   │
│  │  │ Policies:   │              │ Policies:   │       │   │
│  │  │ - SELECT    │              │ - SELECT    │       │   │
│  │  │ - INSERT    │              │ - INSERT    │       │   │
│  │  │ - UPDATE    │              │ - UPDATE    │       │   │
│  │  │ - DELETE    │              │ - DELETE    │       │   │
│  │  │             │              │             │       │   │
│  │  │ All filtered│              │ All filtered│       │   │
│  │  │ by user_id  │              │ by user_id  │       │   │
│  │  └─────────────┘              └─────────────┘       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Authentication                       │   │
│  │  - Email/Password                                     │   │
│  │  - Session management                                 │   │
│  │  - Cookie-based auth                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication
```
User → Login Form → Supabase Auth → Session Cookie → Middleware → Dashboard
```

### 2. Fetching Posts
```
Dashboard → usePosts() → TanStack Query → Supabase Client → RLS Check → Posts Table
```

### 3. Aggregated Metrics
```
Dashboard → useSummary() → /api/analytics/summary → Supabase → Aggregate → JSON Response
```

### 4. Chart Data
```
Dashboard → useDailyMetrics() → /api/metrics/daily → Supabase → Filter by Date → JSON Response
```

## Security Layers

### Layer 1: Row Level Security (Database)
- **Location**: PostgreSQL
- **Enforcement**: Every query automatically filtered by `user_id = auth.uid()`
- **Bypass**: Impossible without service role key (not exposed)

### Layer 2: API Route Authentication
- **Location**: Next.js API routes
- **Enforcement**: `supabase.auth.getUser()` check
- **Response**: 401 Unauthorized if not authenticated

### Layer 3: Middleware Protection
- **Location**: Next.js middleware
- **Enforcement**: Redirect to login if accessing protected routes
- **Scope**: `/dashboard/*` routes

### Layer 4: Client-Side State
- **Location**: Browser
- **Enforcement**: TanStack Query only stores user's own data
- **Note**: Not a security layer, but prevents UI confusion

## State Management Strategy

### Zustand (UI State)
**Purpose**: Ephemeral UI state that doesn't need to persist

**Stores**:
- Platform filter (all/instagram/tiktok)
- Sort column and direction
- Selected post for modal
- Chart type (line/area)

**Why**: Fast, simple, no prop drilling

### TanStack Query (Server State)
**Purpose**: Server data with automatic caching and revalidation

**Queries**:
- `posts`: All user's posts
- `daily-metrics`: Last 30 days of engagement
- `summary`: Aggregated analytics

**Why**: Automatic caching, loading states, error handling

### URL State (Not Implemented)
**Could Store**: Filters, sort, selected post ID
**Benefit**: Shareable links
**Tradeoff**: More complexity, not required for MVP

## Performance Optimizations

### 1. Edge Runtime for Metrics API
- Faster response times
- Global distribution
- Lower latency

### 2. TanStack Query Caching
- 1-minute stale time
- Reduces API calls
- Instant UI updates

### 3. Server-Side Aggregation
- Reduces data transfer
- Offloads computation from client
- Easier to cache

### 4. Database Indexes
- `user_id` on both tables
- `posted_at` for sorting
- `date` for metrics queries

## Scalability Considerations

### Current Architecture Supports:
- ✅ Thousands of users
- ✅ Millions of posts (with pagination)
- ✅ Real-time updates (via Supabase subscriptions)

### Future Improvements:
- Add Redis caching layer
- Implement pagination for posts table
- Add database read replicas
- Use CDN for static assets
- Implement virtual scrolling for large datasets

## Type Safety

### Database Types
- Generated from Supabase schema
- Full TypeScript coverage
- Compile-time validation

### Component Props
- Strict typing throughout
- No `any` types
- Inference where possible

## Testing Strategy (Not Implemented)

### Recommended Tests:
1. **RLS Policies**: Verify data isolation
2. **API Routes**: Auth checks, aggregation logic
3. **Components**: Rendering, interactions
4. **Hooks**: Data fetching, error handling
5. **E2E**: Full user flows

## Deployment

### Vercel (Recommended)
- Automatic deployments
- Edge network
- Environment variables
- Preview deployments

### Environment Variables Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Build Process:
1. TypeScript compilation
2. Next.js optimization
3. Static generation where possible
4. Edge runtime for API routes


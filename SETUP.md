# Quick Setup Guide

This guide will help you get the Social Media Analytics Dashboard up and running.

## Prerequisites

- Node.js 18 or higher
- A Supabase account (free tier works)
- npm, yarn, or pnpm

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and wait for setup to complete

### 3. Setup Database

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run it in the SQL Editor
4. Verify tables were created in **Table Editor**

### 4. Create Test Users

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Create 2 test users with email/password
4. Copy both user UUIDs (you'll need them for seeding)

### 5. Seed Test Data

1. Open `supabase/seed.sql`
2. Replace `USER_1_UUID` with your first user's UUID (appears twice)
3. Replace `USER_2_UUID` with your second user's UUID (appears twice)
4. Copy the entire file
5. Paste and run it in the SQL Editor

### 6. Configure Environment Variables

1. In Supabase, go to **Project Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 8. Login

Use one of your test user credentials to login.

## Verify RLS is Working

To ensure Row Level Security is properly isolating data:

1. Login as User 1
2. Note the posts you see
3. Logout
4. Login as User 2
5. Verify you see completely different posts

## Troubleshooting

### Build fails with "Your project's URL and API key are required"

- Make sure `.env.local` exists with correct values
- The `.env` file has placeholder values for build - don't delete it

### No data showing in dashboard

- Verify you ran the seed script
- Check that you replaced USER_1_UUID and USER_2_UUID with actual UUIDs
- Verify RLS policies are enabled (check SQL Editor)

### Authentication not working

- Verify your Supabase project URL and anon key are correct
- Check that users exist in Authentication → Users
- Clear browser cookies and try again

## Next Steps

- Explore the dashboard features
- Check the main README.md for architecture details
- Review the code to understand the implementation
- Deploy to Vercel (see README.md)

## Support

For issues or questions:
- Check the main README.md
- Review Supabase documentation
- Check Next.js documentation


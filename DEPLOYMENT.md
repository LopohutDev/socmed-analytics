# Vercel Deployment Guide

This guide will walk you through deploying the Social Media Analytics Dashboard to Vercel.

## Prerequisites

- A Vercel account (free tier works)
- A GitHub account (recommended for automatic deployments)
- Your Supabase project URL and anon key

## Option 1: Deploy via Vercel CLI (Fastest)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

From the project root directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → socmed-analytics (or your preferred name)
- **Directory?** → ./ (press Enter)
- **Override settings?** → No

### 4. Add Environment Variables

After the initial deployment, add your environment variables:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
```
Paste your Supabase URL when prompted, then select all environments (production, preview, development).

```bash
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Paste your Supabase anon key when prompted, then select all environments.

### 5. Redeploy with Environment Variables

```bash
vercel --prod
```

Your app is now live! 🎉

## Option 2: Deploy via Vercel Dashboard (Recommended for GitHub Integration)

### 1. Push to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### 3. Add Environment Variables

Before deploying, click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

Make sure to select all environments (Production, Preview, Development).

### 4. Deploy

Click **"Deploy"** and wait for the build to complete (usually 1-2 minutes).

## Post-Deployment Steps

### 1. Verify Deployment

Visit your deployment URL (e.g., `https://socmed-analytics.vercel.app`) and:
- ✅ Check that the login page loads
- ✅ Login with a test user
- ✅ Verify data loads correctly
- ✅ Test all features (table, charts, modal)

### 2. Configure Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Update Supabase Redirect URLs

1. Go to your Supabase project
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
4. Add to **Redirect URLs**: `https://your-app.vercel.app/**`

## Automatic Deployments

With GitHub integration:
- **Production**: Pushes to `main` branch automatically deploy to production
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback to previous deployments in Vercel Dashboard

## Environment Variables Management

### View Current Variables
```bash
vercel env ls
```

### Pull Variables Locally
```bash
vercel env pull .env.local
```

### Update a Variable
```bash
vercel env rm NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

## Troubleshooting

### Build Fails

**Error**: "Module not found" or dependency issues
- **Solution**: Make sure all dependencies are in `package.json`, not just `devDependencies`
- Run `npm install` locally to verify

**Error**: Environment variables not found
- **Solution**: Add them in Vercel Dashboard or via CLI
- Redeploy after adding variables

### Runtime Errors

**Error**: "Unauthorized" or authentication issues
- **Solution**: Verify Supabase URL and anon key are correct
- Check Supabase redirect URLs include your Vercel domain

**Error**: No data showing
- **Solution**: Verify RLS policies are enabled in Supabase
- Check that seed data exists for your test users

### Performance Issues

- Enable **Edge Runtime** for API routes (already configured)
- Consider adding **Vercel Analytics** for monitoring
- Use **Vercel Speed Insights** to identify bottlenecks

## Monitoring

### Add Vercel Analytics

1. Go to your project in Vercel Dashboard
2. Click **"Analytics"** tab
3. Enable Web Analytics (free)

### Add Speed Insights

Install the package:
```bash
npm install @vercel/speed-insights
```

Add to your root layout (already configured if using latest Next.js).

## Cost Considerations

**Vercel Free Tier Includes**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Edge Network (global CDN)

**Supabase Free Tier Includes**:
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth

This project should run comfortably on both free tiers for personal use or small teams.

## Next Steps

- Set up monitoring and alerts
- Configure custom domain
- Enable Vercel Analytics
- Set up GitHub Actions for additional CI/CD
- Consider adding Sentry for error tracking

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)


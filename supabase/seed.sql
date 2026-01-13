-- Seed data for testing
-- NOTE: This assumes you have created 2 test users in Supabase Auth
-- Replace 4689cc47-eeaa-408f-93b1-e2bb5175cdba and 2b791ef7-55c4-4187-aa3a-67574815fb66 with actual UUIDs from auth.users

-- Example User 1 Posts (Instagram focused)
-- Replace '4689cc47-eeaa-408f-93b1-e2bb5175cdba' with actual user UUID
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink) VALUES
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Beautiful sunset at the beach 🌅', 'https://picsum.photos/seed/1/400/400', 'image', NOW() - INTERVAL '1 day', 245, 18, 5, 32, 1200, 1500, 25.00, 'https://instagram.com/p/1'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Morning coffee vibes ☕', 'https://picsum.photos/seed/2/400/400', 'image', NOW() - INTERVAL '2 days', 189, 12, 3, 21, 980, 1200, 22.96, 'https://instagram.com/p/2'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Quick recipe tutorial 🍳', 'https://picsum.photos/seed/3/400/600', 'video', NOW() - INTERVAL '3 days', 1523, 87, 234, 156, 8900, 12000, 22.25, 'https://tiktok.com/@user/video/1'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Travel memories from Paris 🗼', 'https://picsum.photos/seed/4/400/400', 'carousel', NOW() - INTERVAL '5 days', 412, 34, 12, 67, 2100, 2800, 24.95, 'https://instagram.com/p/3'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Dance challenge! 💃', 'https://picsum.photos/seed/5/400/600', 'video', NOW() - INTERVAL '6 days', 2341, 156, 445, 289, 15600, 18900, 20.90, 'https://tiktok.com/@user/video/2'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Fitness motivation 💪', 'https://picsum.photos/seed/6/400/400', 'video', NOW() - INTERVAL '8 days', 567, 43, 18, 89, 3200, 4100, 21.97, 'https://instagram.com/p/4'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'New product launch! 🎉', 'https://picsum.photos/seed/7/400/400', 'image', NOW() - INTERVAL '10 days', 823, 91, 34, 123, 4500, 5800, 23.44, 'https://instagram.com/p/5'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Behind the scenes 🎬', 'https://picsum.photos/seed/8/400/600', 'video', NOW() - INTERVAL '12 days', 1876, 134, 312, 201, 11200, 14500, 23.73, 'https://tiktok.com/@user/video/3'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Weekend vibes 🌴', 'https://picsum.photos/seed/9/400/400', 'image', NOW() - INTERVAL '14 days', 334, 21, 7, 45, 1800, 2300, 22.61, 'https://instagram.com/p/6'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Life hack you need! 🔧', 'https://picsum.photos/seed/10/400/600', 'video', NOW() - INTERVAL '16 days', 3421, 287, 678, 412, 21000, 26000, 20.85, 'https://tiktok.com/@user/video/4'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Food photography 📸', 'https://picsum.photos/seed/11/400/400', 'image', NOW() - INTERVAL '18 days', 456, 38, 11, 72, 2600, 3200, 22.19, 'https://instagram.com/p/7'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Throwback Thursday 📅', 'https://picsum.photos/seed/12/400/400', 'carousel', NOW() - INTERVAL '20 days', 298, 19, 6, 34, 1500, 1900, 23.80, 'https://instagram.com/p/8'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Trending sound 🎵', 'https://picsum.photos/seed/13/400/600', 'video', NOW() - INTERVAL '22 days', 2987, 198, 534, 367, 17800, 21500, 21.85, 'https://tiktok.com/@user/video/5'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Nature photography 🌿', 'https://picsum.photos/seed/14/400/400', 'image', NOW() - INTERVAL '24 days', 512, 41, 14, 81, 2900, 3600, 22.07, 'https://instagram.com/p/9'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'tiktok', 'Comedy skit 😂', 'https://picsum.photos/seed/15/400/600', 'video', NOW() - INTERVAL '26 days', 4123, 312, 789, 501, 24500, 29000, 22.15, 'https://tiktok.com/@user/video/6'),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', 'instagram', 'Motivational quote ✨', 'https://picsum.photos/seed/16/400/400', 'image', NOW() - INTERVAL '28 days', 389, 27, 9, 56, 2100, 2700, 22.67, 'https://instagram.com/p/10');

-- Example User 2 Posts (TikTok focused)
-- Replace '2b791ef7-55c4-4187-aa3a-67574815fb66' with actual user UUID
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink) VALUES
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Morning routine ☀️', 'https://picsum.photos/seed/21/400/600', 'video', NOW() - INTERVAL '1 day', 1834, 123, 289, 178, 10200, 13000, 23.63, 'https://tiktok.com/@user2/video/1'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Coffee art ☕', 'https://picsum.photos/seed/22/400/400', 'image', NOW() - INTERVAL '3 days', 267, 19, 6, 28, 1400, 1800, 22.86, 'https://instagram.com/p/21'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Cooking tips 👨‍🍳', 'https://picsum.photos/seed/23/400/600', 'video', NOW() - INTERVAL '4 days', 2156, 167, 412, 267, 13400, 16800, 21.49, 'https://tiktok.com/@user2/video/2'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Pet moments 🐕', 'https://picsum.photos/seed/24/400/600', 'video', NOW() - INTERVAL '6 days', 3421, 289, 678, 445, 19800, 24000, 22.97, 'https://tiktok.com/@user2/video/3'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Aesthetic flat lay 📱', 'https://picsum.photos/seed/25/400/400', 'image', NOW() - INTERVAL '8 days', 423, 34, 11, 67, 2300, 2900, 23.04, 'https://instagram.com/p/22'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Fashion haul 👗', 'https://picsum.photos/seed/26/400/600', 'video', NOW() - INTERVAL '9 days', 2789, 201, 489, 334, 16200, 19500, 21.85, 'https://tiktok.com/@user2/video/4'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Sunset views 🌇', 'https://picsum.photos/seed/27/400/400', 'image', NOW() - INTERVAL '11 days', 512, 38, 13, 76, 2800, 3500, 22.46, 'https://instagram.com/p/23'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Workout routine 🏋️', 'https://picsum.photos/seed/28/400/600', 'video', NOW() - INTERVAL '13 days', 1923, 145, 334, 223, 11800, 14900, 22.76, 'https://tiktok.com/@user2/video/5'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Travel diary ✈️', 'https://picsum.photos/seed/29/400/400', 'carousel', NOW() - INTERVAL '15 days', 634, 52, 18, 91, 3400, 4200, 23.35, 'https://instagram.com/p/24'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'DIY project 🔨', 'https://picsum.photos/seed/30/400/600', 'video', NOW() - INTERVAL '17 days', 2567, 189, 445, 312, 15100, 18600, 23.19, 'https://tiktok.com/@user2/video/6'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Book recommendations 📚', 'https://picsum.photos/seed/31/400/400', 'image', NOW() - INTERVAL '19 days', 389, 31, 9, 54, 2100, 2600, 22.81, 'https://instagram.com/p/25'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Storytime 📖', 'https://picsum.photos/seed/32/400/600', 'video', NOW() - INTERVAL '21 days', 3156, 267, 612, 401, 18900, 22800, 22.70, 'https://tiktok.com/@user2/video/7'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Minimalist setup 🖥️', 'https://picsum.photos/seed/33/400/400', 'image', NOW() - INTERVAL '23 days', 478, 36, 12, 69, 2600, 3200, 22.88, 'https://instagram.com/p/26'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Reaction video 😱', 'https://picsum.photos/seed/34/400/600', 'video', NOW() - INTERVAL '25 days', 2834, 212, 523, 356, 16800, 20400, 22.61, 'https://tiktok.com/@user2/video/8'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'instagram', 'Product review 🎁', 'https://picsum.photos/seed/35/400/400', 'video', NOW() - INTERVAL '27 days', 567, 47, 15, 84, 3100, 3800, 22.97, 'https://instagram.com/p/27'),
('2b791ef7-55c4-4187-aa3a-67574815fb66', 'tiktok', 'Trending challenge 🎯', 'https://picsum.photos/seed/36/400/600', 'video', NOW() - INTERVAL '29 days', 3789, 298, 712, 478, 22100, 26500, 21.98, 'https://tiktok.com/@user2/video/9');

-- Daily metrics for User 1 (last 30 days)
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '1 day', 300, 1200),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '2 days', 225, 980),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '3 days', 2000, 8900),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '4 days', 180, 850),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '5 days', 525, 2100),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '6 days', 3231, 15600),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '7 days', 210, 920),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '8 days', 717, 3200),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '9 days', 195, 890),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '10 days', 1071, 4500),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '11 days', 240, 1100),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '12 days', 2523, 11200),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '13 days', 205, 950),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '14 days', 407, 1800),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '15 days', 230, 1050),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '16 days', 4798, 21000),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '17 days', 215, 980),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '18 days', 577, 2600),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '19 days', 190, 870),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '20 days', 357, 1500),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '21 days', 225, 1020),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '22 days', 4086, 17800),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '23 days', 235, 1080),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '24 days', 648, 2900),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '25 days', 245, 1150),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '26 days', 5725, 24500),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '27 days', 260, 1200),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '28 days', 481, 2100),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '29 days', 220, 1000),
('4689cc47-eeaa-408f-93b1-e2bb5175cdba', CURRENT_DATE - INTERVAL '30 days', 195, 890);

-- Daily metrics for User 2 (last 30 days)
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '1 day', 2424, 10200),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '2 days', 185, 920),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '3 days', 320, 1400),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '4 days', 3002, 13400),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '5 days', 210, 980),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '6 days', 4833, 19800),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '7 days', 195, 890),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '8 days', 535, 2300),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '9 days', 3813, 16200),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '10 days', 225, 1050),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '11 days', 639, 2800),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '12 days', 240, 1100),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '13 days', 2625, 11800),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '14 days', 205, 950),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '15 days', 795, 3400),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '16 days', 230, 1080),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '17 days', 3513, 15100),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '18 days', 215, 990),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '19 days', 483, 2100),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '20 days', 245, 1150),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '21 days', 4436, 18900),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '22 days', 260, 1200),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '23 days', 595, 2600),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '24 days', 235, 1080),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '25 days', 3925, 16800),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '26 days', 250, 1150),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '27 days', 713, 3100),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '28 days', 220, 1020),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '29 days', 5277, 22100),
('2b791ef7-55c4-4187-aa3a-67574815fb66', CURRENT_DATE - INTERVAL '30 days', 240, 1100);


-- Add latitude and longitude columns to studios table
-- Run this in Supabase SQL Editor

-- Add latitude column
ALTER TABLE public.studios
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);

-- Add longitude column
ALTER TABLE public.studios
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Add comment to columns
COMMENT ON COLUMN public.studios.latitude IS 'Studio latitude coordinate';
COMMENT ON COLUMN public.studios.longitude IS 'Studio longitude coordinate';

-- Update existing studios with Chicago coordinates
-- These match the addresses in the seed data

UPDATE public.studios SET latitude = 41.9342, longitude = -87.6543 WHERE name = 'ZenFlow Yoga Studio';
UPDATE public.studios SET latitude = 41.9250, longitude = -87.6675 WHERE name = 'PowerCycle Studio';
UPDATE public.studios SET latitude = 41.9177, longitude = -87.6503 WHERE name = 'CoreStrength Pilates';
UPDATE public.studios SET latitude = 41.9445, longitude = -87.6638 WHERE name = 'Urban Boxing Club';
UPDATE public.studios SET latitude = 41.9102, longitude = -87.7050 WHERE name = 'Rhythm Dance Collective';
UPDATE public.studios SET latitude = 41.9033, longitude = -87.6795 WHERE name = 'HIIT Factory';
UPDATE public.studios SET latitude = 41.9178, longitude = -87.6518 WHERE name = 'Serenity Barre Studio';
UPDATE public.studios SET latitude = 41.9495, longitude = -87.6638 WHERE name = 'FlowState Yoga & Meditation';
UPDATE public.studios SET latitude = 41.9396, longitude = -87.6832 WHERE name = 'Martial Arts Academy';
UPDATE public.studios SET latitude = 41.9088, longitude = -87.6779 WHERE name = 'The Strength Lab';

-- Verify the updates
SELECT name, latitude, longitude, location
FROM public.studios
ORDER BY name;

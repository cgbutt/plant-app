-- =========================================================================
-- LEAFY PLANT APP: DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Copy and paste this script into your Supabase Dashboard > SQL Editor
-- =========================================================================

-- 1. USER PROFILES TABLE (Auto-created on Supabase auth signup)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"theme": "light", "notifications_enabled": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================================
-- 2. PRIVATE USER PLANTS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  species_id TEXT,
  location TEXT DEFAULT 'Living room',
  age TEXT,
  growth_stage INT NOT NULL DEFAULT 1 CHECK (growth_stage IN (1, 2, 3)),
  growth_stage_label TEXT DEFAULT '02 / Growing',
  watering_time TEXT DEFAULT 'Check in 2 days',
  sunlight TEXT DEFAULT 'Bright, indirect',
  leaf_condition TEXT DEFAULT 'Healthy',
  color TEXT DEFAULT 'Vibrant Green',
  soil_condition TEXT DEFAULT 'Optimal Moisture',
  soil_composition JSONB DEFAULT '["30% Coco Peat", "20% Garden Soil", "50% Normal Soil"]'::jsonb,
  suggestion TEXT,
  date_added TEXT,
  stage1_model TEXT,
  stage2_model TEXT,
  stage3_model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own plants" ON public.plants;
CREATE POLICY "Users can read own plants" ON public.plants
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own plants" ON public.plants;
CREATE POLICY "Users can create own plants" ON public.plants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own plants" ON public.plants;
CREATE POLICY "Users can update own plants" ON public.plants
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own plants" ON public.plants;
CREATE POLICY "Users can delete own plants" ON public.plants
  FOR DELETE USING (auth.uid() = user_id);

-- =========================================================================
-- 3. PRIVATE JOURNAL ENTRIES
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  notes TEXT NOT NULL,
  height_cm NUMERIC,
  leaf_count INT,
  condition TEXT,
  watering TEXT,
  soil_condition TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own journal entries" ON public.journal_entries;
CREATE POLICY "Users can read own journal entries" ON public.journal_entries
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own journal entries" ON public.journal_entries;
CREATE POLICY "Users can create own journal entries" ON public.journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own journal entries" ON public.journal_entries;
CREATE POLICY "Users can update own journal entries" ON public.journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own journal entries" ON public.journal_entries;
CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- =========================================================================
-- 4. PRIVATE PLANT PHOTOS
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.plant_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.plant_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access own photos" ON public.plant_photos;
CREATE POLICY "Users can access own photos" ON public.plant_photos
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- =========================================================================
-- 5. STORAGE BUCKET CONFIGURATION FOR PLANT PHOTOS
-- =========================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('plant-media', 'plant-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Users can upload own media" ON storage.objects;
CREATE POLICY "Users can upload own media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'plant-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Public read for plant media" ON storage.objects;
CREATE POLICY "Public read for plant media" ON storage.objects
  FOR SELECT USING (bucket_id = 'plant-media');

DROP POLICY IF EXISTS "Users can delete own media" ON storage.objects;
CREATE POLICY "Users can delete own media" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'plant-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

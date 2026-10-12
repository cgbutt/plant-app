import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Plant } from '../types/plant';

const SUPABASE_URL_KEY = 'plant_app_supabase_url';
const SUPABASE_KEY_KEY = 'plant_app_supabase_anon_key';

let supabaseInstance: SupabaseClient | null = null;

export class SupabaseService {
  static getCredentials() {
    return {
      url: localStorage.getItem(SUPABASE_URL_KEY) || import.meta.env.VITE_SUPABASE_URL || '',
      key: localStorage.getItem(SUPABASE_KEY_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    };
  }

  static saveCredentials(url: string, key: string) {
    localStorage.setItem(SUPABASE_URL_KEY, url);
    localStorage.setItem(SUPABASE_KEY_KEY, key);
    supabaseInstance = null; // reset client instance
  }

  static getClient(): SupabaseClient | null {
    if (supabaseInstance) return supabaseInstance;

    const { url, key } = this.getCredentials();
    if (url && key) {
      try {
        supabaseInstance = createClient(url, key);
        return supabaseInstance;
      } catch (err) {
        console.warn('Failed to initialize Supabase client:', err);
        return null;
      }
    }
    return null;
  }

  static isConfigured(): boolean {
    const { url, key } = this.getCredentials();
    return Boolean(url && key);
  }

  static async syncPlantsToSupabase(plants: Plant[]): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client.from('plants').upsert(plants, { onConflict: 'id' });
      if (error) {
        console.error('Supabase sync plants error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Supabase sync exception:', err);
      return false;
    }
  }

  static getSqlMigrationScript(): string {
    return `-- ============================================================
-- PLANT APP DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Copy and paste this script into your Supabase SQL Editor
-- ============================================================

-- 1. Create Plants table
CREATE TABLE IF NOT EXISTS public.plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age TEXT NOT NULL,
  leaf_condition TEXT NOT NULL,
  color TEXT NOT NULL,
  soil_condition TEXT NOT NULL,
  watering_time TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  current_stage INT NOT NULL DEFAULT 1 CHECK (current_stage IN (1, 2, 3)),
  stage1_model TEXT,
  stage2_model TEXT,
  stage3_model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Plant Models table (for granular 3D model metadata)
CREATE TABLE IF NOT EXISTS public.plant_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE,
  stage INT NOT NULL CHECK (stage IN (1, 2, 3)),
  model_url TEXT NOT NULL,
  filename TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Plant Photos table
CREATE TABLE IF NOT EXISTS public.plant_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Journal Entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies for plants
CREATE POLICY "Users can view their own plants" ON public.plants
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own plants" ON public.plants
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own plants" ON public.plants
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own plants" ON public.plants
  FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- 7. Create RLS Policies for sub-resources
CREATE POLICY "Users can access their plant models" ON public.plant_models
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.plants WHERE plants.id = plant_models.plant_id AND (plants.user_id = auth.uid() OR plants.user_id IS NULL))
  );

CREATE POLICY "Users can access their plant photos" ON public.plant_photos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.plants WHERE plants.id = plant_photos.plant_id AND (plants.user_id = auth.uid() OR plants.user_id IS NULL))
  );

CREATE POLICY "Users can access their journal entries" ON public.journal_entries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.plants WHERE plants.id = journal_entries.plant_id AND (plants.user_id = auth.uid() OR plants.user_id IS NULL))
  );
`;
  }
}

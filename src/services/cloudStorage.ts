import type { Plant, JournalEntry, PlantPhoto } from '../types/plant';
import { AuthService } from './auth';
import { getAssetUrl } from '../utils/assets';

export class CloudStorageService {
  // Fetch user's private plants from cloud
  static async getPlants(userId: string): Promise<Plant[]> {
    const client = AuthService.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('plants')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user plants:', error);
        return [];
      }

      const defaultModel = getAssetUrl('models/monstera.glb');

      return (data || []).map((row: any) => ({
        id: row.id,
        user_id: row.user_id,
        name: row.name,
        species: row.species,
        species_id: row.species_id || undefined,
        age: row.age || '1 Year',
        location: row.location || 'Living room',
        growth_stage_label: row.growth_stage_label || '02 / Growing',
        current_stage: row.growth_stage || 1,
        watering_time: row.watering_time || 'Check in 2 days',
        sunlight: row.sunlight || 'Bright, indirect',
        leaf_condition: row.leaf_condition || 'Healthy',
        color: row.color || 'Dark Green',
        soil_condition: row.soil_condition || 'Optimal Moisture',
        soil_composition: row.soil_composition || ['30% Coco Peat', '20% Garden Soil', '50% Normal Soil'],
        suggestion: row.suggestion || 'Move closer to indirect light',
        date_added: row.date_added || new Date(row.created_at).toLocaleDateString(),
        stage1_model: row.stage1_model ? getAssetUrl(row.stage1_model) : defaultModel,
        stage2_model: row.stage2_model ? getAssetUrl(row.stage2_model) : defaultModel,
        stage3_model: row.stage3_model ? getAssetUrl(row.stage3_model) : defaultModel,
        created_at: row.created_at,
        updated_at: row.updated_at
      }));
    } catch (err) {
      console.error('CloudStorage exception fetching plants:', err);
      return [];
    }
  }

  // Save or update plant
  static async savePlant(plant: Plant, userId: string): Promise<Plant | null> {
    const client = AuthService.getClient();
    if (!client) return null;

    try {
      const defaultModel = getAssetUrl('models/monstera.glb');
      const payload: any = {
        user_id: userId,
        name: plant.name,
        species: plant.species,
        species_id: plant.species_id || null,
        age: plant.age,
        location: plant.location || 'Living room',
        growth_stage: plant.current_stage || 1,
        growth_stage_label: plant.growth_stage_label || '02 / Growing',
        watering_time: plant.watering_time || 'Check in 2 days',
        sunlight: plant.sunlight || 'Bright, indirect',
        leaf_condition: plant.leaf_condition || 'Healthy',
        color: plant.color || 'Dark Green',
        soil_condition: plant.soil_condition || 'Optimal Moisture',
        soil_composition: plant.soil_composition || ['30% Coco Peat', '20% Garden Soil', '50% Normal Soil'],
        suggestion: plant.suggestion || '',
        date_added: plant.date_added || new Date().toLocaleDateString(),
        stage1_model: plant.stage1_model || defaultModel,
        stage2_model: plant.stage2_model || defaultModel,
        stage3_model: plant.stage3_model || defaultModel,
        updated_at: new Date().toISOString()
      };

      // If valid UUID, include id; otherwise let PostgreSQL generate UUID
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(plant.id);
      if (isUuid) {
        payload.id = plant.id;
      }

      const { data, error } = await client
        .from('plants')
        .upsert(payload)
        .select()
        .single();

      if (error) {
        console.error('Error saving plant to cloud:', error);
        return null;
      }

      return {
        ...plant,
        id: data.id,
        user_id: data.user_id,
        species_id: data.species_id || undefined,
        current_stage: data.growth_stage
      };
    } catch (err) {
      console.error('Exception saving plant to cloud:', err);
      return null;
    }
  }

  // Delete plant
  static async deletePlant(plantId: string, userId: string): Promise<boolean> {
    const client = AuthService.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('plants')
        .delete()
        .eq('id', plantId)
        .eq('user_id', userId);

      return !error;
    } catch {
      return false;
    }
  }

  // Fetch journal entries
  static async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    const client = AuthService.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching journal entries:', error);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        plant_id: row.plant_id,
        user_id: row.user_id,
        date: row.date,
        title: row.title,
        notes: row.notes,
        height_cm: row.height_cm,
        leaf_count: row.leaf_count,
        condition: row.condition,
        watering: row.watering,
        soil_condition: row.soil_condition,
        photo_url: row.photo_url,
        created_at: row.created_at
      }));
    } catch (err) {
      console.error('Exception fetching journal entries:', err);
      return [];
    }
  }

  // Save journal entry
  static async saveJournalEntry(entry: JournalEntry, userId: string): Promise<JournalEntry | null> {
    const client = AuthService.getClient();
    if (!client) return null;

    try {
      const payload: any = {
        user_id: userId,
        plant_id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(entry.plant_id) ? entry.plant_id : null,
        date: entry.date,
        title: entry.title,
        notes: entry.notes,
        height_cm: entry.height_cm,
        leaf_count: entry.leaf_count,
        condition: entry.condition,
        watering: entry.watering,
        soil_condition: entry.soil_condition,
        photo_url: entry.photo_url
      };

      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(entry.id);
      if (isUuid) {
        payload.id = entry.id;
      }

      const { data, error } = await client
        .from('journal_entries')
        .upsert(payload)
        .select()
        .single();

      if (error) {
        console.error('Error saving journal entry:', error);
        return null;
      }

      return {
        ...entry,
        id: data.id,
        user_id: data.user_id,
        created_at: data.created_at
      };
    } catch (err) {
      console.error('Exception saving journal entry:', err);
      return null;
    }
  }

  // Delete journal entry
  static async deleteJournalEntry(entryId: string, userId: string): Promise<boolean> {
    const client = AuthService.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('journal_entries')
        .delete()
        .eq('id', entryId)
        .eq('user_id', userId);

      return !error;
    } catch {
      return false;
    }
  }

  // Fetch photos
  static async getPhotos(userId: string): Promise<PlantPhoto[]> {
    const client = AuthService.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('plant_photos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching plant photos:', error);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        plant_id: row.plant_id,
        image_url: row.image_url,
        caption: row.caption,
        date: row.date,
        created_at: row.created_at
      }));
    } catch (err) {
      console.error('Exception fetching plant photos:', err);
      return [];
    }
  }

  // Upload photo to Supabase storage bucket 'plant-media'
  static async uploadPhoto(file: File, userId: string, plantId: string): Promise<string | null> {
    const client = AuthService.getClient();
    if (!client) return null;

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `${userId}/${plantId}/${fileName}`;

      const { error: uploadError } = await client.storage
        .from('plant-media')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        console.error('Upload photo error:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = client.storage
        .from('plant-media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Exception uploading photo:', err);
      return null;
    }
  }

  // One-click local garden import to cloud account
  static async migrateLocalGarden(
    userId: string,
    localPlants: Plant[],
    localEntries: JournalEntry[]
  ): Promise<{ importedPlants: number; importedEntries: number }> {
    let importedPlants = 0;
    let importedEntries = 0;

    for (const plant of localPlants) {
      const saved = await this.savePlant(plant, userId);
      if (saved) importedPlants++;
    }

    for (const entry of localEntries) {
      const saved = await this.saveJournalEntry(entry, userId);
      if (saved) importedEntries++;
    }

    return { importedPlants, importedEntries };
  }
}

import type { Plant, JournalEntry, PlantPhoto } from '../types/plant';

const STORAGE_KEYS = {
  PLANTS: 'plant_app_plants_v4', // bumped to v4 for ASPER UI layout
  JOURNAL: 'plant_app_journal_v4',
  PHOTOS: 'plant_app_photos_v4',
  MODELS: 'plant_app_models_v4',
  SUPABASE_CONFIG: 'plant_app_supabase_cfg_v1'
};

const DEFAULT_PLANTS: Plant[] = [
  {
    id: 'plant-monstera-1',
    name: 'ASPER',
    species: 'MONSTERA DELICIOSA',
    age: '2 YEARS',
    growth_stage_label: '02 / Growing',
    location: 'Living room',
    last_update: 'Today',
    sunlight: 'Bright, indirect',
    watering_time: 'Check in 2 days',
    soil_composition: ['30% COCO PEAT', '20% GARDEN SOIL', '50% NORMAL SOIL'],
    date_added: 'June 10, 2026',
    leaf_condition: 'Healthy',
    color: 'Dark Green',
    soil_condition: 'Slightly Dry',
    suggestion: 'Move closer to indirect light',
    current_stage: 2,
    stage1_model: '/models/monstera.glb',
    stage2_model: '/models/monstera.glb',
    stage3_model: '/models/monstera.glb',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const DEFAULT_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    plant_id: 'plant-monstera-1',
    date: 'OCTOBER 12, 2026',
    title: 'NEW LEAF FULLY OPENED',
    notes: 'A large fenestrated leaf opened completely today. Stems are rigid and showing vibrant growth.',
    height_cm: 42,
    leaf_count: 8,
    condition: 'Healthy',
    watering: 'Watered 200ml',
    soil_condition: 'Optimal Moisture',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'entry-2',
    plant_id: 'plant-monstera-1',
    date: 'OCTOBER 01, 2026',
    title: 'REPOTTING & SOIL MIX ADJUSTMENT',
    notes: 'Repotted into terracotta vessel with 30% Coco Peat, 20% Garden Soil, and 50% Normal Soil mix.',
    height_cm: 40,
    leaf_count: 7,
    condition: 'Healthy',
    watering: 'Soaked with filtered water',
    soil_condition: 'Moist',
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_PHOTOS: PlantPhoto[] = [
  {
    id: 'photo-1',
    plant_id: 'plant-monstera-1',
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    caption: 'Monstera new fenestrated leaf expanding',
    date: '10 OCT 2026',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export class StorageService {
  static getPlants(): Plant[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PLANTS);
    if (!raw) {
      this.savePlants(DEFAULT_PLANTS);
      return DEFAULT_PLANTS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        this.savePlants(DEFAULT_PLANTS);
        return DEFAULT_PLANTS;
      }
      return parsed;
    } catch {
      return DEFAULT_PLANTS;
    }
  }

  static getRawLocalPlants(): Plant[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PLANTS);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  static isDefaultDemoOnly(plants: Plant[]): boolean {
    if (!plants || plants.length === 0) return true;
    return plants.length === 1 && plants[0].id === 'plant-monstera-1';
  }

  static clearLocalPlants(): void {
    localStorage.removeItem(STORAGE_KEYS.PLANTS);
    localStorage.removeItem(STORAGE_KEYS.JOURNAL);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
  }

  static savePlants(plants: Plant[]): void {
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));
  }

  static updatePlant(updatedPlant: Plant): Plant[] {
    const plants = this.getPlants();
    const index = plants.findIndex(p => p.id === updatedPlant.id);
    let newPlants: Plant[];
    if (index >= 0) {
      newPlants = [...plants];
      newPlants[index] = { ...updatedPlant, updated_at: new Date().toISOString() };
    } else {
      newPlants = [...plants, updatedPlant];
    }
    this.savePlants(newPlants);
    return newPlants;
  }

  static deletePlant(plantId: string): Plant[] {
    const plants = this.getPlants().filter(p => p.id !== plantId);
    this.savePlants(plants);
    return plants;
  }

  static getJournalEntries(plantId?: string): JournalEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    let entries: JournalEntry[] = [];
    if (!raw) {
      entries = DEFAULT_JOURNAL_ENTRIES;
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    } else {
      try {
        entries = JSON.parse(raw);
      } catch {
        entries = DEFAULT_JOURNAL_ENTRIES;
      }
    }
    if (plantId) {
      return entries.filter(e => e.plant_id === plantId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return entries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  static addJournalEntry(entry: Omit<JournalEntry, 'id' | 'created_at'>): JournalEntry {
    const entries = this.getJournalEntries();
    const newEntry: JournalEntry = {
      ...entry,
      id: 'entry-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString()
    };
    const updated = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(updated));
    return newEntry;
  }

  static updateJournalEntry(updatedEntry: JournalEntry): JournalEntry[] {
    const entries = this.getJournalEntries();
    const index = entries.findIndex(e => e.id === updatedEntry.id);
    let updated: JournalEntry[];
    if (index >= 0) {
      updated = [...entries];
      updated[index] = updatedEntry;
    } else {
      updated = [updatedEntry, ...entries];
    }
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(updated));
    return updated;
  }

  static deleteJournalEntry(entryId: string): JournalEntry[] {
    const entries = this.getJournalEntries().filter(e => e.id !== entryId);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    return entries;
  }

  static getPhotos(plantId?: string): PlantPhoto[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    let photos: PlantPhoto[] = [];
    if (!raw) {
      photos = DEFAULT_PHOTOS;
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } else {
      try {
        photos = JSON.parse(raw);
      } catch {
        photos = DEFAULT_PHOTOS;
      }
    }
    if (plantId) {
      return photos.filter(p => p.plant_id === plantId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return photos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  static addPhoto(photo: Omit<PlantPhoto, 'id' | 'created_at'>): PlantPhoto {
    const photos = this.getPhotos();
    const newPhoto: PlantPhoto = {
      ...photo,
      id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString()
    };
    const updated = [newPhoto, ...photos];
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));
    return newPhoto;
  }
}

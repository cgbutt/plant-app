import type { Plant, JournalEntry, PlantPhoto } from '../types/plant';

const STORAGE_KEYS = {
  PLANTS: 'plant_app_plants_v6', // v6 for 5 reference plants
  JOURNAL: 'plant_app_journal_v6',
  PHOTOS: 'plant_app_photos_v6',
  MODELS: 'plant_app_models_v6',
  SUPABASE_CONFIG: 'plant_app_supabase_cfg_v1',
  OWNER_NAME: 'plant_app_owner_name'
};

const DEFAULT_PLANTS: Plant[] = [
  {
    id: 'plant-pothos-1',
    name: 'Asper',
    species: 'Pothos',
    species_id: 'golden-pothos',
    age: '02 Years',
    birth_date: '2024-03-12',
    growth_stage_label: '02 / Growing',
    location: 'Living room',
    last_update: 'Today',
    sunlight: 'Bright, indirect',
    watering_time: 'Check in 2 days',
    soil_composition: ['30% COCO PEAT', '20% GARDEN SOIL', '50% NORMAL SOIL'],
    date_added: 'June 10, 2026',
    leaf_condition: 'Healthy',
    color: '#BFC6C4',
    card_color: '#BFC6C4',
    image_cutout: '/plants/asper-pothos.png',
    soil_condition: 'Slightly Dry',
    suggestion: 'Water when top 2 inches feel dry',
    current_stage: 2,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'plant-monstera-2',
    name: 'Monsty',
    species: 'Monstera Deliciosa',
    species_id: 'monstera-deliciosa',
    age: '02 Years',
    birth_date: '2024-05-18',
    growth_stage_label: '02 / Growing',
    location: 'Balcony corner',
    last_update: 'Yesterday',
    sunlight: 'Bright, indirect',
    watering_time: 'Check in 4 days',
    soil_composition: ['40% ORCHID BARK', '30% POTTING SOIL', '30% PERLITE'],
    date_added: 'March 15, 2025',
    leaf_condition: 'Lush fenestrations',
    color: '#F4CF6A',
    card_color: '#F4CF6A',
    image_cutout: '/plants/monstera.png',
    soil_condition: 'Optimal Moisture',
    suggestion: 'Wipe broad leaves with damp cloth',
    current_stage: 2,
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'plant-spider-3',
    name: 'Monsty',
    species: 'Chlorophytum comosum',
    species_id: 'spider-plant',
    age: '03 Years',
    birth_date: '2023-08-20',
    growth_stage_label: '03 / Mature',
    location: 'Bedroom shelf',
    last_update: '3 days ago',
    sunlight: 'Medium indirect',
    watering_time: 'Check in 3 days',
    soil_composition: ['50% PEAT MOSS', '50% PERLITE'],
    date_added: 'August 22, 2024',
    leaf_condition: 'Crisp & arching',
    color: '#708C5B',
    card_color: '#708C5B',
    image_cutout: '/plants/spider-plant.png',
    soil_condition: 'Dry',
    suggestion: 'Rotate pot for balanced arching',
    current_stage: 3,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'plant-calathea-4',
    name: 'Monsty',
    species: 'Calathea Roseopicta',
    species_id: 'calathea',
    age: '03 Years',
    birth_date: '2023-04-10',
    growth_stage_label: '03 / Mature',
    location: 'Office desk',
    last_update: 'Today',
    sunlight: 'Filtered shadow',
    watering_time: 'Check in 1 day',
    soil_composition: ['50% PEAT', '30% PERLITE', '20% COMPOST'],
    date_added: 'January 10, 2024',
    leaf_condition: 'Deep pink underside',
    color: '#FF9D9D',
    card_color: '#FF9D9D',
    image_cutout: '/plants/golden-pothos.png',
    soil_condition: 'Moist',
    suggestion: 'Maintain humidity above 55%',
    current_stage: 3,
    created_at: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'plant-miles-5',
    name: 'Miles',
    species: 'Chlorophytum comosum',
    species_id: 'spider-plant',
    age: '02 Years',
    birth_date: '2024-06-15',
    growth_stage_label: '02 / Growing',
    location: 'Study desk',
    last_update: '4 days ago',
    sunlight: 'Bright indirect',
    watering_time: 'Check in 3 days',
    soil_composition: ['40% POTTING SOIL', '30% PERLITE', '30% PEAT'],
    date_added: 'May 14, 2024',
    leaf_condition: 'Arching variegated foliage',
    color: '#6B735C',
    card_color: '#6B735C',
    image_cutout: '/plants/spider-plant.png',
    soil_condition: 'Slightly Dry',
    suggestion: 'Mist weekly for healthy leaf tips',
    current_stage: 2,
    created_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
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
      // Backfill birth_date if existing stored plant doesn't have it
      let modified = false;
      parsed.forEach((p: Plant) => {
        if (!p.birth_date) {
          const def = DEFAULT_PLANTS.find(d => d.id === p.id);
          if (def && def.birth_date) {
            p.birth_date = def.birth_date;
            modified = true;
          } else if (p.id === 'plant-pothos-1') {
            p.birth_date = '2024-03-12';
            modified = true;
          }
        }
      });
      if (modified) {
        this.savePlants(parsed);
      }
      return parsed;
    } catch {
      return DEFAULT_PLANTS;
    }
  }

  static getOwnerName(): string {
    const stored = localStorage.getItem(STORAGE_KEYS.OWNER_NAME);
    return stored ? stored.trim() : 'Kanak';
  }

  static setOwnerName(name: string): string {
    const clean = (name || '').trim();
    const finalName = clean || 'Kanak';
    localStorage.setItem(STORAGE_KEYS.OWNER_NAME, finalName);
    return finalName;
  }

  static updatePlantAge(plantId: string, age: string, birthDate?: string): Plant[] {
    const plants = this.getPlants();
    const index = plants.findIndex(p => p.id === plantId);
    if (index >= 0) {
      const updated = {
        ...plants[index],
        age,
        birth_date: birthDate !== undefined ? birthDate : plants[index].birth_date,
        updated_at: new Date().toISOString()
      };
      return this.updatePlant(updated);
    }
    return plants;
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
    return plants.every((p) => p.id.startsWith('plant-pothos-1') || p.id.startsWith('plant-monstera-') || p.id.startsWith('plant-spider-') || p.id.startsWith('plant-calathea-'));
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

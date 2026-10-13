export type GrowthStage = 1 | 2 | 3;

export interface PlantModel {
  id: string;
  plant_id: string;
  stage: GrowthStage;
  model_url: string; // GLB/GLTF URL (blob:, http:, data:)
  filename?: string;
  updated_at: string;
}

export interface PlantPhoto {
  id: string;
  plant_id: string;
  image_url: string;
  caption?: string;
  date: string; // ISO date string or formatted date
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id?: string;
  plant_id: string;
  date: string;
  title: string;
  notes: string;
  height_cm?: number;
  leaf_count?: number;
  condition?: string;
  watering?: string;
  soil_condition?: string;
  photo_url?: string;
  created_at: string;
}

export interface Plant {
  id: string;
  user_id?: string;
  name: string;
  species: string;
  species_id?: string;
  age: string;
  leaf_condition: string;
  color: string;
  soil_condition: string;
  watering_time: string;
  suggestion: string;
  current_stage: GrowthStage;
  
  // ASPER UI specific fields
  date_added?: string;
  location?: string;
  sunlight?: string;
  last_update?: string;
  growth_stage_label?: string;
  soil_composition?: string[];

  // Model URLs for each of the 3 stages
  stage1_model?: string;
  stage2_model?: string;
  stage3_model?: string;

  // Metadata
  created_at: string;
  updated_at: string;
}

export interface AiAnalysisInput {
  plant: Plant;
  latestPhoto?: PlantPhoto;
  journalEntries: JournalEntry[];
}

export interface AiAnalysisOutput {
  leaf_condition: string;
  color: string;
  soil_condition: string;
  watering_time: string;
  suggestion: string;
  confidence: number;
  analysis_summary: string;
  recommendations: string[];
}

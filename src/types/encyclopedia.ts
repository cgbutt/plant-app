export type PlantCategory =
  | 'All Plants'
  | 'Indoor Plants'
  | 'Outdoor Plants'
  | 'Succulents & Cacti'
  | 'Tropical Plants'
  | 'Flowering Plants'
  | 'Herbs'
  | 'Climbers & Vines';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Advanced';
export type GrowthRate = 'Slow' | 'Moderate' | 'Fast' | 'Slow to Moderate';

export interface CareGuideSections {
  watering_guide: string;
  light_placement: string;
  soil_repotting: string;
  fertilizing_nutrition: string;
  propagation: string;
  pruning_maintenance: string;
  pests_diseases: string;
  problems_solutions: string;
  seasonal_care: string;
  pet_toxicity: string;
}

export interface EncyclopediaPlant {
  id: string; // unique slug e.g. 'snake-plant'
  common_name: string;
  scientific_name: string;
  alternative_names: string;
  alternative_names_list?: string[];
  category: PlantCategory;
  category_tags: string[];
  short_description: string;
  full_description: string;
  image_url: string;

  // Care Quick Specs
  difficulty: DifficultyLevel;
  difficulty_label: string; // e.g. 'Beginner Friendly'
  growth_rate: GrowthRate;
  max_size: string; // e.g. '30–120 cm'
  native_region: string;
  indoor_suitable: boolean;
  pet_toxic: boolean;
  pet_toxicity_note: string;

  // Metric Care Cards
  light: {
    summary: string; // e.g. 'Low to bright indirect light'
    level_icon_type: 'low' | 'medium' | 'bright_indirect' | 'direct';
    details: string;
  };
  watering: {
    summary: string; // e.g. 'Once every 2–3 weeks'
    water_drops: number; // 1 to 4 drops filled
    frequency_label: string;
    details: string;
    warning: string;
  };
  temperature: {
    summary: string; // e.g. '18°C to 32°C'
    range_celsius: string;
    details: string;
  };
  humidity: {
    summary: string; // e.g. '40% to 60%'
    details: string;
  };
  soil: {
    summary: string; // e.g. 'Well-draining succulent / potting mix'
    drainage: string;
    details: string;
  };
  fertilizer: {
    summary: string; // e.g. 'Once every 2–3 months'
    feeding_season: string;
    details: string;
  };
  repotting: {
    summary: string; // e.g. 'Every 2–3 years'
    details: string;
  };

  // Detailed 10 Collapsible Guides
  guides: CareGuideSections;
}

import type { Plant } from '../types/plant';

export interface CardTheme {
  bg: string;
  text: string;
  speciesColor: string;
  darkCircle: string;
  lightCircle: string;
  shapeStyle?: 'circles' | 'triangles' | 'tilted-card';
}

export const CARD_PALETTES: CardTheme[] = [
  {
    bg: '#BFC6C4', // Muted Gray-Green (Card 01 Asper) - exact sampled
    text: '#000000',
    speciesColor: '#68736B',
    darkCircle: '#40513B',
    lightCircle: '#EFF1EF',
    shapeStyle: 'circles'
  },
  {
    bg: '#F4CF6A', // Mustard Yellow (Card 02 Monsty) - exact sampled
    text: '#000000',
    speciesColor: '#7A6216',
    darkCircle: '#40513B',
    lightCircle: '#EFF1EF',
    shapeStyle: 'triangles'
  },
  {
    bg: '#708C5B', // Sage Green (Card 03 Monsty) - exact sampled
    text: '#000000',
    speciesColor: '#2D3C23',
    darkCircle: '#2B3822',
    lightCircle: '#EFF1EF',
    shapeStyle: 'circles'
  },
  {
    bg: '#FF9D9D', // Pastel Pink (Card 04 Monsty) - exact sampled
    text: '#000000',
    speciesColor: '#854B4B',
    darkCircle: '#40513B',
    lightCircle: '#EFF1EF',
    shapeStyle: 'circles'
  },
  {
    bg: '#6B735C', // Olive Green (Card 05 Miles Spider Plant) - exact sampled
    text: '#000000',
    speciesColor: '#3A422D',
    darkCircle: '#DEE5A8',
    lightCircle: '#EFF1EF',
    shapeStyle: 'tilted-card'
  }
];

export function getCardTheme(index: number, customColor?: string): CardTheme {
  if (customColor) {
    const matched = CARD_PALETTES.find((p) => p.bg.toLowerCase() === customColor.toLowerCase());
    if (matched) return matched;
  }
  return CARD_PALETTES[index % CARD_PALETTES.length];
}

export function formatIndexNumber(idx: number): string {
  const num = idx + 1;
  return num < 10 ? `0${num}` : `${num}`;
}

export function getPlantCutoutUrl(plant: Plant): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  if (plant.image_cutout) {
    const raw = plant.image_cutout;
    if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('blob:') || raw.startsWith('data:')) {
      return raw;
    }
    return raw.startsWith('/') ? `${cleanBase}${raw.slice(1)}` : `${cleanBase}${raw}`;
  }

  const name = (plant.name || '').toLowerCase();
  const species = (plant.species || '').toLowerCase();
  const speciesId = (plant.species_id || '').toLowerCase();

  if (name.includes('asper') || species.includes('pothos') || speciesId.includes('pothos')) {
    return `${cleanBase}plants/asper-pothos.png`;
  }
  if (name.includes('monst') || species.includes('monstera') || speciesId.includes('monstera')) {
    return `${cleanBase}plants/monstera.png`;
  }
  if (name.includes('spider') || species.includes('spider') || species.includes('chlorophytum') || name.includes('miles')) {
    return `${cleanBase}plants/spider-plant.png`;
  }
  if (name.includes('pink') || name.includes('calathea') || species.includes('calathea')) {
    return `${cleanBase}plants/golden-pothos.png`;
  }
  return `${cleanBase}plants/asper-pothos.png`;
}

import React from 'react';
import {
  ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronRight,
  Droplets, HeartPulse, Leaf, Plus, ScanLine, Sprout, ThermometerSun
} from 'lucide-react';
import type { JournalEntry, Plant, PlantPhoto } from '../../types/plant';
import './leafy-dashboard.css';

type DashboardProps = {
  plants: Plant[];
  journalEntries: JournalEntry[];
  photos: PlantPhoto[];
  selectedPlantId: string;
  userDisplayName?: string;
  userAvatarUrl?: string;
  onSelectPlant: (plant: Plant) => void;
  onOpenPlantDetail: (plant: Plant) => void;
  onOpenAddPlant: () => void;
  onOpenJournal: () => void;
  onOpenExplore: () => void;
  onOpenProfile: () => void;
  onOpenAi: () => void;
  onOpenMyPlants: () => void;
};

const fallbackImages = {
  snake: 'https://images.unsplash.com/photo-1593482874117-89e9f285b682?auto=format&fit=crop&w=640&q=80',
  pothos: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=640&q=80',
  lily: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=640&q=80',
  other: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=640&q=80'
};

const needsLeafCheck = (value: string) => /yellow|brown|droop|wilt|spot|pest|sick|unhealthy|rot|damage|dry/i.test(value);
const needsWaterCheck = (value: string) => /today|tomorrow|soon|overdue|check|water|dry/i.test(value);

function photoForPlant(plant: Plant, photos: PlantPhoto[]): string {
  const matchedPhoto = photos.filter((photo) => photo.plant_id === plant.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
  if (matchedPhoto?.image_url) return matchedPhoto.image_url;
  const species = (plant.species + ' ' + plant.name).toLowerCase();
  if (species.includes('snake') || species.includes('sansevieria')) return fallbackImages.snake;
  if (species.includes('pothos') || species.includes('epipremnum')) return fallbackImages.pothos;
  if (species.includes('lily')) return fallbackImages.lily;
  return fallbackImages.other;
}

export const LeafyDashboard: React.FC<DashboardProps> = ({
  plants, journalEntries, photos, selectedPlantId, userDisplayName, userAvatarUrl,
  onSelectPlant, onOpenPlantDetail, onOpenAddPlant, onOpenJournal,
  onOpenExplore, onOpenProfile, onOpenAi, onOpenMyPlants
}) => {
  const firstName = userDisplayName?.trim().split(/\s+/)[0] || 'there';
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const issuePlants = plants.filter((p) => needsLeafCheck(p.leaf_condition || ''));
  const waterPlants = plants.filter((p) => needsWaterCheck(p.watering_time || ''));
  const careItems = [
    ...issuePlants.map((plant) => ({ plant, kind: 'health' as const })),
    ...waterPlants.filter((plant) => !issuePlants.some((p) => p.id === plant.id))
      .map((plant) => ({ plant, kind: 'water' as const }))
  ].slice(0, 3);

  const openPlant = (plant: Plant) => {
    onSelectPlant(plant);
    onOpenPlantDetail(plant);
  };

  return (
    <section className="leafy-dashboard" aria-label="My garden dashboard">
      <div className="leafy-dashboard__utility">
        <div className="leafy-dashboard__eyebrow"><Leaf size={14} strokeWidth={2} /> YOUR LITTLE GARDEN</div>
        <button type="button" className="leafy-dashboard__text-link" onClick={onOpenMyPlants}>
          My Plants <ArrowUpRight size={15} />
        </button>
      </div>

      <header className="leafy-dashboard__welcome">
        <div className="leafy-dashboard__welcome-copy">
          <button type="button" className="leafy-dashboard__avatar" onClick={onOpenProfile} aria-label="Open profile">
            {userAvatarUrl ? <img src={userAvatarUrl} alt="" /> : <Sprout size={25} strokeWidth={1.7} />}
          </button>
          <div>
            <h1>Hi, {firstName}! <span aria-hidden="true">✳</span></h1>
            <p>Your garden is growing, one leaf at a time.</p>
          </div>
        </div>
        <button type="button" className="leafy-dashboard__date" onClick={onOpenJournal} aria-label={'Open journal, ' + today}>
          <CalendarDays size={18} /> <span>{today}</span>
          {journalEntries.length > 0 && <span className="leafy-dashboard__date-dot" aria-hidden="true" />}
        </button>
      </header>

      <div className="leafy-dashboard__overview" aria-label="Garden overview">
        <button type="button" className={'leafy-dashboard__metric leafy-dashboard__metric--health' + (issuePlants.length ? ' is-alert' : '')} onClick={issuePlants.length ? onOpenAi : onOpenMyPlants}>
          <span className="leafy-dashboard__metric-icon"><HeartPulse size={23} strokeWidth={1.8} /></span>
          <span className="leafy-dashboard__metric-primary">{issuePlants.length ? issuePlants.length + ' to check' : 'All clear'}</span>
          <span className="leafy-dashboard__metric-heading">Plant health</span>
          <span className="leafy-dashboard__metric-foot">{issuePlants.length ? 'A plant may need your attention' : 'No leaf issues reported'} <ArrowUpRight size={15} /></span>
        </button>
        <div className="leafy-dashboard__metric leafy-dashboard__metric--climate" aria-label="Room climate readings unavailable">
          <span className="leafy-dashboard__metric-icon"><ThermometerSun size={25} strokeWidth={1.8} /></span>
          <span className="leafy-dashboard__metric-primary">—°</span>
          <span className="leafy-dashboard__metric-heading">Temperature</span>
          <span className="leafy-dashboard__metric-foot">No room sensor connected</span>
        </div>
      </div>

      <div className="leafy-dashboard__mini-stats">
        <button type="button" onClick={onOpenMyPlants}><Sprout size={17} /><span>My plants</span><strong>{plants.length.toString().padStart(2, '0')}</strong></button>
        <button type="button" onClick={onOpenJournal}><BookOpen size={17} /><span>Journal logs</span><strong>{journalEntries.length.toString().padStart(2, '0')}</strong></button>
      </div>

      <section className="leafy-dashboard__section" aria-labelledby="leafy-timely-title">
        <div className="leafy-dashboard__section-heading">
          <div><span className="leafy-dashboard__kicker">A LITTLE LOVE GOES A LONG WAY</span><h2 id="leafy-timely-title">Timely Care <span className="leafy-dashboard__heading-sparkle" aria-hidden="true">✳</span></h2></div>
          {careItems.length > 0 && <span className="leafy-dashboard__count">{careItems.length} to review</span>}
        </div>
        <div className="leafy-dashboard__care-list">
          {careItems.length > 0 ? careItems.map(({ plant, kind }) => (
            <button type="button" key={plant.id} className="leafy-dashboard__care-card" onClick={() => kind === 'health' ? onOpenAi() : openPlant(plant)}>
              <img className="leafy-dashboard__care-image" src={photoForPlant(plant, photos)} alt="" loading="lazy" />
              <span className="leafy-dashboard__care-copy">
                <span className="leafy-dashboard__care-label">{plant.name} <Check size={12} /></span>
                <span className="leafy-dashboard__care-title">{kind === 'health' ? 'Time to check those leaves' : 'A little water check-in'}</span>
                <span className="leafy-dashboard__care-subtitle">{kind === 'health' ? plant.leaf_condition : plant.watering_time}</span>
              </span>
              <span className="leafy-dashboard__care-action">{kind === 'health' ? <ScanLine size={20} /> : <Droplets size={20} />}</span>
            </button>
          )) : (
            <div className="leafy-dashboard__care-empty">
              <span className="leafy-dashboard__care-empty-icon"><Check size={20} /></span>
              <div><strong>{plants.length ? 'All caught up!' : 'Your care journey starts here'}</strong><p>{plants.length ? 'No care reminders from your saved plant details.' : 'Add a plant to start tracking care and growth.'}</p></div>
              <button type="button" aria-label={plants.length ? 'Browse plant care guides' : 'Add your first plant'} onClick={plants.length ? onOpenExplore : onOpenAddPlant}><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
      </section>

      <section className="leafy-dashboard__section leafy-dashboard__section--today" aria-labelledby="leafy-today-title">
        <div className="leafy-dashboard__section-heading">
          <div><span className="leafy-dashboard__kicker">THE GREEN CORNER</span><h2 id="leafy-today-title">Today, {today}</h2></div>
          <button type="button" className="leafy-dashboard__text-link" onClick={onOpenMyPlants}>View all <ArrowRight size={16} /></button>
        </div>
        <div className="leafy-dashboard__plant-strip">
          {plants.map((plant) => (
            <button type="button" className={'leafy-dashboard__plant-card' + (selectedPlantId === plant.id ? ' is-selected' : '')} key={plant.id} onClick={() => openPlant(plant)}>
              <span className="leafy-dashboard__plant-image"><img src={photoForPlant(plant, photos)} alt={plant.name} loading="lazy" /><span className="leafy-dashboard__plant-water"><Droplets size={17} /></span></span>
              <span className="leafy-dashboard__plant-name">{plant.name}</span>
              <span className="leafy-dashboard__plant-species">{plant.location || plant.species}</span>
            </button>
          ))}
          <button type="button" className="leafy-dashboard__add-card" onClick={onOpenAddPlant}>
            <span><Plus size={25} /></span><strong>Add a plant</strong><small>Grow your collection</small>
          </button>
        </div>
      </section>

      <button type="button" className="leafy-dashboard__journal-prompt" onClick={onOpenJournal}>
        <span className="leafy-dashboard__journal-icon"><BookOpen size={20} /></span>
        <span><strong>Every leaf has a story.</strong><small>Capture a little moment in your plant journal</small></span>
        <ArrowUpRight size={19} />
      </button>
    </section>
  );
};

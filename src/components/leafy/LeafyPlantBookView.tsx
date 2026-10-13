import React, { useState, useMemo } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import { PLANT_ENCYCLOPEDIA } from '../../data/plantEncyclopedia';
import { PlantImage } from '../plantbook/PlantImage';

interface LeafyPlantBookViewProps {
  onSelectPlant: (plant: EncyclopediaPlant) => void;
  onOpenMenu: () => void;
  isPhonePreview?: boolean;
}

type LeafyCategoryFilter =
  | 'All'
  | 'Indoor'
  | 'Outdoor'
  | 'Low Light'
  | 'Succulents'
  | 'Tropical'
  | 'Pet Friendly';

const CATEGORIES: LeafyCategoryFilter[] = [
  'All',
  'Indoor',
  'Outdoor',
  'Low Light',
  'Succulents',
  'Tropical',
  'Pet Friendly'
];

const FAVORITES_STORAGE_KEY = 'leafy_favorite_plants_v1';

export const LeafyPlantBookView: React.FC<LeafyPlantBookViewProps> = ({
  onSelectPlant,
  onOpenMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LeafyCategoryFilter>('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (e: React.MouseEvent, plantId: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filter & Search Logic
  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PLANT_ENCYCLOPEDIA.filter((plant) => {
      // 1. Category filter
      if (selectedCategory === 'Indoor' && !plant.indoor_suitable) return false;
      if (selectedCategory === 'Outdoor' && plant.category !== 'Outdoor Plants') return false;
      if (
        selectedCategory === 'Low Light' &&
        !plant.light.summary.toLowerCase().includes('low') &&
        plant.light.level_icon_type !== 'low'
      )
        return false;
      if (
        selectedCategory === 'Succulents' &&
        plant.category !== 'Succulents & Cacti' &&
        !plant.category_tags.some((t) => t.toLowerCase().includes('succulent'))
      )
        return false;
      if (
        selectedCategory === 'Tropical' &&
        plant.category !== 'Tropical Plants' &&
        !plant.category_tags.some((t) => t.toLowerCase().includes('tropical'))
      )
        return false;
      if (selectedCategory === 'Pet Friendly' && plant.pet_toxic) return false;

      // 2. Search query filter
      if (!query) return true;

      const inCommon = plant.common_name.toLowerCase().includes(query);
      const inScientific = plant.scientific_name.toLowerCase().includes(query);
      const inAlt = (plant.alternative_names || '').toLowerCase().includes(query);
      const inTags = plant.category_tags.some((tag) => tag.toLowerCase().includes(query));

      return inCommon || inScientific || inAlt || inTags;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="leafy-plantbook-screen">
      {/* Mobile Top Row: Menu & Search */}
      <div className="leafy-mobile-top-row">
        <button
          className="leafy-grid-menu-btn"
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
        >
          <div className="grid-dots-icon">
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
          </div>
        </button>

        <button
          className="leafy-header-icon-btn"
          aria-label="Filter"
          onClick={() => {
            const nextIdx = (CATEGORIES.indexOf(selectedCategory) + 1) % CATEGORIES.length;
            setSelectedCategory(CATEGORIES[nextIdx]);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="leafy-plantbook-header">
        <h1 className="leafy-plantbook-title">Plant Book</h1>
        <p className="leafy-plantbook-subtitle">
          Discover, learn and grow a happier plant collection.
        </p>

        {/* Large Rounded Search Bar */}
        <div className="leafy-search-box">
          <span className="leafy-search-leading-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>

          <input
            type="text"
            className="leafy-search-input"
            placeholder="Search plants, e.g. Monstera..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery ? (
            <button
              className="leafy-search-trailing-icon"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          ) : (
            <div className="leafy-search-trailing-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"/>
                <line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/>
                <line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="1" y1="14" x2="7" y2="14"/>
                <line x1="9" y1="8" x2="15" y2="8"/>
                <line x1="17" y1="16" x2="23" y2="16"/>
              </svg>
            </div>
          )}
        </div>

        {/* Category Pills (Matching Reference Screen 2) */}
        <div className="leafy-pill-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`leafy-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid on Mobile / Multi-column on Desktop */}
      {filteredPlants.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            marginTop: '20px'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌱</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
            No plants found
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 16px 0' }}>
            Try searching for another plant species or reset filters.
          </p>
          <button
            className="leafy-btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="leafy-encyclopedia-grid">
          {filteredPlants.map((plant, idx) => {
            const isFav = favorites.includes(plant.id);
            const pastelBgClass =
              idx % 3 === 0
                ? 'var(--matcha-soft)'
                : idx % 3 === 1
                ? 'var(--sage-light)'
                : 'var(--sandy-beige)';

            return (
              <div
                key={plant.id}
                className="leafy-encyclopedia-card"
                onClick={() => onSelectPlant(plant)}
              >
                {/* Image wrapper with organic curved pastel shape and favorite heart */}
                <div className="card-img-wrapper">
                  <div
                    className="leafy-card-circle-bg"
                    style={{ background: pastelBgClass }}
                  />

                  <PlantImage
                    src={plant.image_url}
                    alt={plant.common_name}
                    category={plant.category}
                    className="organic-plant-img"
                  />

                  {/* Favorite Heart Button */}
                  <button
                    className="leafy-card-heart-btn"
                    onClick={(e) => toggleFavorite(e, plant.id)}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    title={isFav ? 'Favorited' : 'Favorite'}
                  >
                    {isFav ? (
                      <span style={{ color: '#e11d48' }}>♥</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>♡</span>
                    )}
                  </button>
                </div>

                {/* Common Name & Scientific Name */}
                <h3 className="card-title">{plant.common_name}</h3>
                <div className="card-scientific">{plant.scientific_name}</div>

                {/* Category tag & Care Indicators matching Reference Sheet */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {plant.indoor_suitable ? 'Indoor' : plant.category.split(' ')[0]}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span title="Sunlight" style={{ color: 'var(--yellow-warm)', fontSize: '12px' }}>☀️</span>
                    <span title="Water requirement" style={{ color: 'var(--sky-blue)', fontSize: '12px' }}>💧</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

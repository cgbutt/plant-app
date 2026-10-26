import React, { useState, useMemo } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import { PLANT_ENCYCLOPEDIA } from '../../data/plantEncyclopedia';

export interface LeafyPlantBookScreenProps {
  onBack: () => void;
  onSelectPlant: (plant: EncyclopediaPlant) => void;
  onAddToGarden: (plant: EncyclopediaPlant) => void;
}

export const LeafyPlantBookScreen: React.FC<LeafyPlantBookScreenProps> = ({
  onBack,
  onSelectPlant,
  onAddToGarden
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Indoor' | 'Low Light' | 'Succulents'>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLANT_ENCYCLOPEDIA.filter((p) => {
      if (category === 'Indoor' && !p.indoor_suitable) return false;
      if (category === 'Low Light' && !p.light.summary.toLowerCase().includes('low')) return false;
      if (category === 'Succulents' && !p.category.toLowerCase().includes('succulent')) return false;
      if (!q) return true;
      return (
        p.common_name.toLowerCase().includes(q) ||
        p.scientific_name.toLowerCase().includes(q) ||
        (p.alternative_names || '').toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="leafy-plantbook-container">
      {/* Top Header */}
      <div className="leafy-plantbook-top-header">
        <button
          onClick={onBack}
          className="leafy-plantbook-back-btn"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className="leafy-plantbook-title">Plant Book</h2>
        <div style={{ width: 36 }} />
      </div>

      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search 100+ species, light, care..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="leafy-search-input-pill"
      />

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {(['All', 'Indoor', 'Low Light', 'Succulents'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              background: category === cat ? '#242F21' : '#FFFFFF',
              color: category === cat ? '#FFFFFF' : '#4B5563',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Plants List */}
      <div className="leafy-book-cards-grid">
        {filtered.map((plant) => (
          <div
            key={plant.id}
            className="leafy-book-card-item"
            onClick={() => onSelectPlant(plant)}
          >
            <img
              src={plant.image_url}
              alt={plant.common_name}
              className="leafy-book-thumb"
              loading="lazy"
            />
            <div className="leafy-book-info">
              <h4 className="leafy-book-plant-name">{plant.common_name}</h4>
              <span className="leafy-book-plant-species">{plant.scientific_name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToGarden(plant);
              }}
              style={{
                background: '#708C5B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

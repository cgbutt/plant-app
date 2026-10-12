import React, { useState } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import { PlantEncyclopediaService } from '../../data/plantEncyclopedia';
import { PlantImage } from './PlantImage';

interface PlantDetailViewProps {
  plant: EncyclopediaPlant;
  onBack: () => void;
  onAddToGarden: (plant: EncyclopediaPlant) => void;
}

export const PlantDetailView: React.FC<PlantDetailViewProps> = ({
  plant,
  onBack,
  onAddToGarden
}) => {
  const [isFavorite, setIsFavorite] = useState(PlantEncyclopediaService.isFavorite(plant.id));
  const [copiedToast, setCopiedToast] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('watering_guide');
  const [expandedCareItem, setExpandedCareItem] = useState<string | null>(null);

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = PlantEncyclopediaService.toggleFavorite(plant.id);
    setIsFavorite(next);
  };

  const handleShare = () => {
    const url = window.location.origin + window.location.pathname + '#/plant-book/' + plant.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSection(prev => prev === sectionKey ? null : sectionKey);
  };

  const toggleCareItem = (itemKey: string) => {
    setExpandedCareItem(prev => prev === itemKey ? null : itemKey);
  };

  const collapsibleGuides = [
    { key: 'watering_guide', title: 'Watering Guide', icon: '💧', content: plant.guides.watering_guide },
    { key: 'light_placement', title: 'Light & Placement', icon: '☀️', content: plant.guides.light_placement },
    { key: 'soil_repotting', title: 'Soil & Repotting', icon: '🌱', content: plant.guides.soil_repotting },
    { key: 'fertilizing_nutrition', title: 'Fertilizing & Nutrition', icon: '🌿', content: plant.guides.fertilizing_nutrition },
    { key: 'propagation', title: 'Propagation Methods', icon: '✂️', content: plant.guides.propagation },
    { key: 'pruning_maintenance', title: 'Pruning & Maintenance', icon: '🪴', content: plant.guides.pruning_maintenance },
    { key: 'pests_diseases', title: 'Common Pests & Diseases', icon: '🐛', content: plant.guides.pests_diseases },
    { key: 'problems_solutions', title: 'Common Problems & Solutions', icon: '🩺', content: plant.guides.problems_solutions },
    { key: 'seasonal_care', title: 'Seasonal Care Guidelines', icon: '🍂', content: plant.guides.seasonal_care },
    { key: 'pet_toxicity', title: 'Pet Toxicity & Safety', icon: '🐾', content: plant.guides.pet_toxicity }
  ];

  return (
    <div className="plant-detail-page">
      {/* Toast */}
      {copiedToast && (
        <div className="plant-detail-toast">
          ✓ Link copied to clipboard!
        </div>
      )}

      {/* Top Botanical Green Hero Section */}
      <div className="plant-detail-hero">
        <div className="plant-detail-top-nav">
          <button className="back-circle-btn" onClick={onBack} title="Back to Plant Book">
            ←
          </button>
          <div className="top-nav-actions">
            <button className="action-circle-btn" onClick={handleShare} title="Share Plant Link">
              🔗
            </button>
            <button
              className={`action-circle-btn fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFav}
              title="Add to Favorites"
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <div className="plant-detail-header-content">
          <div className="plant-header-text">
            <h1 className="detail-plant-name">{plant.common_name}</h1>
            <p className="detail-scientific-name">{plant.scientific_name}</p>

            <div className="detail-key-attributes">
              <div className="attribute-row">
                <span className="attr-icon">🌱</span>
                <span>{plant.category}</span>
              </div>
              <div className="attribute-row">
                <span className="attr-icon">📶</span>
                <span>{plant.difficulty_label}</span>
              </div>
              <div className="attribute-row">
                <span className="attr-icon">📍</span>
                <span>{plant.native_region}</span>
              </div>
            </div>
          </div>

          <div className="plant-header-image-container">
            <PlantImage
              src={plant.image_url}
              alt={plant.common_name}
              className="detail-hero-plant-img"
              category={plant.category}
            />
          </div>
        </div>
      </div>

      {/* Sliding White Plant Care Sheet */}
      <div className="plant-care-sheet">
        <div className="care-sheet-grabber"></div>

        <div className="care-sheet-header">
          <h2 className="care-sheet-title">Plant care</h2>
          <span className="care-sheet-sub">Horticultural Care & Growth Guide</span>
        </div>

        {/* 5 Quick Care Overview Cards (Interactive/Expandable) */}
        <div className="quick-care-list">
          {/* 1. Watering */}
          <div
            className={`quick-care-item ${expandedCareItem === 'watering' ? 'expanded' : ''}`}
            onClick={() => toggleCareItem('watering')}
          >
            <div className="care-item-left">
              <div className="care-item-icon-box water">
                💧
              </div>
              <div className="care-item-text">
                <div className="care-item-label">Watering</div>
                <div className="care-item-value">{plant.watering.summary}</div>
              </div>
            </div>
            <span className="care-item-chevron">{expandedCareItem === 'watering' ? '▾' : '›'}</span>

            {expandedCareItem === 'watering' && (
              <div className="care-item-details-expanded">
                <p>{plant.watering.details}</p>
                {plant.watering.warning && (
                  <div className="care-warning-box">
                    <strong>Notice:</strong> {plant.watering.warning}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Light */}
          <div
            className={`quick-care-item ${expandedCareItem === 'light' ? 'expanded' : ''}`}
            onClick={() => toggleCareItem('light')}
          >
            <div className="care-item-left">
              <div className="care-item-icon-box sun">
                ☀️
              </div>
              <div className="care-item-text">
                <div className="care-item-label">Light</div>
                <div className="care-item-value">{plant.light.summary}</div>
              </div>
            </div>
            <span className="care-item-chevron">{expandedCareItem === 'light' ? '▾' : '›'}</span>

            {expandedCareItem === 'light' && (
              <div className="care-item-details-expanded">
                <p>{plant.light.details}</p>
              </div>
            )}
          </div>

          {/* 3. Temperature */}
          <div
            className={`quick-care-item ${expandedCareItem === 'temp' ? 'expanded' : ''}`}
            onClick={() => toggleCareItem('temp')}
          >
            <div className="care-item-left">
              <div className="care-item-icon-box temp">
                🌡️
              </div>
              <div className="care-item-text">
                <div className="care-item-label">Temperature</div>
                <div className="care-item-value">{plant.temperature.summary}</div>
              </div>
            </div>
            <span className="care-item-chevron">{expandedCareItem === 'temp' ? '▾' : '›'}</span>

            {expandedCareItem === 'temp' && (
              <div className="care-item-details-expanded">
                <p>{plant.temperature.details}</p>
              </div>
            )}
          </div>

          {/* 4. Fertilizer */}
          <div
            className={`quick-care-item ${expandedCareItem === 'fertilizer' ? 'expanded' : ''}`}
            onClick={() => toggleCareItem('fertilizer')}
          >
            <div className="care-item-left">
              <div className="care-item-icon-box fertilizer">
                🪴
              </div>
              <div className="care-item-text">
                <div className="care-item-label">Fertilizer</div>
                <div className="care-item-value">{plant.fertilizer.summary}</div>
              </div>
            </div>
            <span className="care-item-chevron">{expandedCareItem === 'fertilizer' ? '▾' : '›'}</span>

            {expandedCareItem === 'fertilizer' && (
              <div className="care-item-details-expanded">
                <p>{plant.fertilizer.details}</p>
                <div className="season-note">Active season: {plant.fertilizer.feeding_season}</div>
              </div>
            )}
          </div>

          {/* 5. Repot */}
          <div
            className={`quick-care-item ${expandedCareItem === 'repot' ? 'expanded' : ''}`}
            onClick={() => toggleCareItem('repot')}
          >
            <div className="care-item-left">
              <div className="care-item-icon-box repot">
                🌱
              </div>
              <div className="care-item-text">
                <div className="care-item-label">Repot</div>
                <div className="care-item-value">{plant.repotting.summary}</div>
              </div>
            </div>
            <span className="care-item-chevron">{expandedCareItem === 'repot' ? '▾' : '›'}</span>

            {expandedCareItem === 'repot' && (
              <div className="care-item-details-expanded">
                <p>{plant.repotting.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Triple Chips */}
        <div className="care-stats-row">
          <div className="stat-chip">
            <span className="stat-icon">🌱</span>
            <div className="stat-meta">
              <span className="stat-label">Difficulty</span>
              <strong className="stat-val">{plant.difficulty}</strong>
            </div>
          </div>

          <div className="stat-chip">
            <span className="stat-icon">🌿</span>
            <div className="stat-meta">
              <span className="stat-label">Growth Rate</span>
              <strong className="stat-val">{plant.growth_rate}</strong>
            </div>
          </div>

          <div className="stat-chip">
            <span className="stat-icon">↗️</span>
            <div className="stat-meta">
              <span className="stat-label">Max Size</span>
              <strong className="stat-val">{plant.max_size}</strong>
            </div>
          </div>
        </div>

        {/* Primary CTA Button: Add to My Garden */}
        <div className="add-garden-cta-wrapper">
          <button
            className="add-to-garden-btn"
            onClick={() => onAddToGarden(plant)}
          >
            + Add to My Garden
          </button>
        </div>

        {/* Soil & Humidity Quick Summary Row */}
        <div className="extra-metrics-grid">
          <div className="extra-metric-card">
            <span className="metric-icon">💦</span>
            <div>
              <strong>Humidity:</strong> {plant.humidity.summary}
              <p>{plant.humidity.details}</p>
            </div>
          </div>
          <div className="extra-metric-card">
            <span className="metric-icon">🪴</span>
            <div>
              <strong>Soil Mix:</strong> {plant.soil.summary}
              <p>{plant.soil.details}</p>
            </div>
          </div>
        </div>

        {/* 10 Collapsible Detailed Plant Care Guides */}
        <div className="detailed-guides-section">
          <h3 className="section-title">Comprehensive Plant Care Guide</h3>
          <p className="section-subtitle">Botanical recommendations specific to {plant.common_name}</p>

          <div className="accordion-list">
            {collapsibleGuides.map(guide => {
              const isOpen = expandedSection === guide.key;
              return (
                <div
                  key={guide.key}
                  className={`accordion-card ${isOpen ? 'open' : ''}`}
                >
                  <button
                    className="accordion-header-btn"
                    onClick={() => toggleSection(guide.key)}
                    aria-expanded={isOpen}
                  >
                    <div className="accordion-title-row">
                      <span className="guide-icon">{guide.icon}</span>
                      <span className="guide-title">{guide.title}</span>
                    </div>
                    <span className="accordion-arrow">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="accordion-content">
                      <p>{guide.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Botanical Information Card */}
        <div className="additional-info-card">
          <h4 className="info-card-title">Botanical Specifications</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-k">Scientific Family</span>
              <strong className="info-v"><em>{plant.scientific_name}</em></strong>
            </div>
            <div className="info-item">
              <span className="info-k">Alternative Names</span>
              <strong className="info-v">{plant.alternative_names}</strong>
            </div>
            <div className="info-item">
              <span className="info-k">Native Origin</span>
              <strong className="info-v">{plant.native_region}</strong>
            </div>
            <div className="info-item">
              <span className="info-k">Indoor Cultivation</span>
              <strong className="info-v">{plant.indoor_suitable ? 'Highly Suitable' : 'Outdoor Preferred'}</strong>
            </div>
            <div className="info-item">
              <span className="info-k">Pet Safety</span>
              <strong className={`info-v ${plant.pet_toxic ? 'toxic' : 'safe'}`}>
                {plant.pet_toxic ? '⚠️ Toxic to Pets' : '✓ 100% Pet Safe'}
              </strong>
            </div>
            <div className="info-item">
              <span className="info-k">Growth Rhythm</span>
              <strong className="info-v">{plant.growth_rate} ({plant.max_size})</strong>
            </div>
          </div>
        </div>

        {/* Back to top / back to library action */}
        <div className="bottom-return-row">
          <button className="minimal-btn" onClick={onBack}>
            ← Return to Plant Book Encyclopedia
          </button>
        </div>
      </div>
    </div>
  );
};

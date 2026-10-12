import React, { useState, useMemo } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import { PlantEncyclopediaService, CATEGORIES_LIST } from '../../data/plantEncyclopedia';
import { PlantImage } from './PlantImage';

interface PlantBookMainProps {
  onSelectPlant: (plant: EncyclopediaPlant) => void;
  onOpenMenu: () => void;
  onReturnToJournal: () => void;
  isPhonePreview?: boolean;
}

export const PlantBookMain: React.FC<PlantBookMainProps> = ({
  onSelectPlant,
  onOpenMenu,
  onReturnToJournal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All Plants');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(PlantEncyclopediaService.getFavorites());

  const handleToggleFav = (e: React.MouseEvent, plantId: string) => {
    e.stopPropagation();
    PlantEncyclopediaService.toggleFavorite(plantId);
    setFavorites(PlantEncyclopediaService.getFavorites());
  };

  const filteredPlants = useMemo(() => {
    let list = PlantEncyclopediaService.searchPlants(searchQuery, activeCategory);
    if (onlyFavorites) {
      list = list.filter(p => favorites.includes(p.id));
    }
    return list;
  }, [searchQuery, activeCategory, onlyFavorites, favorites]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All Plants');
    setOnlyFavorites(false);
  };

  return (
    <div className="plant-book-page">
      {/* Top Header Row with Navigation Options */}
      <div className="plant-book-top-bar">
        <div className="top-bar-left">
          <button
            className="menu-trigger-btn"
            onClick={onOpenMenu}
            title="Open Control Panel"
            aria-label="Open Navigation Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <button
            className="journal-switch-btn"
            onClick={onReturnToJournal}
            title="Switch to Journal View"
          >
            ← Back to Journal
          </button>
        </div>

        <div className="top-bar-right">
          <button
            className={`fav-filter-pill ${onlyFavorites ? 'active' : ''}`}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            title="Filter Saved Plants"
          >
            {onlyFavorites ? '❤️ Favorites Only' : '🤍 Favorites (' + favorites.length + ')'}
          </button>
        </div>
      </div>

      {/* Hero Header matching Reference Image Screen 1 */}
      <div className="plant-book-header">
        <div className="header-title-row">
          <span className="book-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
          </span>
          <h1 className="plant-book-title">Plant Book</h1>
        </div>
        <p className="plant-book-subtitle">
          Discover plants, understand their needs, and help them thrive.
        </p>

        {/* Search Bar */}
        <div className="plant-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="plant-search-input"
            placeholder="Search plants by name or species..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={handleClearSearch}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories Horizontal Scroll Pills */}
        <div className="categories-pills-row">
          {CATEGORIES_LIST.map((cat) => {
            const label = cat === 'All Plants' ? 'All' : cat.replace(' Plants', '');
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setOnlyFavorites(false);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="plant-grid-container">
        <div className="grid-meta-row">
          <span className="results-count">
            Showing {filteredPlants.length} specimen{filteredPlants.length !== 1 ? 's' : ''}
          </span>
          {(searchQuery || activeCategory !== 'All Plants' || onlyFavorites) && (
            <button className="reset-link-btn" onClick={handleResetFilters}>
              Reset filters
            </button>
          )}
        </div>

        {filteredPlants.length === 0 ? (
          <div className="empty-encyclopedia-state">
            <div className="empty-icon">🌿</div>
            <h3>No matching plants found</h3>
            <p>
              We couldn't find any plants matching &ldquo;{searchQuery}&rdquo; in {activeCategory}.
            </p>
            <button className="minimal-btn primary" onClick={handleResetFilters}>
              Clear Search & Show All Plants
            </button>
          </div>
        ) : (
          <div className="plants-cards-grid">
            {filteredPlants.map((plant) => {
              const isFav = favorites.includes(plant.id);
              // Render water drops
              const totalDrops = 3;
              const filledDrops = Math.min(Math.max(plant.watering.water_drops, 1), totalDrops);

              return (
                <div
                  key={plant.id}
                  className="encyclopedia-card"
                  onClick={() => onSelectPlant(plant)}
                >
                  {/* Top Heart Icon */}
                  <button
                    className={`card-heart-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => handleToggleFav(e, plant.id)}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>

                  {/* Plant Image */}
                  <div className="card-image-box">
                    <PlantImage
                      src={plant.image_url}
                      alt={plant.common_name}
                      className="card-plant-img"
                      category={plant.category}
                    />
                  </div>

                  {/* Plant Information */}
                  <div className="card-body">
                    <h3 className="card-plant-name">{plant.common_name}</h3>
                    <p className="card-scientific-name">
                      <em>{plant.scientific_name}</em>
                    </p>

                    {/* Category Pill Tag */}
                    <div className="card-tag-wrapper">
                      <span className="card-category-tag">
                        {plant.category.replace(' Plants', '')}
                      </span>
                    </div>

                    {/* Bottom Indicators (Sun & Water Drops matching reference) */}
                    <div className="card-footer-indicators">
                      <div className="indicator-col" title={`Light: ${plant.light.summary}`}>
                        <span className="sun-icon">☀️</span>
                      </div>

                      <div className="indicator-col" title={`Water: ${plant.watering.summary}`}>
                        <div className="water-drops-row">
                          {Array.from({ length: totalDrops }).map((_, i) => (
                            <span
                              key={i}
                              className={`drop-dot ${i < filledDrops ? 'filled' : 'empty'}`}
                            >
                              💧
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

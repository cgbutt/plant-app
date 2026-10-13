import React, { useState } from 'react';
import { LeafyDashboard } from './LeafyDashboard';
import type { Plant, JournalEntry, PlantPhoto } from '../../types/plant';

interface LeafyHomeViewProps {
  plants: Plant[];
  journalEntries: JournalEntry[];
  photos: PlantPhoto[];
  selectedPlantId: string;
  onSelectPlant: (plant: Plant) => void;
  onOpenPlantDetail: (plant: Plant) => void;
  onOpenAddPlant: () => void;
  onOpenJournal: () => void;
  onOpenExplore: () => void;
  onOpenMenu: () => void;
  userDisplayName?: string;
  userAvatarUrl?: string;
  onOpenProfile: () => void;
  onOpenAi: () => void;
}

export const LeafyHomeView: React.FC<LeafyHomeViewProps> = ({
  plants,
  journalEntries,
  photos,
  selectedPlantId,
  onSelectPlant,
  onOpenPlantDetail,
  onOpenAddPlant,
  onOpenJournal,
  onOpenExplore,
  onOpenMenu,
  userDisplayName,
  userAvatarUrl,
  onOpenProfile,
  onOpenAi
}) => {
  const [activeTabMode, setActiveTabMode] = useState<'dashboard' | 'shelf'>('dashboard');

  /* Previous dashboard alerts are replaced by data-driven LeafyDashboard. */
  // Get image for user plant (from photos, preset, or botanical fallback)
  const getPlantThumb = (plant: Plant) => {
    const plantPhoto = photos.find((ph) => ph.plant_id === plant.id);
    if (plantPhoto) return plantPhoto.image_url;
    if (plant.species.toLowerCase().includes('snake')) {
      return 'https://images.unsplash.com/photo-1593482874117-89e9f285b682?auto=format&fit=crop&w=600&q=80';
    }
    if (plant.species.toLowerCase().includes('pothos')) {
      return 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=600&q=80';
    }
    if (plant.species.toLowerCase().includes('lily')) {
      return 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
  };

return (
    <div className="leafy-home-screen">
      {/* Mobile Top Row: 4-square grid menu icon & Avatar with organic curved backdrop */}
      <div className="leafy-mobile-top-row">
        <button
          className="leafy-grid-menu-btn"
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          title="Menu & Settings"
        >
          <div className="grid-dots-icon">
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
          </div>
        </button>

        {/* View Switcher: Dashboard vs Floating Shelf (Matching Reference Screen 4 & 5) */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-card)' }}>
          <button
            onClick={() => setActiveTabMode('dashboard')}
            style={{
              padding: '6px 14px',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: activeTabMode === 'dashboard' ? 'var(--leaf-green)' : 'transparent',
              color: activeTabMode === 'dashboard' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTabMode('shelf')}
            style={{
              padding: '6px 14px',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: activeTabMode === 'shelf' ? 'var(--leaf-green)' : 'transparent',
              color: activeTabMode === 'shelf' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            My Shelf
          </button>
        </div>

        {/* Profile Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            className="leafy-profile-avatar-btn"
            onClick={onOpenProfile}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <img
              src={userAvatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"}
              alt="Profile"
            />
          </button>
        </div>
      </div>

      {activeTabMode === 'dashboard' ? (
        <LeafyDashboard
          plants={plants}
          journalEntries={journalEntries}
          photos={photos}
          selectedPlantId={selectedPlantId}
          userDisplayName={userDisplayName}
          userAvatarUrl={userAvatarUrl}
          onSelectPlant={onSelectPlant}
          onOpenPlantDetail={onOpenPlantDetail}
          onOpenAddPlant={onOpenAddPlant}
          onOpenJournal={onOpenJournal}
          onOpenExplore={onOpenExplore}
          onOpenProfile={onOpenProfile}
          onOpenAi={onOpenAi}
          onOpenMyPlants={() => setActiveTabMode('shelf')}
        />
      ) : (
        /* MY PLANTS FLOATING SHELF VIEW (Matching Reference Screen 5) */
        <div style={{ marginTop: '10px' }}>
          {/* Pull Down Handle Bar Indicator */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)'
              }}
            >
              <span>Pull Down</span>
            </div>
            <div style={{ width: '2px', height: '14px', background: 'var(--border-subtle)', margin: '4px auto' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              My Plants
            </h1>
            <button className="leafy-btn-secondary" style={{ padding: '7px 14px', fontSize: '12px' }} onClick={onOpenAddPlant}>
              + Add to Shelf
            </button>
          </div>

          {/* Tier 1 Floating Shelf */}
          <div style={{ position: 'relative', marginBottom: '46px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', alignItems: 'end', paddingBottom: '12px' }}>
              {plants.slice(0, 2).map((plant) => (
                <div
                  key={plant.id}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    onSelectPlant(plant);
                    onOpenPlantDetail(plant);
                  }}
                >
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
                    <img
                      src={getPlantThumb(plant)}
                      alt={plant.name}
                      style={{
                        width: '120px',
                        height: '130px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '-4px',
                        background: '#ef4444',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      !
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {plant.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {plant.suggestion?.slice(0, 18) || 'Living room, sofa'}
                  </div>
                </div>
              ))}
            </div>

            {/* Shelf 1 3D Horizon Bar */}
            <div
              className="leafy-floating-shelf-surface"
              style={{
                height: '12px',
                borderRadius: '6px',
                background: 'var(--bg-shelf)',
                boxShadow: 'var(--shadow-shelf)'
              }}
            />
          </div>

          {/* Tier 2 Floating Shelf */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px', alignItems: 'end', paddingBottom: '12px' }}>
              {(plants.length > 2 ? plants.slice(2, 5) : plants).map((plant) => (
                <div
                  key={plant.id}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    onSelectPlant(plant);
                    onOpenPlantDetail(plant);
                  }}
                >
                  <img
                    src={getPlantThumb(plant)}
                    alt={plant.name}
                    style={{
                      width: '105px',
                      height: '115px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '8px'
                    }}
                  />
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {plant.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Kitchen, sunny sill
                  </div>
                </div>
              ))}
            </div>

            {/* Shelf 2 3D Horizon Bar */}
            <div
              className="leafy-floating-shelf-surface"
              style={{
                height: '12px',
                borderRadius: '6px',
                background: 'var(--bg-shelf)',
                boxShadow: 'var(--shadow-shelf)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

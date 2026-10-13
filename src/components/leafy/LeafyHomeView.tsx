import React from 'react';
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
  userDisplayName,
  userAvatarUrl,
  onSelectPlant,
  onOpenPlantDetail,
  onOpenAddPlant,
  onOpenJournal,
  onOpenExplore,
  onOpenMenu,
  onOpenProfile,
  onOpenAi
}) => {
  // Time-of-day dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    const prefix = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    return userDisplayName ? `${prefix}, ${userDisplayName}` : `${prefix},`;
  };

  // Compute upcoming reminders based on plant watering status
  const careRemindersCount =
    plants.length === 0
      ? 0
      : plants.filter((p) => {
          const w = (p.watering_time || '').toLowerCase();
          return w.includes('today') || w.includes('check') || w.includes('2 days') || w.includes('soon');
        }).length;

  // Status dot text and styling for a plant card
  const getPlantStatus = (plant: Plant, index: number) => {
    if (plant.watering_time && plant.watering_time.toLowerCase().includes('2 days')) {
      return { text: 'Water in 2 days', color: '#f59e0b' };
    }
    if (index === 0) {
      return { text: 'Doing great', color: '#10b981' };
    }
    if (index === 2 || plant.leaf_condition?.toLowerCase().includes('new')) {
      return { text: 'New leaf', color: '#10b981' };
    }
    return { text: plant.watering_time || 'Healthy', color: '#10b981' };
  };

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

        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--matcha-soft)',
              top: '-4px',
              right: '-4px',
              zIndex: 0
            }}
          />
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

      {/* Greeting Header */}
      <div className="leafy-home-hero">
        <div className="leafy-greeting-sub">{getGreeting()}</div>
        <h1 className="leafy-greeting-title">
          Your garden <br />
          is thriving <span role="img" aria-label="sprout">🌱</span>
        </h1>
      </div>

      {/* Garden Statistics: 3 Cards (Matching Reference) */}
      <div className="leafy-stats-grid-3">
        <div className="leafy-stat-card">
          <div className="leafy-stat-num">{plants.length}</div>
          <div className="leafy-stat-label">Plants</div>
        </div>

        <div className="leafy-stat-card">
          <div className="leafy-stat-num">{careRemindersCount}</div>
          <div className="leafy-stat-label">Reminders</div>
        </div>

        <div className="leafy-stat-card" style={{ cursor: 'pointer' }} onClick={onOpenJournal}>
          <div className="leafy-stat-num">{journalEntries.length}</div>
          <div className="leafy-stat-label">Journal entries</div>
        </div>
      </div>

      {/* My Plants Section */}
      <div className="leafy-plants-section">
        <div className="leafy-section-header">
          <h2 className="leafy-section-title">My Plants</h2>
          <button className="leafy-see-all-link" onClick={onOpenAddPlant}>
            + Add plant
          </button>
        </div>

        {plants.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid var(--border-card)',
              marginBottom: '20px'
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌱</div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
              Your Garden is Ready
            </h3>
            <p
              style={{
                margin: '0 0 18px 0',
                fontSize: '13px',
                color: 'var(--text-muted)',
                maxWidth: '320px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.5
              }}
            >
              Add your first plant to begin logging care routines, growth milestones, and 3D progression.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="leafy-btn-primary" onClick={onOpenAddPlant}>
                + Add Plant
              </button>
              <button className="leafy-btn-secondary" onClick={onOpenExplore}>
                Browse Plant Book
              </button>
            </div>
          </div>
        ) : (
          <div className="leafy-plants-scroll-row">
            {plants.map((plant, index) => {
              const status = getPlantStatus(plant, index);
              const isSelected = plant.id === selectedPlantId;

              return (
                <div
                  key={plant.id}
                  className="leafy-my-plant-card"
                  style={{
                    borderColor: isSelected ? 'var(--leaf-green)' : undefined,
                    boxShadow: isSelected ? '0 4px 16px rgba(107, 141, 103, 0.2)' : undefined
                  }}
                  onClick={() => {
                    onSelectPlant(plant);
                    onOpenPlantDetail(plant);
                  }}
                >
                  {/* Plant Thumbnail in organic shape box */}
                  <div className="card-img-box">
                    <div
                      style={{
                        position: 'absolute',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: index % 2 === 0 ? 'var(--matcha-soft)' : 'var(--sage-light)',
                        top: '10px',
                        left: '10px',
                        zIndex: 1
                      }}
                    />
                    <img
                      src={getPlantThumb(plant)}
                      alt={plant.name}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  <h3 className="card-plant-name">{plant.name}</h3>
                  <div className="card-species-name">{plant.species}</div>

                  <div className="card-status-dot">
                    <span
                      className="status-dot-circle"
                      style={{ backgroundColor: status.color }}
                    ></span>
                    <span>{status.text}</span>
                  </div>
                </div>
              );
            })}

            {/* Quick Add Plant Card at end of row */}
            <div
              className="leafy-my-plant-card"
              style={{
                border: '2px dashed var(--matcha)',
                background: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '220px'
              }}
              onClick={onOpenAddPlant}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--matcha-soft)',
                  color: 'var(--leaf-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '10px'
                }}
              >
                +
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--leaf-green)' }}>
                Add Plant
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Featured Botanical Card (Matching Reference Screen 1) */}
      <div className="leafy-featured-card" onClick={onOpenExplore}>
        <div className="featured-content">
          <h3 className="featured-headline">
            Small care,<br />
            growth days
          </h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
            Discover care tips in Plant Book
          </p>
        </div>

        {/* Action Arrow Circle */}
        <div className="featured-arrow-circle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </div>

        {/* Botanical Image */}
        <img
          src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80"
          alt="Growth"
          className="featured-illustration"
        />
      </div>

      {/* Quick AI Diagnosis Banner */}
      <div
        style={{
          marginTop: '20px',
          background: '#ffffff',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)'
        }}
        onClick={onOpenAi}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="pastel-icon-circle water" style={{ background: 'var(--matcha-soft)', color: 'var(--leaf-green)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
              AI Plant Health Assistant
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Check leaf condition & get personalized care recommendations
            </div>
          </div>
        </div>
        <div style={{ color: 'var(--leaf-green)', fontSize: '16px', fontWeight: 700 }}>→</div>
      </div>
    </div>
  );
};

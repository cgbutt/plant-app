import React, { useState } from 'react';
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

  const formattedToday = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

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

      {/* DASHBOARD VIEW (Matching Reference Screen 4) */}
      {activeTabMode === 'dashboard' ? (
        <>
          {/* Greeting Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--matcha-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                🌱
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  — Hi, {userDisplayName || 'Monica'}!
                </h1>
              </div>
            </div>

            <button
              onClick={onOpenJournal}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '8px 10px',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600
              }}
              title="Calendar & Logs"
            >
              📅 {formattedToday}
            </button>
          </div>

          {/* Environmental Overview Cards (2 Columns: Beetles / Pest Level + 69° Temperature) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
            {/* Card 1: Health & Pest Alert */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    background: 'var(--status-high-bg)',
                    color: 'var(--status-high-text)',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  High
                </span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                Pest Guard
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Beetles level — be careful
              </div>
            </div>

            {/* Card 2: Environment Temperature */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px' }}>☀️</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                  69°F
                </span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                Temperature
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Ideal room humidity 64%
              </div>
            </div>
          </div>

          {/* Quick Summary Badge Row */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
            <div style={{ flex: 1, background: 'var(--bg-card)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Care Reminders</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--leaf-green)' }}>{careRemindersCount}</span>
            </div>
            <div style={{ flex: 1, background: 'var(--bg-card)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={onOpenJournal}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Journal Logs</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>{journalEntries.length}</span>
            </div>
          </div>

          {/* Timely Care Section (Matching Reference Cards) */}
          <div style={{ marginBottom: '26px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 12px 0' }}>
              Timely Care
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Care Card 1 */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
                }}
                onClick={onOpenAi}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=120&q=80"
                    alt="Plant Care"
                    style={{ width: '48px', height: '48px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--leaf-green)', letterSpacing: '0.04em' }}>
                      PHILODENDRON ✓
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      Ooh! Your Philodendron might get sick
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--matcha-soft)',
                    color: 'var(--leaf-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}
                  title="Scan & diagnose"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                  </svg>
                </div>
              </div>

              {/* Care Card 2 */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
                }}
                onClick={onOpenExplore}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=120&q=80"
                    alt="Plant Guide"
                    style={{ width: '48px', height: '48px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                      MONSTERA DELICIOSA
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      There's a new guide for your plant
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--matcha-soft)',
                    color: 'var(--leaf-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}
                  title="Read guide"
                >
                  📖
                </div>
              </div>
            </div>
          </div>

          {/* Today's Plants Horizontal Scroll Section (Matching Reference) */}
          <div className="leafy-plants-section">
            <div className="leafy-section-header">
              <h2 className="leafy-section-title">Today, {formattedToday}</h2>
              <button className="leafy-see-all-link" onClick={() => setActiveTabMode('shelf')}>
                View Shelves ›
              </button>
            </div>

            {plants.length === 0 ? (
              <div
                style={{
                  background: 'var(--bg-card)',
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
                <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: 'var(--text-muted)', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
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
                        boxShadow: isSelected ? '0 4px 16px rgba(107, 141, 103, 0.25)' : undefined
                      }}
                      onClick={() => {
                        onSelectPlant(plant);
                        onOpenPlantDetail(plant);
                      }}
                    >
                      <div className="card-img-box">
                        <img
                          src={getPlantThumb(plant)}
                          alt={plant.name}
                          style={{
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

                {/* Quick Add Plant Card */}
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
        </>
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

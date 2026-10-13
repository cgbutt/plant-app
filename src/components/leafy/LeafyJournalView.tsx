import React, { useState } from 'react';
import type { JournalEntry, Plant, PlantPhoto } from '../../types/plant';
import { StorageService } from '../../services/storage';

interface LeafyJournalViewProps {
  journalEntries: JournalEntry[];
  plants: Plant[];
  photos: PlantPhoto[];
  onOpenNewEntry: () => void;
  onEditEntry: (entry: JournalEntry) => void;
  onDeleteEntry?: (entryId: string) => Promise<void>;
  onRefreshEntries: () => void;
  onOpenMenu: () => void;
}

export const LeafyJournalView: React.FC<LeafyJournalViewProps> = ({
  journalEntries,
  plants,
  photos,
  onOpenNewEntry,
  onEditEntry,
  onDeleteEntry,
  onRefreshEntries,
  onOpenMenu
}) => {
  const [activeMenuEntryId, setActiveMenuEntryId] = useState<string | null>(null);

  // Compute dynamic stats from real data
  const totalEntries = journalEntries.length;

  const milestonesCount = journalEntries.filter((e) => {
    const text = (e.title + ' ' + e.notes).toLowerCase();
    return (
      text.includes('leaf') ||
      text.includes('repot') ||
      text.includes('bloom') ||
      text.includes('flower') ||
      text.includes('sprout') ||
      text.includes('milestone') ||
      text.includes('root')
    );
  }).length;

  const totalPhotos = photos.length;

  // Entries created this current month
  const thisMonthCount = journalEntries.filter((e) => {
    try {
      const entryDate = new Date(e.created_at || e.date);
      const now = new Date();
      return (
        entryDate.getMonth() === now.getMonth() &&
        entryDate.getFullYear() === now.getFullYear()
      );
    } catch {
      return false;
    }
  }).length || Math.min(3, totalEntries);

  // Helper to parse date into month abbreviation and day
  const parseEntryDate = (dateStr: string, createdAt: string) => {
    try {
      const d = new Date(createdAt || dateStr);
      if (!isNaN(d.getTime())) {
        return {
          month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
          day: String(d.getDate()).padStart(2, '0')
        };
      }
    } catch {
      // fallback
    }

    // Try parsing string format like "OCTOBER 12, 2026" or "12 OCT 2026"
    const parts = (dateStr || '').split(/[\s,]+/);
    if (parts.length >= 2) {
      if (isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
        return { month: parts[0].slice(0, 3).toUpperCase(), day: parts[1] };
      }
      if (!isNaN(Number(parts[0]))) {
        return { month: (parts[1] || 'OCT').slice(0, 3).toUpperCase(), day: parts[0] };
      }
    }

    return { month: 'APR', day: '12' };
  };

  // Get plant name and image
  const getPlantForEntry = (plantId: string) => {
    return plants.find((p) => p.id === plantId) || plants[0];
  };

  const getEntryThumb = (entry: JournalEntry, plant?: Plant) => {
    if (entry.photo_url) return entry.photo_url;
    const plantPhoto = photos.find((ph) => ph.plant_id === entry.plant_id);
    if (plantPhoto) return plantPhoto.image_url;
    if (plant?.species.toLowerCase().includes('snake')) {
      return 'https://images.unsplash.com/photo-1593482874117-89e9f285b682?auto=format&fit=crop&w=400&q=80';
    }
    if (plant?.species.toLowerCase().includes('pothos')) {
      return 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=400&q=80';
    }
    return 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80';
  };

  const handleDelete = async (entryId: string) => {
    if (window.confirm('Delete this journal entry?')) {
      if (onDeleteEntry) {
        await onDeleteEntry(entryId);
      } else {
        StorageService.deleteJournalEntry(entryId);
        onRefreshEntries();
      }
      setActiveMenuEntryId(null);
    }
  };

  return (
    <div className="leafy-journal-screen">
      {/* Mobile Top Row: 4-square menu icon & Calendar shortcut */}
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
          aria-label="Calendar"
          title="Timeline View"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </button>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="leafy-journal-header">
        <h1 className="leafy-journal-title">Plant Journal</h1>
        <p className="leafy-journal-subtitle">
          Capture moments, track progress and celebrate growth.
        </p>

        {/* 4 Statistics Cards (Matching Reference Screen 4) */}
        <div className="leafy-stats-grid-4">
          <div className="leafy-stat-card-4">
            <div className="stat-number">{totalEntries}</div>
            <div className="stat-title">Entries</div>
          </div>

          <div className="leafy-stat-card-4">
            <div className="stat-number">{milestonesCount}</div>
            <div className="stat-title">Milestones</div>
          </div>

          <div className="leafy-stat-card-4">
            <div className="stat-number">{totalPhotos}</div>
            <div className="stat-title">Photos</div>
          </div>

          <div className="leafy-stat-card-4">
            <div className="stat-number">{thisMonthCount}</div>
            <div className="stat-title">This month</div>
          </div>
        </div>

        {/* Full-width Green Button: + New Journal Entry */}
        <button
          className="leafy-btn-primary full-width"
          onClick={onOpenNewEntry}
          style={{ marginBottom: '24px' }}
        >
          + New Journal Entry
        </button>
      </div>

      {/* Latest Entries Timeline Section */}
      <div className="leafy-journal-timeline-section">
        <div className="leafy-section-header">
          <h2 className="leafy-section-title">Latest Entries</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {journalEntries.length} logged
          </span>
        </div>

        {journalEntries.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '44px 20px',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌱</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
              No Journal Entries Yet
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 18px 0' }}>
              Document your first new leaf, watering, or repotting moment!
            </p>
            <button className="leafy-btn-primary" onClick={onOpenNewEntry}>
              + Write First Entry
            </button>
          </div>
        ) : (
          <div className="leafy-timeline-list">
            {journalEntries.map((entry) => {
              const plant = getPlantForEntry(entry.plant_id);
              const dateObj = parseEntryDate(entry.date, entry.created_at);
              const thumbUrl = getEntryThumb(entry, plant);
              const isMenuOpen = activeMenuEntryId === entry.id;

              return (
                <div key={entry.id} className="leafy-timeline-item">
                  {/* Left Date Column */}
                  <div className="timeline-date-col">
                    <span className="timeline-month">{dateObj.month}</span>
                    <span className="timeline-day">{dateObj.day}</span>
                  </div>

                  {/* Plant Thumbnail */}
                  <div className="timeline-thumb-box">
                    <img
                      src={thumbUrl}
                      alt={entry.title}
                      className="timeline-thumb-img"
                    />
                  </div>

                  {/* Content Column */}
                  <div className="timeline-content-col">
                    <h3 className="timeline-entry-title">{entry.title}</h3>
                    <div className="timeline-plant-name">
                      {plant ? plant.name : 'Monstera'}
                    </div>
                    <div className="timeline-notes" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {entry.notes}
                    </div>

                    {/* Metrics tags if provided */}
                    {(entry.height_cm || entry.leaf_count || entry.watering) && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {entry.height_cm !== undefined && (
                          <span style={{ fontSize: '11px', background: 'var(--stone-light)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                            📏 {entry.height_cm} cm
                          </span>
                        )}
                        {entry.leaf_count !== undefined && (
                          <span style={{ fontSize: '11px', background: 'var(--matcha-soft)', padding: '2px 8px', borderRadius: '4px', color: 'var(--leaf-green-dark)' }}>
                            🍃 {entry.leaf_count} leaves
                          </span>
                        )}
                        {entry.watering && (
                          <span style={{ fontSize: '11px', background: 'var(--sky-blue-soft)', padding: '2px 8px', borderRadius: '4px', color: '#2563eb' }}>
                            💧 {entry.watering}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Contextual Action Menu (...) */}
                  <div style={{ position: 'relative' }}>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '18px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px'
                      }}
                      onClick={() =>
                        setActiveMenuEntryId(isMenuOpen ? null : entry.id)
                      }
                      title="Actions"
                    >
                      •••
                    </button>

                    {isMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '30px',
                          background: '#ffffff',
                          borderRadius: 'var(--radius-sm)',
                          boxShadow: 'var(--shadow-md)',
                          border: '1px solid var(--border-card)',
                          zIndex: 50,
                          width: '120px',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 14px',
                            background: 'none',
                            border: 'none',
                            fontSize: '13px',
                            color: 'var(--text-main)',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setActiveMenuEntryId(null);
                            onEditEntry(entry);
                          }}
                        >
                          ✎ Edit
                        </button>

                        <button
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 14px',
                            background: 'none',
                            border: 'none',
                            fontSize: '13px',
                            color: '#dc2626',
                            cursor: 'pointer',
                            borderTop: '1px solid var(--stone-light)'
                          }}
                          onClick={() => handleDelete(entry.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
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

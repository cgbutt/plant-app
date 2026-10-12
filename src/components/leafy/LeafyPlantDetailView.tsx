import React, { useState } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import type { Plant, GrowthStage, JournalEntry } from '../../types/plant';
import { ThreePlantViewer } from '../ThreePlantViewer';
import { StageSwitcher } from '../StageSwitcher';
import { PlantImage } from '../plantbook/PlantImage';

interface LeafyPlantDetailViewProps {
  plant: EncyclopediaPlant;
  userPlant?: Plant; // optional linked personal plant
  journalEntries?: JournalEntry[];
  onBack: () => void;
  onAddToGarden: (plant: EncyclopediaPlant) => void;
  onOpenAi?: () => void;
}

type DetailTab = 'care' | 'about' | 'journal' | 'insights';

export const LeafyPlantDetailView: React.FC<LeafyPlantDetailViewProps> = ({
  plant,
  userPlant,
  journalEntries = [],
  onBack,
  onAddToGarden,
  onOpenAi
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('care');
  const [is3dMode, setIs3dMode] = useState(false);
  const [currentStage, setCurrentStage] = useState<GrowthStage>(userPlant?.current_stage || 2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedCareRow, setExpandedCareRow] = useState<string | null>('watering');

  const toggleCareRow = (rowId: string) => {
    setExpandedCareRow(expandedCareRow === rowId ? null : rowId);
  };

  // 3D model URL fallback
  const get3dModelUrl = () => {
    if (userPlant) {
      if (currentStage === 1) return userPlant.stage1_model || '/models/monstera.glb';
      if (currentStage === 2) return userPlant.stage2_model || '/models/monstera.glb';
      return userPlant.stage3_model || '/models/monstera.glb';
    }
    return '/models/monstera.glb';
  };

  return (
    <div className="leafy-detail-view">
      {/* Top Navigation Row: Back (←) and Favorite (♡/♥) */}
      <div className="leafy-detail-top-nav">
        <button
          className="leafy-detail-back-btn"
          onClick={onBack}
          aria-label="Back to Plant Book"
          title="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <button
          className="leafy-detail-fav-btn"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Favorite plant"
        >
          {isFavorite ? (
            <span style={{ color: '#e11d48' }}>♥</span>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>♡</span>
          )}
        </button>
      </div>

      {/* Plant Hero Section with Organic Concentric Shapes */}
      <div className="leafy-detail-hero">
        <div className="hero-organic-stage">
          <div className="hero-shape-bg-1" />
          <div className="hero-shape-bg-2" />

          {/* Either 2D Botanical Photograph OR Interactive 3D Model */}
          {is3dMode ? (
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.7)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <ThreePlantViewer
                modelUrl={get3dModelUrl()}
                species={plant.common_name}
                stage={currentStage}
              />
            </div>
          ) : (
            <PlantImage
              src={plant.image_url}
              alt={plant.common_name}
              category={plant.category}
              className="hero-stage-plant-img"
            />
          )}

          {/* 3D Model vs Photo Toggle Button */}
          <button
            className="hero-3d-toggle-btn"
            onClick={() => setIs3dMode(!is3dMode)}
            title="Toggle between 3D Model and Photo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/>
              <path d="m3.27 6.96 8.73 4.88 8.73-4.88"/>
              <path d="M12 21.84V11.84"/>
            </svg>
            <span>{is3dMode ? 'Photo' : '3D Model'}</span>
          </button>
        </div>

        {/* 3D Growth Stage Switcher (shown when 3D mode is active) */}
        {is3dMode && (
          <div style={{ marginBottom: '16px', zIndex: 5 }}>
            <StageSwitcher
              currentStage={currentStage}
              onStageChange={(stage) => setCurrentStage(stage)}
              hasCustomModels={{ stage1: true, stage2: true, stage3: true }}
            />
          </div>
        )}

        {/* Plant Titles */}
        <h1 className="leafy-detail-plant-name">{plant.common_name}</h1>
        <div className="leafy-detail-scientific">{plant.scientific_name}</div>

        {/* Category Tags Row */}
        <div className="leafy-tags-row">
          <span className="leafy-tag-pill">
            {plant.indoor_suitable ? 'Indoor' : 'Outdoor'}
          </span>
          <span className="leafy-tag-pill badge-difficulty">
            {plant.difficulty_label || plant.difficulty}
          </span>
          {plant.pet_toxic ? (
            <span className="leafy-tag-pill badge-pet">Toxic to pets</span>
          ) : (
            <span className="leafy-tag-pill badge-safe">Pet Friendly</span>
          )}
        </div>
      </div>

      {/* Information Tabs: Care | About | Journal | Insights */}
      <div className="leafy-tabs-row" role="tablist">
        <button
          className={`leafy-tab-btn ${activeTab === 'care' ? 'active' : ''}`}
          onClick={() => setActiveTab('care')}
          role="tab"
          aria-selected={activeTab === 'care'}
        >
          Care
        </button>

        <button
          className={`leafy-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
          role="tab"
          aria-selected={activeTab === 'about'}
        >
          About
        </button>

        <button
          className={`leafy-tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
          role="tab"
          aria-selected={activeTab === 'journal'}
        >
          Journal
        </button>

        <button
          className={`leafy-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
          role="tab"
          aria-selected={activeTab === 'insights'}
        >
          Insights
        </button>
      </div>

      {/* TAB CONTENT 1: Care Rows (Matching Reference Screen 3) */}
      {activeTab === 'care' && (
        <div className="leafy-care-rows-list">
          {/* 1. Watering */}
          <div
            className="leafy-care-row-card"
            onClick={() => toggleCareRow('watering')}
          >
            <div className="care-row-header">
              <div className="care-row-left">
                <div className="pastel-icon-circle water">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="care-row-title">Watering</div>
                  <div className="care-row-val">{plant.watering.summary}</div>
                </div>
              </div>
              <div
                className="care-row-chevron"
                style={{
                  transform: expandedCareRow === 'watering' ? 'rotate(90deg)' : 'none'
                }}
              >
                ›
              </div>
            </div>

            {expandedCareRow === 'watering' && (
              <div className="care-row-expanded-body">
                <p style={{ margin: '0 0 8px 0' }}>{plant.watering.details}</p>
                {plant.watering.warning && (
                  <p style={{ margin: 0, color: '#dc2626', fontSize: '12px' }}>
                    ⚠️ {plant.watering.warning}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 2. Light */}
          <div
            className="leafy-care-row-card"
            onClick={() => toggleCareRow('light')}
          >
            <div className="care-row-header">
              <div className="care-row-left">
                <div className="pastel-icon-circle sun">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/>
                    <path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/>
                    <path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/>
                    <path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/>
                    <path d="m19.07 4.93-1.41 1.41"/>
                  </svg>
                </div>
                <div>
                  <div className="care-row-title">Light</div>
                  <div className="care-row-val">{plant.light.summary}</div>
                </div>
              </div>
              <div
                className="care-row-chevron"
                style={{
                  transform: expandedCareRow === 'light' ? 'rotate(90deg)' : 'none'
                }}
              >
                ›
              </div>
            </div>

            {expandedCareRow === 'light' && (
              <div className="care-row-expanded-body">
                <p style={{ margin: 0 }}>{plant.light.details}</p>
              </div>
            )}
          </div>

          {/* 3. Temperature */}
          <div
            className="leafy-care-row-card"
            onClick={() => toggleCareRow('temperature')}
          >
            <div className="care-row-header">
              <div className="care-row-left">
                <div className="pastel-icon-circle temp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="care-row-title">Temperature</div>
                  <div className="care-row-val">
                    {plant.temperature.range_celsius || plant.temperature.summary}
                  </div>
                </div>
              </div>
              <div
                className="care-row-chevron"
                style={{
                  transform: expandedCareRow === 'temperature' ? 'rotate(90deg)' : 'none'
                }}
              >
                ›
              </div>
            </div>

            {expandedCareRow === 'temperature' && (
              <div className="care-row-expanded-body">
                <p style={{ margin: 0 }}>{plant.temperature.details}</p>
              </div>
            )}
          </div>

          {/* 4. Fertilizer */}
          <div
            className="leafy-care-row-card"
            onClick={() => toggleCareRow('fertilizer')}
          >
            <div className="care-row-header">
              <div className="care-row-left">
                <div className="pastel-icon-circle fertilizer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 20h10"/>
                    <path d="M10 20c0-4 1-6 2-10"/>
                    <path d="M12 10c2-3 5-4 8-4-1 4-4 7-8 7"/>
                    <path d="M12 10c-2-3-5-4-8-4 1 4 4 7 8 7"/>
                  </svg>
                </div>
                <div>
                  <div className="care-row-title">Fertilizer</div>
                  <div className="care-row-val">{plant.fertilizer.summary}</div>
                </div>
              </div>
              <div
                className="care-row-chevron"
                style={{
                  transform: expandedCareRow === 'fertilizer' ? 'rotate(90deg)' : 'none'
                }}
              >
                ›
              </div>
            </div>

            {expandedCareRow === 'fertilizer' && (
              <div className="care-row-expanded-body">
                <p style={{ margin: 0 }}>{plant.fertilizer.details}</p>
              </div>
            )}
          </div>

          {/* 5. Repotting */}
          <div
            className="leafy-care-row-card"
            onClick={() => toggleCareRow('repotting')}
          >
            <div className="care-row-header">
              <div className="care-row-left">
                <div className="pastel-icon-circle repot">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9h12l-1.5 11h-9L6 9z"/>
                    <path d="M4 6h16v3H4z"/>
                  </svg>
                </div>
                <div>
                  <div className="care-row-title">Repotting</div>
                  <div className="care-row-val">{plant.repotting.summary}</div>
                </div>
              </div>
              <div
                className="care-row-chevron"
                style={{
                  transform: expandedCareRow === 'repotting' ? 'rotate(90deg)' : 'none'
                }}
              >
                ›
              </div>
            </div>

            {expandedCareRow === 'repotting' && (
              <div className="care-row-expanded-body">
                <p style={{ margin: 0 }}>{plant.repotting.details}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: About / Botanical Details */}
      {activeTab === 'about' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            border: '1px solid var(--border-card)',
            marginBottom: '30px',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)', fontSize: '16px' }}>
            Botanical Overview
          </h3>
          <p style={{ margin: '0 0 16px 0' }}>{plant.full_description || plant.short_description}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              paddingTop: '14px',
              borderTop: '1px solid var(--stone-light)'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Native Region
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                {plant.native_region || 'Tropical Regions'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Growth Rate
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{plant.growth_rate}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Mature Size
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{plant.max_size}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Soil Mix
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{plant.soil.summary}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Journal for this Plant */}
      {activeTab === 'journal' && (
        <div style={{ marginBottom: '30px' }}>
          {journalEntries.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 20px',
                textAlign: 'center',
                border: '1px solid var(--border-card)'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📖</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                No Journal Moments Yet
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 16px 0' }}>
                Add this plant to your garden to start logging leaf growth, watering, and photos!
              </p>
              <button
                className="leafy-btn-primary"
                onClick={() => onAddToGarden(plant)}
              >
                + Add to My Garden
              </button>
            </div>
          ) : (
            <div className="leafy-timeline-list">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="leafy-timeline-item">
                  <div className="timeline-date-col">
                    <span className="timeline-month">{entry.date.slice(0, 3)}</span>
                    <span className="timeline-day">{entry.date.slice(4, 6) || '01'}</span>
                  </div>
                  <div className="timeline-content-col">
                    <div className="timeline-entry-title">{entry.title}</div>
                    <div className="timeline-notes" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {entry.notes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: Insights & AI Assistance */}
      {activeTab === 'insights' && (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: '1px solid var(--border-card)',
            marginBottom: '30px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div className="pastel-icon-circle insights">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Botanical AI Insights
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Powered by Google Gemini Plant Health Model
              </div>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
            Run a diagnostic scan on leaf color, soil moisture, and environmental conditions to receive tailored advice.
          </p>

          {onOpenAi && (
            <button
              className="leafy-btn-secondary"
              style={{ width: '100%', marginBottom: '14px' }}
              onClick={onOpenAi}
            >
              ✨ Run AI Health Diagnosis
            </button>
          )}

          <div
            style={{
              background: 'var(--stone-light)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: 1.4
            }}
          >
            💡 <strong>Expert Care Tip:</strong> For {plant.common_name}, wipe the leaves gently with a damp microfiber cloth every few weeks to keep pores free of dust and maximize photosynthesis.
          </div>
        </div>
      )}

      {/* Sticky Bottom Action: + Add to My Garden */}
      <div style={{ marginTop: '16px', marginBottom: '40px' }}>
        <button
          className="leafy-btn-primary full-width"
          onClick={() => onAddToGarden(plant)}
        >
          + Add to My Garden
        </button>
      </div>
    </div>
  );
};

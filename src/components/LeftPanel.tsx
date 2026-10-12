import React, { useState } from 'react';
import type { Plant, GrowthStage, JournalEntry, PlantPhoto, AiAnalysisOutput } from '../types/plant';
import { analyzePlant } from '../services/ai';
import { StorageService } from '../services/storage';
import { getAssetUrl } from '../utils/assets';

interface LeftPanelProps {
  plant: Plant;
  plants: Plant[];
  journalEntries: JournalEntry[];
  photos: PlantPhoto[];
  activePhoto?: PlantPhoto;
  onSelectPlant: (plant: Plant) => void;
  onOpenAddPlant: () => void;
  onOpenEditPlant: () => void;
  onOpenJournal: () => void;
  onOpenPhotos: () => void;
  onOpenMenu: () => void;
  onOpenPlantBook?: () => void;
  onStageChange: (stage: GrowthStage) => void;
  onPlantUpdated: (plant: Plant) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  plant,
  journalEntries,
  photos,
  activePhoto,
  onOpenMenu,
  onOpenPlantBook,
  onPlantUpdated
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AiAnalysisOutput | null>(null);

  const currentPhoto = activePhoto || photos[0];
  const latestEntry = journalEntries[0];

  const handleRunAiPhotoCheck = async () => {
    setAnalyzing(true);
    setAiResult(null);

    try {
      const result = await analyzePlant(plant, currentPhoto, journalEntries);
      setAiResult(result);
    } catch (err) {
      console.error('AI analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyAiHealth = () => {
    if (!aiResult) return;

    const updated: Plant = {
      ...plant,
      leaf_condition: aiResult.leaf_condition,
      color: aiResult.color,
      soil_condition: aiResult.soil_condition,
      watering_time: aiResult.watering_time,
      suggestion: aiResult.suggestion,
      last_update: 'Just now (AI Verified)'
    };

    StorageService.updatePlant(updated);
    onPlantUpdated(updated);
  };

  return (
    <div className="asper-left-panel">
      {/* Top Header Row */}
      <div className="asper-top-row">
        {/* Logo / Brand with Menu Trigger */}
        <div className="asper-logo-area">
          <div className="asper-brand-row">
            <button
              onClick={onOpenMenu}
              className="asper-menu-trigger-btn"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <img src={getAssetUrl('ui-assets/ASPER.png')} alt="ASPER" className="asper-logo-img" />
          </div>
        </div>

        {/* Plant Book Quick Button & Date Added */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onOpenPlantBook && (
            <button
              onClick={onOpenPlantBook}
              className="asper-plantbook-nav-btn"
              title="Open Plant Book Encyclopedia"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
              <span>PLANT BOOK</span>
            </button>
          )}

          <div className="asper-date-added">
            <span className="asper-small-label">DATE ADDED</span>
            <span className="asper-date-val">{plant.date_added || 'June 10, 2026'}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Metrics Grid */}
      <div className="asper-metrics-grid">
        {/* Row 1 */}
        <div className="metric-col left">
          <span className="metric-label">GROWTH STAGE</span>
          <div className="metric-val large">{plant.growth_stage_label || '02 / Growing'}</div>
        </div>

        <div className="metric-col right">
          <span className="metric-label">LOCATION</span>
          <div className="metric-val large">{plant.location || 'Living room'}</div>
        </div>

        {/* Row 2 */}
        <div className="metric-col left">
          <span className="metric-label">AGE</span>
          <div className="metric-val">{plant.age}</div>
        </div>

        <div className="metric-col right">
          <span className="metric-label">SUNLIGHT</span>
          <div className="metric-val">{plant.sunlight || 'Bright, indirect'}</div>
        </div>

        {/* Row 3 */}
        <div className="metric-col left">
          <span className="metric-label">NEXT WATERING</span>
          <div className="metric-val highlight">{plant.watering_time}</div>
        </div>

        <div className="metric-col right">
          <span className="metric-label">LAST UPDATE</span>
          <div className="metric-val">{plant.last_update || 'Today'}</div>
        </div>

        {/* Row 4: Soil Mix Composition */}
        <div className="metric-col left full-width-soil">
          <span className="metric-label">SOIL COMPOSITION</span>
          <div className="soil-tags-row">
            {(plant.soil_composition || ['30% COCO PEAT', '20% GARDEN SOIL', '50% NORMAL SOIL']).map((soil, idx) => (
              <span key={idx} className="soil-tag">{soil}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Plant Doc & AI Botanical Verification Card */}
      <div className="asper-interactive-doc-card">
        <div className="doc-card-header">
          <div className="doc-specimen-badge">
            <span className="specimen-dot"></span>
            <span className="specimen-title">{plant.name} • {plant.species}</span>
          </div>
          <span className="doc-stage-badge">STAGE {plant.current_stage || 2}/3</span>
        </div>

        <div className="doc-card-body">
          <div className="doc-metric-row">
            <div className="doc-leaf-health">
              <span className="doc-status-pill">
                {analyzing
                  ? 'ANALYZING FOLIO...'
                  : aiResult
                  ? `STATUS: ${aiResult.leaf_condition.toUpperCase()} • ${aiResult.color.toUpperCase()}`
                  : 'HEALTH STATUS: OPTIMAL'}
              </span>
            </div>
            <button
              onClick={handleRunAiPhotoCheck}
              disabled={analyzing}
              className="doc-minimal-scan-btn"
              title="Run AI Vision Health Scan"
            >
              {analyzing ? 'SCANNING...' : 'AI CHECK'}
            </button>
          </div>

          <p className="doc-minimal-text">
            {aiResult
              ? aiResult.analysis_summary
              : latestEntry
              ? `${latestEntry.notes}`
              : 'Monstera Deliciosa is in active vegetative growth. Foliage shows strong fenestration and ideal chlorophyll density.'}
          </p>

          <div className="doc-minimal-footer">
            <span className="doc-advice">
              {aiResult ? aiResult.suggestion : (plant.suggestion || 'Maintain bright indirect sunlight. Check topsoil moisture before next watering.')}
            </span>
            {aiResult && (
              <button onClick={handleApplyAiHealth} className="doc-apply-link">
                Apply to Status →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

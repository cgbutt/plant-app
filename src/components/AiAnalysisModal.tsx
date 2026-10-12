import React, { useState } from 'react';
import type { Plant, JournalEntry, PlantPhoto, AiAnalysisOutput } from '../types/plant';
import { analyzePlant, AiService } from '../services/ai';
import { StorageService } from '../services/storage';

interface AiAnalysisModalProps {
  plant: Plant;
  journalEntries: JournalEntry[];
  photos: PlantPhoto[];
  onClose: () => void;
  onPlantUpdated: (updatedPlant: Plant) => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({
  plant,
  journalEntries,
  photos,
  onClose,
  onPlantUpdated
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AiAnalysisOutput | null>(null);
  const [apiKey, setApiKey] = useState(AiService.getApiKey());
  const [showConfig, setShowConfig] = useState(!AiService.hasApiKey());
  const [errorMsg, setErrorMsg] = useState<string>('');

  const latestPhoto = photos[0];

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    AiService.saveApiKey(apiKey);
    setShowConfig(false);
    setErrorMsg('');
  };

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setResult(null);
    setErrorMsg('');

    try {
      const output = await analyzePlant(plant, latestPhoto, journalEntries);
      setResult(output);
    } catch (err: any) {
      console.error('AI Analysis failed:', err);
      setErrorMsg(err?.message || 'Failed to complete AI diagnostic scan.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyToPlant = () => {
    if (!result) return;

    const updated: Plant = {
      ...plant,
      leaf_condition: result.leaf_condition,
      color: result.color,
      soil_condition: result.soil_condition,
      watering_time: result.watering_time,
      suggestion: result.suggestion
    };

    StorageService.updatePlant(updated);
    onPlantUpdated(updated);
    onClose();
  };

  const hasApiKey = Boolean(apiKey.trim());

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            AI SPECIMEN HEALTH DIAGNOSIS — {plant.name}
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Intro & API Key Status */}
          <div className="ai-intro-card">
            <div className="ai-status-header">
              <span>ENGINE: {hasApiKey ? 'GOOGLE GEMINI 1.5/2.0 (LIVE API)' : 'SIMULATED DIAGNOSTICS ENGINE'}</span>
              <button
                className="action-link-btn"
                onClick={() => setShowConfig(!showConfig)}
              >
                {showConfig ? 'HIDE CONFIG' : 'CONFIGURE GEMINI API KEY'}
              </button>
            </div>
          </div>

          {/* API Key Form */}
          {showConfig && (
            <form onSubmit={handleSaveKey} className="supabase-config-box">
              <div className="form-section-title">GOOGLE GEMINI API KEY SETUP</div>
              <div className="form-row">
                <label className="field-label">GEMINI API KEY</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="minimal-input"
                />
              </div>
              <button type="submit" className="minimal-btn primary">
                SAVE API KEY
              </button>
            </form>
          )}

          <div className="ai-inputs-summary">
            <div className="summary-chip">
              <span>SPECIES:</span> <strong>{plant.species}</strong>
            </div>
            <div className="summary-chip">
              <span>AGE:</span> <strong>{plant.age}</strong>
            </div>
            <div className="summary-chip">
              <span>JOURNAL LOGS:</span> <strong>{journalEntries.length} entries</strong>
            </div>
            <div className="summary-chip">
              <span>PHOTO ATTACHED:</span> <strong>{latestPhoto ? 'YES (LATEST)' : 'NONE'}</strong>
            </div>
          </div>

          {errorMsg && (
            <div className="error-box" style={{ color: '#cc0000', fontSize: '12px', border: '1px solid #cc0000', padding: '10px' }}>
              {errorMsg}
            </div>
          )}

          {!result && !analyzing && (
            <div className="ai-action-center">
              <button className="minimal-btn primary large" onClick={handleRunAnalysis}>
                {hasApiKey ? 'RUN LIVE GEMINI VISION SCAN' : 'RUN SIMULATED DIAGNOSTIC SCAN'}
              </button>
            </div>
          )}

          {analyzing && (
            <div className="ai-loading-box">
              <div className="loading-spinner"></div>
              <p>
                {hasApiKey
                  ? 'COMMUNICATING WITH GOOGLE GEMINI VISION API...'
                  : 'ANALYZING PLANT FOLIAGE, SOIL METRICS AND GROWTH TIMELINE...'}
              </p>
            </div>
          )}

          {result && !analyzing && (
            <div className="ai-results-wrapper">
              <div className="results-header">
                <span className="confidence-tag">
                  ANALYSIS CONFIDENCE: {(result.confidence * 100).toFixed(0)}%
                </span>
                <div className="summary-text">{result.analysis_summary}</div>
              </div>

              <div className="predicted-fields-grid">
                <div className="predicted-field">
                  <span className="field-label">LEAF CONDITION</span>
                  <div className="gray-text-container highlight">{result.leaf_condition}</div>
                </div>

                <div className="predicted-field">
                  <span className="field-label">COLOR</span>
                  <div className="gray-text-container highlight">{result.color}</div>
                </div>

                <div className="predicted-field">
                  <span className="field-label">SOIL CONDITION</span>
                  <div className="gray-text-container highlight">{result.soil_condition}</div>
                </div>

                <div className="predicted-field">
                  <span className="field-label">WATERING TIME</span>
                  <div className="gray-text-container highlight">{result.watering_time}</div>
                </div>

                <div className="predicted-field full">
                  <span className="field-label">SUGGESTION</span>
                  <div className="gray-text-container highlight">{result.suggestion}</div>
                </div>
              </div>

              <div className="modal-actions-bottom">
                <button className="minimal-btn save" onClick={handleApplyToPlant}>
                  APPLY AI DIAGNOSIS TO PLANT HEALTH FIELDS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

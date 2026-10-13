import React, { useState } from 'react';
import type { Plant, GrowthStage } from '../types/plant';
import { StorageService } from '../services/storage';

interface AddEditPlantModalProps {
  plant?: Plant | null;
  onClose: () => void;
  onSave: (savedPlant: Plant) => void;
  onDelete?: (plantId: string) => void;
}

export const AddEditPlantModal: React.FC<AddEditPlantModalProps> = ({
  plant,
  onClose,
  onSave,
  onDelete
}) => {
  const isEditing = Boolean(plant);

  const [name, setName] = useState(plant?.name || '');
  const [species, setSpecies] = useState(plant?.species || '');
  const [age, setAge] = useState(plant?.age || '');
  const [leafCondition, setLeafCondition] = useState(plant?.leaf_condition || 'Healthy');
  const [color, setColor] = useState(plant?.color || 'Dark Green');
  const [soilCondition, setSoilCondition] = useState(plant?.soil_condition || 'Slightly Dry');
  const [wateringTime, setWateringTime] = useState(plant?.watering_time || 'In 2 Days');
  const [suggestion, setSuggestion] = useState(plant?.suggestion || 'Move closer to indirect light');

  const [stage1Url, setStage1Url] = useState(plant?.stage1_model || '');
  const [stage2Url, setStage2Url] = useState(plant?.stage2_model || '');
  const [stage3Url, setStage3Url] = useState(plant?.stage3_model || '');

  const handleGlbUpload = (stage: GrowthStage, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      if (stage === 1) setStage1Url(url);
      if (stage === 2) setStage2Url(url);
      if (stage === 3) setStage3Url(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !species.trim() || !age.trim()) return;

    const plantData: Plant = {
      id: plant?.id || 'plant-' + Date.now(),
      name: name.trim().toUpperCase(),
      species: species.trim().toUpperCase(),
      age: age.trim().toUpperCase(),
      leaf_condition: leafCondition.trim(),
      color: color.trim(),
      soil_condition: soilCondition.trim(),
      watering_time: wateringTime.trim(),
      suggestion: suggestion.trim(),
      current_stage: plant?.current_stage || 1,
      species_id: plant?.species_id,
      stage1_model: stage1Url,
      stage2_model: stage2Url,
      stage3_model: stage3Url,
      created_at: plant?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onSave(plantData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? `EDIT SPECIMEN — ${plant?.name}` : 'REGISTER NEW PLANT SPECIMEN'}
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Identity Fields */}
          <div className="form-row">
            <label className="field-label">PLANT NAME</label>
            <input
              type="text"
              placeholder="e.g. MONSTERA"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label className="field-label">SPECIES</label>
              <input
                type="text"
                placeholder="e.g. MONSTERA DELICIOSA"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="minimal-input"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">AGE</label>
              <input
                type="text"
                placeholder="e.g. 2 YEARS"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="minimal-input"
                required
              />
            </div>
          </div>

          {/* Health Information Fields */}
          <div className="form-row">
            <label className="field-label">LEAF CONDITION</label>
            <input
              type="text"
              placeholder="Healthy"
              value={leafCondition}
              onChange={(e) => setLeafCondition(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label">COLOR</label>
            <input
              type="text"
              placeholder="Dark Green"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label">SOIL CONDITION</label>
            <input
              type="text"
              placeholder="Slightly Dry"
              value={soilCondition}
              onChange={(e) => setSoilCondition(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label">WATERING TIME</label>
            <input
              type="text"
              placeholder="In 2 Days"
              value={wateringTime}
              onChange={(e) => setWateringTime(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label">SUGGESTION</label>
            <input
              type="text"
              placeholder="Move closer to indirect light"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          {/* 3D Models Section */}
          <div className="form-section-title">3D MODELS (GLB/GLTF)</div>
          
          <div className="form-grid-3">
            <div className="form-row">
              <label className="field-label">STAGE 1 GLB</label>
              <label className="upload-btn block">
                {stage1Url ? 'REPLACE STAGE 1' : 'UPLOAD STAGE 1'}
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => handleGlbUpload(1, e)}
                />
              </label>
            </div>

            <div className="form-row">
              <label className="field-label">STAGE 2 GLB</label>
              <label className="upload-btn block">
                {stage2Url ? 'REPLACE STAGE 2' : 'UPLOAD STAGE 2'}
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => handleGlbUpload(2, e)}
                />
              </label>
            </div>

            <div className="form-row">
              <label className="field-label">STAGE 3 GLB</label>
              <label className="upload-btn block">
                {stage3Url ? 'REPLACE STAGE 3' : 'UPLOAD STAGE 3'}
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => handleGlbUpload(3, e)}
                />
              </label>
            </div>
          </div>

          <div className="modal-actions-bottom" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isEditing && onDelete && plant && (
              <button
                type="button"
                className="minimal-btn"
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => onDelete(plant.id)}
              >
                🗑️ DELETE SPECIMEN
              </button>
            )}
            <button type="submit" className="minimal-btn save" style={{ flex: 1 }}>
              {isEditing ? 'UPDATE SPECIMEN' : 'CREATE SPECIMEN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

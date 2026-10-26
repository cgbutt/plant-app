import React, { useState } from 'react';
import type { EncyclopediaPlant } from '../../types/encyclopedia';
import type { Plant } from '../../types/plant';

interface AddToGardenModalProps {
  plant: EncyclopediaPlant;
  onClose: () => void;
  onAdded: (newPlant: Plant) => void;
}

export const AddToGardenModal: React.FC<AddToGardenModalProps> = ({
  plant,
  onClose,
  onAdded
}) => {
  const [nickname, setNickname] = useState(plant.common_name);
  const [location, setLocation] = useState('Living room');
  const [age, setAge] = useState('1 Year');
  const [wateringTime, setWateringTime] = useState(plant.watering.summary);
  const [sunlight, setSunlight] = useState(plant.light.summary);
  const [notes, setNotes] = useState(`Added from Plant Book (${plant.scientific_name}).`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlant: Plant = {
      id: 'plant-' + plant.id + '-' + Date.now().toString(36),
      name: nickname.trim() || plant.common_name,
      species: plant.scientific_name,
      age: age.trim() || '1 Year',
      growth_stage_label: '01 / Young',
      location: location.trim() || 'Living room',
      last_update: 'Just added from Plant Book',
      sunlight: sunlight.trim() || plant.light.summary,
      watering_time: wateringTime.trim() || plant.watering.summary,
      date_added: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      leaf_condition: 'Healthy',
      color: 'Vibrant Green',
      soil_condition: plant.soil.summary,
      suggestion: plant.guides.light_placement.slice(0, 90) + '...',
      current_stage: 1,
      species_id: plant.id,
      soil_composition: [
        '40% POTTING SOIL',
        '30% PERLITE',
        '30% COCO PEAT'
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onAdded(newPlant);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card wide add-to-garden-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            ADD TO MY GARDEN — {plant.common_name.toUpperCase()}
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="add-garden-specimen-preview">
            <img src={plant.image_url} alt={plant.common_name} className="preview-plant-img" />
            <div className="preview-plant-meta">
              <h3>{plant.common_name}</h3>
              <p><em>{plant.scientific_name}</em></p>
              <div className="preview-tag">{plant.category} • {plant.difficulty_label}</div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label className="field-label">PLANT NICKNAME</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="minimal-input"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">LOCATION IN HOME</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="minimal-input"
                placeholder="e.g. Living room, Bedroom windowsill"
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label className="field-label">ESTIMATED PLANT AGE</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="minimal-input"
                placeholder="e.g. 1 YEAR, 6 MONTHS"
                required
              />
            </div>

            <div className="form-row">
              <label className="field-label">WATERING SCHEDULE</label>
              <input
                type="text"
                value={wateringTime}
                onChange={(e) => setWateringTime(e.target.value)}
                className="minimal-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label className="field-label">SUNLIGHT CONDITION</label>
            <input
              type="text"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              className="minimal-input"
              required
            />
          </div>

          <div className="form-row">
            <label className="field-label">INITIAL CARE NOTE</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="minimal-input"
              rows={2}
            />
          </div>

          <div className="modal-actions-bottom">
            <button type="button" className="minimal-btn" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="minimal-btn primary large save">
              + CONFIRM & ADD TO MY GARDEN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

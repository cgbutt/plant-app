import React, { useState } from 'react';
import type { Plant } from '../types/plant';

export interface AddEditPlantModalProps {
  plant?: Plant | null;
  onClose: () => void;
  onSave: (savedPlant: Plant) => void;
  onDelete?: (plantId: string) => void;
}

export const COLOR_OPTIONS = [
  { id: 'pink', color: '#FF9D9D', label: 'Pastel Pink' },
  { id: 'green', color: '#708C5B', label: 'Sage Green' }
];

const COMMON_SPECIES = [
  'Pothos',
  'Monstera Deliciosa',
  'Philodendron',
  'Spider Plant',
  'Calathea',
  'Snake Plant',
  'Ficus Elastica',
  'Peace Lily',
  'ZZ Plant'
];

export const AddEditPlantModal: React.FC<AddEditPlantModalProps> = ({
  plant,
  onClose,
  onSave
}) => {
  const isEditing = Boolean(plant);

  const [name, setName] = useState(plant?.name || '');
  const [species, setSpecies] = useState(plant?.species || '');
  const [selectedColor, setSelectedColor] = useState<string>(
    plant?.card_color || COLOR_OPTIONS[0].color
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedSpecies = species.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter a plant name');
      return;
    }

    if (!trimmedSpecies) {
      setErrorMessage('Please enter a species');
      return;
    }

    // Determine cutout image based on species or color
    const speciesLower = trimmedSpecies.toLowerCase();
    let imageCutout = '/plants/asper-pothos.png';
    if (speciesLower.includes('monst')) {
      imageCutout = '/plants/monstera.png';
    } else if (speciesLower.includes('spider') || speciesLower.includes('chlorophytum')) {
      imageCutout = '/plants/spider-plant.png';
    } else if (selectedColor === '#FF9D9D' || speciesLower.includes('calathea') || speciesLower.includes('pink')) {
      imageCutout = '/plants/golden-pothos.png';
    }

    const plantData: Plant = {
      id: plant?.id || 'plant-' + Date.now(),
      name: trimmedName,
      species: trimmedSpecies,
      card_color: selectedColor,
      color: selectedColor,
      age: plant?.age || '01 Year',
      birth_date: plant?.birth_date || new Date().toISOString().split('T')[0],
      growth_stage_label: plant?.growth_stage_label || '01 / Sprout',
      current_stage: plant?.current_stage || 1,
      location: plant?.location || 'Living room',
      last_update: 'Just now',
      sunlight: plant?.sunlight || 'Bright, indirect',
      watering_time: plant?.watering_time || 'Check in 3 days',
      soil_condition: plant?.soil_condition || 'Optimal Moisture',
      soil_composition: plant?.soil_composition || ['40% POTTING SOIL', '30% PERLITE', '30% COCO PEAT'],
      suggestion: plant?.suggestion || 'Water when top 2 inches feel dry',
      date_added: plant?.date_added || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      leaf_condition: plant?.leaf_condition || 'Healthy',
      image_cutout: plant?.image_cutout || imageCutout,
      created_at: plant?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onSave(plantData);
    onClose();
  };

  return (
    <div
      className="leafy-add-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Add plant specimen overlay"
    >
      <div
        className="leafy-add-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="leafy-add-modal-form" noValidate>
          {/* Top Bar: Cancel (Left) and Create (Right) */}
          <div className="leafy-add-modal-header">
            <button
              type="button"
              className="leafy-add-cancel-btn"
              onClick={onClose}
              aria-label="Cancel and close"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="leafy-add-create-btn"
              aria-label={isEditing ? 'Save changes' : 'Create plant'}
            >
              {isEditing ? 'Save' : 'Create'}
            </button>
          </div>

          {/* Validation Feedback */}
          {errorMessage && (
            <div className="leafy-add-error-hint">{errorMessage}</div>
          )}

          {/* Body Fields */}
          <div className="leafy-add-fields-body">
            {/* Field 1: Plant Name */}
            <div className="leafy-add-field-group">
              <label htmlFor="leafy-plant-name-input" className="leafy-add-label">
                Plant Name
              </label>
              <input
                id="leafy-plant-name-input"
                type="text"
                placeholder="Casper"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="leafy-add-input"
                autoFocus
                autoComplete="off"
              />
            </div>

            {/* Field 2: Species & Colors (Row) */}
            <div className="leafy-add-species-color-row">
              <div className="leafy-add-species-column">
                <label htmlFor="leafy-plant-species-input" className="leafy-add-label">
                  Species
                </label>
                <input
                  id="leafy-plant-species-input"
                  type="text"
                  placeholder="Pothos"
                  value={species}
                  onChange={(e) => {
                    setSpecies(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="leafy-add-input"
                  list="leafy-common-species"
                  autoComplete="off"
                />
                <datalist id="leafy-common-species">
                  {COMMON_SPECIES.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              {/* Lower-Right Circular Colour Options */}
              <div
                className="leafy-add-color-options"
                role="radiogroup"
                aria-label="Card colour options"
              >
                {COLOR_OPTIONS.map((opt) => {
                  const isSelected = selectedColor.toLowerCase() === opt.color.toLowerCase();
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`leafy-add-color-circle ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: opt.color }}
                      onClick={() => setSelectedColor(opt.color)}
                      aria-label={`${opt.label} color`}
                      aria-checked={isSelected}
                      role="radio"
                      title={opt.label}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

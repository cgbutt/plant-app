import React, { useState, useEffect } from 'react';
import type { Plant } from '../../types/plant';
import { ModalCloseIcon, AgeCakeIcon } from './Icons';
import {
  calculateAgeFromBirthDate,
  formatDateDisplay,
  getTodayIsoDate
} from '../../utils/plantDate';

export interface EditPlantAgeModalProps {
  isOpen: boolean;
  plant: Plant;
  onSave: (plantId: string, newAge: string, newBirthDate?: string) => void;
  onClose: () => void;
}

export const EditPlantAgeModal: React.FC<EditPlantAgeModalProps> = ({
  isOpen,
  plant,
  onSave,
  onClose
}) => {
  // Step state: 'edit' | 'confirm'
  const [step, setStep] = useState<'edit' | 'confirm'>('edit');

  // Mode: calculate from birth date vs custom approximate age
  const [hasExactDob, setHasExactDob] = useState<boolean>(true);
  const [birthDate, setBirthDate] = useState<string>('');
  
  // Custom manual age fields
  const [manualYears, setManualYears] = useState<number>(2);
  const [manualUnit, setManualUnit] = useState<'Years' | 'Months'>('Years');

  // Calculated or selected age
  const [calculatedAge, setCalculatedAge] = useState<string>('02 Years');

  const todayIso = getTodayIsoDate();

  useEffect(() => {
    if (isOpen && plant) {
      setStep('edit');
      const existingDob = plant.birth_date ? plant.birth_date.split('T')[0] : '';
      if (existingDob) {
        setHasExactDob(true);
        setBirthDate(existingDob);
        const calc = calculateAgeFromBirthDate(existingDob);
        setCalculatedAge(calc.formattedAge);
      } else {
        // Parse raw age (e.g. "02 Years" or "3 Years")
        const raw = plant.age || '02 Years';
        const match = raw.match(/^(\d+)\s*(.*)$/);
        const val = match ? parseInt(match[1], 10) : 2;
        const unit = match && match[2]?.toLowerCase().includes('month') ? 'Months' : 'Years';

        setManualYears(val);
        setManualUnit(unit);
        setCalculatedAge(raw);

        // Fallback default date if user toggles to DOB
        setBirthDate(plant.date_added ? plant.date_added.split('T')[0] : '2024-03-12');
        setHasExactDob(false);
      }
    }
  }, [isOpen, plant]);

  if (!isOpen || !plant) return null;

  // Handle DOB input change
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    setBirthDate(newDob);
    if (newDob) {
      const calc = calculateAgeFromBirthDate(newDob);
      setCalculatedAge(calc.formattedAge);
    }
  };

  // Handle manual age change
  const handleManualValueChange = (val: number, unit: 'Years' | 'Months') => {
    setManualYears(val);
    setManualUnit(unit);
    const num = val < 10 ? `0${val}` : `${val}`;
    const formatted = `${num} ${val === 1 ? (unit === 'Years' ? 'Year' : 'Month') : unit}`;
    setCalculatedAge(formatted);
  };

  // Move to confirmation step
  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  // Final confirmation
  const handleFinalConfirm = () => {
    const finalDob = hasExactDob && birthDate ? birthDate : undefined;
    onSave(plant.id, calculatedAge, finalDob);
    onClose();
  };

  const previousAge = plant.age || '02 Years';
  const previousDobDisplay = plant.birth_date ? formatDateDisplay(plant.birth_date) : 'Not specified';
  const newDobDisplay = hasExactDob && birthDate ? formatDateDisplay(birthDate) : 'Approximate age';

  return (
    <div
      className="leafy-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-age-title"
    >
      <div className="leafy-edit-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="leafy-edit-popup-header">
          <div className="leafy-popup-title-group">
            <h3 id="edit-age-title" className="leafy-edit-popup-title">
              {step === 'edit' ? 'Update Plant Age' : 'Confirm Age Update'}
            </h3>
            <span className="leafy-popup-subtitle">{plant.name} • {plant.species}</span>
          </div>
          <button
            className="leafy-popup-close-btn"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <ModalCloseIcon size={18} color="#6B7280" />
          </button>
        </div>

        {/* Step 1: Edit Form */}
        {step === 'edit' && (
          <form onSubmit={handleProceedToConfirm} className="leafy-edit-popup-body">
            {/* Toggle between Exact DOB and Approximate Age */}
            <div className="leafy-dob-toggle-row">
              <button
                type="button"
                className={`leafy-dob-mode-btn ${hasExactDob ? 'active' : ''}`}
                onClick={() => {
                  setHasExactDob(true);
                  if (birthDate) {
                    const calc = calculateAgeFromBirthDate(birthDate);
                    setCalculatedAge(calc.formattedAge);
                  }
                }}
              >
                Date of Birth
              </button>
              <button
                type="button"
                className={`leafy-dob-mode-btn ${!hasExactDob ? 'active' : ''}`}
                onClick={() => {
                  setHasExactDob(false);
                  handleManualValueChange(manualYears, manualUnit);
                }}
              >
                Approximate Age
              </button>
            </div>

            {hasExactDob ? (
              <div className="leafy-popup-field-group">
                <label className="leafy-popup-field-label" htmlFor="plant-dob-picker">
                  Select Date of Birth (Local Time)
                </label>
                <input
                  id="plant-dob-picker"
                  type="date"
                  max={todayIso}
                  className="leafy-popup-date-input"
                  value={birthDate}
                  onChange={handleDobChange}
                  required={hasExactDob}
                />
                <span className="leafy-popup-hint">
                  Future dates are prevented. Age is auto-calculated based on your current local date.
                </span>
              </div>
            ) : (
              <div className="leafy-popup-field-group">
                <label className="leafy-popup-field-label">
                  Estimated Age
                </label>
                <div className="leafy-manual-age-row">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    className="leafy-popup-number-input"
                    value={manualYears}
                    onChange={(e) => {
                      const v = Math.max(1, parseInt(e.target.value, 10) || 1);
                      handleManualValueChange(v, manualUnit);
                    }}
                  />
                  <select
                    className="leafy-popup-select-input"
                    value={manualUnit}
                    onChange={(e) => {
                      const u = e.target.value as 'Years' | 'Months';
                      handleManualValueChange(manualYears, u);
                    }}
                  >
                    <option value="Years">Years</option>
                    <option value="Months">Months</option>
                  </select>
                </div>
                <span className="leafy-popup-hint">
                  Allows saving an estimated age without inventing an exact date of birth.
                </span>
              </div>
            )}

            {/* Visual Preview Box */}
            <div className="leafy-age-preview-card">
              <div className="leafy-age-preview-left">
                <span className="leafy-age-preview-label">Calculated Display</span>
                <span className="leafy-age-preview-number">{calculatedAge}</span>
                <div className="leafy-age-preview-dob-line">
                  <span className="leafy-age-preview-dob-label">DOB:</span>
                  <span className="leafy-age-preview-dob-val">{newDobDisplay}</span>
                </div>
              </div>
              <div className="leafy-age-preview-right">
                <AgeCakeIcon size={26} color="#2D3C23" />
              </div>
            </div>

            {/* Actions */}
            <div className="leafy-popup-actions-row">
              <button
                type="button"
                className="leafy-popup-btn secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="leafy-popup-btn primary"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Confirmation Popup */}
        {step === 'confirm' && (
          <div className="leafy-edit-popup-body">
            <div className="leafy-confirm-message-box">
              <p className="leafy-confirm-question">
                Are you sure you want to update this plant's age?
              </p>
            </div>

            {/* Before vs After Comparison */}
            <div className="leafy-confirm-compare-grid">
              <div className="leafy-confirm-compare-box old">
                <span className="leafy-compare-badge">Current</span>
                <span className="leafy-compare-main">{previousAge}</span>
                <span className="leafy-compare-sub">DOB: {previousDobDisplay}</span>
              </div>

              <div className="leafy-confirm-arrow">→</div>

              <div className="leafy-confirm-compare-box new">
                <span className="leafy-compare-badge active">New</span>
                <span className="leafy-compare-main">{calculatedAge}</span>
                <span className="leafy-compare-sub">DOB: {newDobDisplay}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="leafy-popup-actions-row">
              <button
                type="button"
                className="leafy-popup-btn secondary"
                onClick={() => setStep('edit')}
              >
                Go Back
              </button>
              <button
                type="button"
                className="leafy-popup-btn primary confirm-btn"
                onClick={handleFinalConfirm}
              >
                Yes, Update Age
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

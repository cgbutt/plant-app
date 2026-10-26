import React, { useState } from 'react';
import type { Plant } from '../../types/plant';
import { AgeCakeIcon, WaterCycleDropletIcon, ExplorePotPlantIcon, EditPencilIcon } from './Icons';
import { formatDateDisplay } from '../../utils/plantDate';

export interface PlantInfoTileProps {
  plant: Plant;
  onExploreSpecies?: (species: string) => void;
  onWaterCycleClick?: () => void;
  onEditAge?: () => void;
  className?: string;
}

export const PlantInfoTile: React.FC<PlantInfoTileProps> = ({
  plant,
  onExploreSpecies,
  onWaterCycleClick,
  onEditAge,
  className = ''
}) => {
  const [showSoilDetails, setShowSoilDetails] = useState(false);

  // Extract age digits (e.g., "02 Years" -> "02" and "Years")
  const rawAge = plant.age || '02 Years';
  const ageMatch = rawAge.match(/^(\d+)\s*(.*)$/);
  const ageNumber = ageMatch ? (parseInt(ageMatch[1], 10) < 10 ? `0${parseInt(ageMatch[1], 10)}` : ageMatch[1]) : '02';
  const ageUnit = ageMatch && ageMatch[2] ? ageMatch[2] : 'Years';

  // Format DOB (default to 12 March 2024 if Asper)
  const formattedDob = plant.birth_date ? formatDateDisplay(plant.birth_date) : '12 March 2024';

  return (
    <div className={`leafy-info-modules-group ${className}`}>
      {/* 1. Interlocking Soil & Age Bento Panel */}
      <div className="leafy-soil-bento-container">
        {/* Top Split Row */}
        <div className="leafy-soil-top-row">
          {/* Soil Tab */}
          <div
            className="leafy-soil-label-box"
            onClick={() => setShowSoilDetails(!showSoilDetails)}
            title="Tap to toggle soil composition"
            role="button"
            tabIndex={0}
          >
            <h3 className="leafy-soil-heading">Soil</h3>
          </div>

          {/* 02 Years Light Green Card (Editable on tap) */}
          <div
            className="leafy-age-badge-card clickable"
            onClick={(e) => {
              e.stopPropagation();
              onEditAge?.();
            }}
            title="Tap to edit age and date of birth"
            role="button"
            tabIndex={0}
            aria-label={`Plant age: ${ageNumber} ${ageUnit}. Date of birth: ${formattedDob}. Click to edit.`}
          >
            <div className="leafy-age-icon-row">
              <span className="leafy-age-edit-hint" aria-hidden="true">
                <EditPencilIcon size={12} color="#2D3C23" />
              </span>
              <AgeCakeIcon size={20} color="#2D3C23" />
            </div>

            <div className="leafy-age-val-row">
              <span className="leafy-age-number">{ageNumber}</span>
              <span className="leafy-age-unit">{ageUnit}</span>
            </div>

            {/* Date of Birth Section matching requirement 5 */}
            <div className="leafy-age-dob-group">
              <span className="leafy-age-dob-label">Date of Birth</span>
              <span className="leafy-age-dob-val">{formattedDob}</span>
            </div>
          </div>
        </div>

        {/* Bottom Terracotta Shelf */}
        <div className="leafy-soil-bottom-shelf">
          {showSoilDetails && plant.soil_composition && plant.soil_composition.length > 0 && (
            <div className="leafy-soil-composition-tags">
              {plant.soil_composition.map((item, idx) => (
                <span key={idx} className="leafy-soil-tag">{item}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Water Cycle Cyan Horizontal Pill */}
      <div
        className="leafy-water-cycle-pill"
        onClick={onWaterCycleClick}
        role="button"
        tabIndex={0}
        title="Watering Schedule — Click to mark watered"
        aria-label="Water cycle status"
      >
        <div className="leafy-water-text-group">
          <span className="leafy-water-title">Water Cycle</span>
        </div>
        <div className="leafy-water-icon-wrap">
          <WaterCycleDropletIcon size={20} color="#20383C" />
        </div>
      </div>

      {/* 3. Bottom Row: Sage Explore Card + Pastel Pink Accent Card */}
      <div className="leafy-detail-bottom-row">
        {/* Left: Explore Sage Green Card */}
        <div
          className="leafy-explore-card"
          onClick={() => onExploreSpecies?.(plant.species_id || plant.species)}
          role="button"
          tabIndex={0}
          title={`Learn more about ${plant.species}`}
          aria-label={`Explore more about ${plant.species}`}
        >
          <div className="leafy-explore-text-group">
            <span className="leafy-explore-pre">Explore more about</span>
            <h4 className="leafy-explore-species">{plant.species}</h4>
          </div>
          <div className="leafy-explore-icon-stage">
            <ExplorePotPlantIcon size={54} color="#23321C" />
          </div>
        </div>

        {/* Right: Pastel Pink Accent Card matching crop_bottom.png */}
        <div
          className="leafy-pink-accent-card"
          role="region"
          aria-label="Plant accent module"
        />
      </div>
    </div>
  );
};

import React from 'react';
import type { Plant } from '../../types/plant';
import { getCardTheme, getPlantCutoutUrl, type CardTheme } from '../../utils/plantTheme';
import { ReferenceLeafIcon, NavBackArrowIcon, EditPencilIcon } from './Icons';

export interface PlantHeroProps {
  plant: Plant;
  onBack?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const PlantHero: React.FC<PlantHeroProps> = ({
  plant,
  onBack,
  onEdit,
  className = ''
}) => {
  const theme = getCardTheme(0, plant.card_color);
  const plantImage = getPlantCutoutUrl(plant);

  const renderDecoShapes = (t: CardTheme) => {
    if (t.shapeStyle === 'triangles') {
      return (
        <div className="leafy-deco-triangles-stage">
          <svg viewBox="0 0 320 240" className="leafy-deco-triangles-svg" fill="none">
            <path
              d="M 65 45 C 45 45 45 65 45 75 L 45 165 C 45 185 60 195 75 185 L 175 130 C 190 120 190 110 175 100 Z"
              fill="#B4C2C1"
            />
            <path
              d="M 105 45 C 85 45 85 65 85 75 L 85 165 C 85 185 100 195 115 185 L 215 130 C 230 120 230 110 215 100 Z"
              fill="#FEE6E7"
            />
            <path
              d="M 145 45 C 125 45 125 65 125 75 L 125 165 C 125 185 140 195 155 185 L 255 130 C 270 120 270 110 255 100 Z"
              fill="#D9F7DB"
            />
          </svg>
        </div>
      );
    }

    if (t.shapeStyle === 'tilted-card') {
      return (
        <div className="leafy-deco-tilted-stage">
          <div
            className="leafy-deco-tilted-rect"
            style={{ backgroundColor: t.darkCircle }}
          />
        </div>
      );
    }

    return (
      <>
        <div
          className="leafy-hero-circle leafy-hero-circle-dark"
          style={{ backgroundColor: t.darkCircle }}
        />
        <div
          className="leafy-hero-circle leafy-hero-circle-light"
          style={{ backgroundColor: t.lightCircle }}
        />
      </>
    );
  };

  return (
    <div
      className={`leafy-detail-hero-card ${className}`}
      style={{ backgroundColor: theme.bg }}
    >
      {/* Top Header Row with Minimal Back Arrow, Nickname, Species and Leaf Icon */}
      <div className="leafy-hero-header">
        <div className="leafy-hero-left-nav">
          {onBack && (
            <button
              className="leafy-hero-back-btn"
              onClick={onBack}
              aria-label="Back to plant collection"
              title="Back to plant collection"
            >
              <NavBackArrowIcon size={22} color="#1D2820" />
            </button>
          )}

          <div className="leafy-hero-title-group">
            <div className="leafy-hero-name-row">
              <h1 className="leafy-hero-nickname">{plant.name}</h1>
              {onEdit && (
                <button
                  className="leafy-hero-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  aria-label={`Edit ${plant.name}`}
                  title="Edit plant information"
                >
                  <EditPencilIcon size={15} color="#1D2820" />
                </button>
              )}
            </div>
            <span
              className="leafy-hero-species"
              style={{ color: theme.speciesColor }}
            >
              {plant.species}
            </span>
          </div>
        </div>

        <div className="leafy-hero-icon-wrap" aria-hidden="true">
          <ReferenceLeafIcon size={25} color="#1D2820" />
        </div>
      </div>

      {/* Decorative Stage with Transparent Cutout Plant */}
      <div className="leafy-hero-visual-stage">
        {renderDecoShapes(theme)}

        {/* Hero Plant Cutout Image */}
        <img
          src={plantImage}
          alt={plant.name}
          className="leafy-hero-plant-img"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
};

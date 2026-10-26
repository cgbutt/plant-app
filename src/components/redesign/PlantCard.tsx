import React from 'react';
import type { Plant } from '../../types/plant';
import { getCardTheme, formatIndexNumber, getPlantCutoutUrl, type CardTheme } from '../../utils/plantTheme';
import { ReferenceLeafIcon } from './Icons';

export interface PlantCardProps {
  plant: Plant;
  index: number;
  isActive?: boolean;
  isPeek?: boolean;
  parallaxOffsetY?: number;
  parallaxOffsetZ?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  index,
  isActive = true,
  isPeek = false,
  parallaxOffsetY = 0,
  parallaxOffsetZ = 0,
  onClick,
  style = {},
  className = ''
}) => {
  const theme = getCardTheme(index, plant.card_color);
  const formattedIndex = formatIndexNumber(index);
  const plantImage = getPlantCutoutUrl(plant);

  const renderDecoShapes = (t: CardTheme) => {
    if (t.shapeStyle === 'triangles') {
      return (
        <div className="leafy-deco-triangles-stage">
          <svg viewBox="0 0 320 240" className="leafy-deco-triangles-svg" fill="none">
            {/* Grey-blue rounded triangle pointing right */}
            <path
              d="M 65 45 C 45 45 45 65 45 75 L 45 165 C 45 185 60 195 75 185 L 175 130 C 190 120 190 110 175 100 Z"
              fill="#B4C2C1"
            />
            {/* Soft pink rounded triangle */}
            <path
              d="M 105 45 C 85 45 85 65 85 75 L 85 165 C 85 185 100 195 115 185 L 215 130 C 230 120 230 110 215 100 Z"
              fill="#FEE6E7"
            />
            {/* Light mint green rounded triangle */}
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

    // Default: Two overlapping circles from reference 1 & 2
    return (
      <>
        <div
          className="leafy-deco-circle leafy-circle-dark"
          style={{ backgroundColor: t.darkCircle }}
        />
        <div
          className="leafy-deco-circle leafy-circle-light"
          style={{ backgroundColor: t.lightCircle }}
        />
      </>
    );
  };

  return (
    <div
      className={`leafy-plant-card ${isActive ? 'active-card' : 'stacked-card'} ${isPeek ? 'peek-card' : ''} ${className}`}
      style={{
        backgroundColor: theme.bg,
        ...style
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${plant.name}, ${plant.species}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Top Header Row */}
      <div className="leafy-card-header">
        <div className="leafy-card-title-group">
          <div className="leafy-card-top-row">
            <span className="leafy-card-number">{formattedIndex}</span>
            {!isActive && (
              <span className="leafy-card-stacked-name">{plant.name}</span>
            )}
          </div>
          {isActive && (
            <>
              <h2 className="leafy-card-nickname">{plant.name}</h2>
              <span
                className="leafy-card-species"
                style={{ color: theme.speciesColor }}
              >
                {plant.species}
              </span>
            </>
          )}
        </div>

        <div className="leafy-card-icon-wrap" aria-hidden="true">
          <ReferenceLeafIcon size={24} color="#1D2820" />
        </div>
      </div>

      {/* Decorative Shapes & Transparent Plant Cutout Stage */}
      <div className="leafy-card-visual-stage">
        {renderDecoShapes(theme)}

        {/* Plant Image Cutout with Independent Subtle 3D Parallax */}
        <img
          src={plantImage}
          alt={plant.name}
          className="leafy-card-plant-img"
          loading="eager"
          draggable={false}
          style={{
            transform: parallaxOffsetY !== 0 || parallaxOffsetZ !== 0
              ? `translate3d(0, ${parallaxOffsetY.toFixed(1)}px, ${parallaxOffsetZ.toFixed(1)}px)`
              : undefined
          }}
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import type { Plant } from '../../types/plant';
import { PlantStack } from './PlantStack';
import { NavBookIcon, NavPlusIcon, NavSettingsIcon, EditPencilIcon } from './Icons';
import { EditOwnerNameModal } from './EditOwnerNameModal';
import { formatPossessiveName } from '../../utils/plantDate';

export interface LeafyHomeCollectionProps {
  plants: Plant[];
  activePlantIndex: number;
  onActiveIndexChange: (idx: number) => void;
  onOpenPlantDetail: (plant: Plant) => void;
  onOpenPlantBook: () => void;
  onOpenAddPlant: () => void;
  onOpenSettings: () => void;
  ownerName?: string;
  onSaveOwnerName?: (name: string) => void;
  className?: string;
}

export const LeafyHomeCollection: React.FC<LeafyHomeCollectionProps> = ({
  plants,
  activePlantIndex,
  onActiveIndexChange,
  onOpenPlantDetail,
  onOpenPlantBook,
  onOpenAddPlant,
  onOpenSettings,
  ownerName = 'Kanak',
  onSaveOwnerName,
  className = ''
}) => {
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  const possessiveTitle = formatPossessiveName(ownerName);

  return (
    <div className={`leafy-collection-screen ${className}`}>
      {/* Top Header Row with Editable Name */}
      <header className="leafy-collection-header">
        <div
          className="leafy-collection-owner-row"
          onClick={() => setIsEditNameOpen(true)}
          role="button"
          tabIndex={0}
          title="Click to edit collection name"
          aria-label={`Collection owner: ${ownerName}. Click to edit name.`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsEditNameOpen(true);
            }
          }}
        >
          <h1 className="leafy-collection-owner">{possessiveTitle}</h1>
          <span className="leafy-owner-edit-badge" aria-hidden="true">
            <EditPencilIcon size={16} color="#718096" />
          </span>
        </div>
        <p className="leafy-collection-subtitle">Plant Collection</p>
      </header>

      {/* Main Overlapping Cards Stack */}
      <main className="leafy-collection-main">
        <PlantStack
          plants={plants}
          activeIndex={activePlantIndex}
          onActiveChange={onActiveIndexChange}
          onOpenDetail={onOpenPlantDetail}
        />
      </main>

      {/* Bottom Standalone Navigation Icons (Elevated Plus in Center, No Bar, No Container) */}
      <nav className="leafy-standalone-bottom-nav" aria-label="Quick Actions">
        <div className="leafy-nav-plus-anchor">
          <button
            className="leafy-nav-standalone-btn plus-btn"
            onClick={onOpenAddPlant}
            aria-label="Add New Plant"
            title="Add Plant"
          >
            <NavPlusIcon size={34} color="#000000" />
          </button>
        </div>

        <div className="leafy-nav-bottom-row">
          <button
            className="leafy-nav-standalone-btn"
            onClick={onOpenPlantBook}
            aria-label="Open Plant Book"
            title="Plant Book"
          >
            <NavBookIcon size={28} color="#000000" />
          </button>

          <button
            className="leafy-nav-standalone-btn"
            onClick={onOpenSettings}
            aria-label="Settings"
            title="Settings"
          >
            <NavSettingsIcon size={26} color="#000000" />
          </button>
        </div>
      </nav>

      {/* Edit Collection Owner Name Modal */}
      <EditOwnerNameModal
        isOpen={isEditNameOpen}
        currentName={ownerName}
        onSave={(newName) => {
          onSaveOwnerName?.(newName);
        }}
        onClose={() => setIsEditNameOpen(false)}
      />
    </div>
  );
};

import React, { useState } from 'react';
import type { Plant, JournalEntry } from '../../types/plant';
import { PlantHero } from './PlantHero';
import { PlantInfoTile } from './PlantInfoTile';
import { EditPlantAgeModal } from './EditPlantAgeModal';

export interface LeafyPlantDetailScreenProps {
  plant: Plant;
  journalEntries?: JournalEntry[];
  onBack: () => void;
  onExploreSpecies: (species: string) => void;
  onEditPlant?: (plant: Plant) => void;
  onWaterPlant?: (plant: Plant) => void;
  onUpdatePlantAge?: (plantId: string, newAge: string, newBirthDate?: string) => void;
  className?: string;
}

export const LeafyPlantDetailScreen: React.FC<LeafyPlantDetailScreenProps> = ({
  plant,
  journalEntries = [],
  onBack,
  onExploreSpecies,
  onEditPlant,
  onWaterPlant,
  onUpdatePlantAge,
  className = ''
}) => {
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);

  return (
    <div className={`leafy-detail-screen ${className}`}>
      <div className="leafy-detail-scroll-container">
        {/* Top Hero Card */}
        <PlantHero
          plant={plant}
          onBack={onBack}
          onEdit={onEditPlant ? () => onEditPlant(plant) : undefined}
        />

        {/* Modular Bento Information Panels */}
        <PlantInfoTile
          plant={plant}
          onExploreSpecies={onExploreSpecies}
          onWaterCycleClick={() => onWaterPlant?.(plant)}
          onEditAge={() => setIsAgeModalOpen(true)}
        />

        {/* Extended Plant Details (when scrolled) */}
        {journalEntries.length > 0 && (
          <div className="leafy-detail-journal-section">
            <h4 className="leafy-detail-section-title">Care History</h4>
            <div className="leafy-detail-journal-list">
              {journalEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="leafy-detail-journal-item">
                  <div className="leafy-journal-item-header">
                    <span className="leafy-journal-date">{entry.date}</span>
                    <span className="leafy-journal-condition">{entry.condition || 'Healthy'}</span>
                  </div>
                  <p className="leafy-journal-notes">{entry.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editable Plant Age + Confirmation Popup Modal */}
      <EditPlantAgeModal
        isOpen={isAgeModalOpen}
        plant={plant}
        onSave={(plantId, newAge, newBirthDate) => {
          onUpdatePlantAge?.(plantId, newAge, newBirthDate);
        }}
        onClose={() => setIsAgeModalOpen(false)}
      />
    </div>
  );
};

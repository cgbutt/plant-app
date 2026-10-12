import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Plant, GrowthStage, JournalEntry, PlantPhoto } from './types/plant';
import { StorageService } from './services/storage';
import { LeftPanel } from './components/LeftPanel';
import { ThreePlantViewer } from './components/ThreePlantViewer';
import { StageSwitcher } from './components/StageSwitcher';
import { RightPhotoViewer } from './components/RightPhotoViewer';
import { JournalModal } from './components/JournalModal';
import { PhotosModal } from './components/PhotosModal';
import { ModelManagementModal } from './components/ModelManagementModal';
import { AddEditPlantModal } from './components/AddEditPlantModal';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { SupabaseModal } from './components/SupabaseModal';
import { LeftMenuBar } from './components/LeftMenuBar';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import './index.css';

export const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [photos, setPhotos] = useState<PlantPhoto[]>([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>('');

  // Left Menu Bar Drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Right Panel Toggle: '3d' or 'photos'
  const [rightViewMode, setRightViewMode] = useState<'3d' | 'photos'>('3d');
  // Phone simulation view mode for testing
  const [isPhonePreview, setIsPhonePreview] = useState(false);

  // Modal active state
  const [activeModal, setActiveModal] = useState<
    'add' | 'edit' | 'journal' | 'photos' | 'models' | 'ai' | 'supabase' | 'account' | null
  >(null);

  // Idle detection for 3D card & photo viewer controls
  const [isCardIdle, setIsCardIdle] = useState(false);
  const [isControlsLockedOpen, setIsControlsLockedOpen] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetCardIdleTimer = useCallback(() => {
    setIsCardIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (!isControlsLockedOpen) {
      idleTimerRef.current = setTimeout(() => {
        setIsCardIdle(true);
      }, 3000); // Hide controls after 3s of inactivity
    }
  }, [isControlsLockedOpen]);

  useEffect(() => {
    resetCardIdleTimer();

    const handleUserActivity = () => {
      resetCardIdleTimer();
    };

    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('pointermove', handleUserActivity, { passive: true });
    window.addEventListener('pointerdown', handleUserActivity, { passive: true });
    window.addEventListener('touchstart', handleUserActivity, { passive: true });
    window.addEventListener('wheel', handleUserActivity, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('pointermove', handleUserActivity);
      window.removeEventListener('pointerdown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('wheel', handleUserActivity);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetCardIdleTimer]);

  // Initialize data
  useEffect(() => {
    const loadedPlants = StorageService.getPlants();
    setPlants(loadedPlants);
    if (loadedPlants.length > 0) {
      setSelectedPlantId(loadedPlants[0].id);
    }
  }, []);

  // Sync journal and photos when selected plant changes
  useEffect(() => {
    if (selectedPlantId) {
      const plantEntries = StorageService.getJournalEntries(selectedPlantId);
      const plantPhotos = StorageService.getPhotos(selectedPlantId);
      setJournalEntries(plantEntries);
      setPhotos(plantPhotos);
      if (plantPhotos.length > 0) {
        setSelectedPhotoId(plantPhotos[0].id);
      }
    }
  }, [selectedPlantId]);

  const currentPlant = plants.find((p) => p.id === selectedPlantId) || plants[0];
  const activePhoto = photos.find((p) => p.id === selectedPhotoId) || photos[0];

  if (!currentPlant) {
    return (
      <div className="app-frame loading-frame">
        <div>INITIALIZING ASPER PLANT JOURNAL...</div>
      </div>
    );
  }

  // Active 3D model for current stage
  const currentStage: GrowthStage = currentPlant.current_stage || 1;
  const currentModelUrl =
    currentStage === 1
      ? currentPlant.stage1_model
      : currentStage === 2
      ? currentPlant.stage2_model
      : currentPlant.stage3_model;

  const handleStageChange = (newStage: GrowthStage) => {
    const stageLabel =
      newStage === 1 ? '01 / Young' : newStage === 2 ? '02 / Growing' : '03 / Mature';
    const updated: Plant = {
      ...currentPlant,
      current_stage: newStage,
      growth_stage_label: stageLabel
    };
    const updatedList = StorageService.updatePlant(updated);
    setPlants(updatedList);
  };

  const handlePlantSave = (savedPlant: Plant) => {
    const updatedList = StorageService.getPlants();
    setPlants(updatedList);
    setSelectedPlantId(savedPlant.id);
  };

  const handleRefreshData = () => {
    if (selectedPlantId) {
      const plantEntries = StorageService.getJournalEntries(selectedPlantId);
      const plantPhotos = StorageService.getPhotos(selectedPlantId);
      setJournalEntries(plantEntries);
      setPhotos(plantPhotos);
    }
  };

  return (
    <div className={`asper-viewport ${isPhonePreview ? 'phone-mode-active' : ''}`}>
      <div className="asper-layout-container">
        {/* LEFT COLUMN: Data, Metrics Grid & Interactive Plant Doc */}
        <div className="asper-left-column">
          <LeftPanel
            plant={currentPlant}
            plants={plants}
            journalEntries={journalEntries}
            photos={photos}
            activePhoto={activePhoto}
            onSelectPlant={(p) => setSelectedPlantId(p.id)}
            onOpenAddPlant={() => setActiveModal('add')}
            onOpenEditPlant={() => setActiveModal('edit')}
            onOpenJournal={() => setActiveModal('journal')}
            onOpenPhotos={() => setActiveModal('photos')}
            onOpenMenu={() => setIsMenuOpen(true)}
            onStageChange={handleStageChange}
            onPlantUpdated={handlePlantSave}
          />
        </div>

        {/* RIGHT COLUMN: Toggleable Large Rounded Container (3D Model / Photos) */}
        <div className="asper-right-column">
          <div
            className={`asper-3d-card ${isCardIdle && !isControlsLockedOpen ? 'viewer-idle' : ''}`}
            onMouseMove={resetCardIdleTimer}
            onMouseEnter={resetCardIdleTimer}
            onTouchStart={resetCardIdleTimer}
            onTouchMove={resetCardIdleTimer}
          >
            {/* Top Switcher: 3D Model vs Photos */}
            <div className="viewer-mode-header">
              <div className="viewer-tabs">
                <button
                  className={`viewer-tab-btn ${rightViewMode === '3d' ? 'active' : ''}`}
                  onClick={() => setRightViewMode('3d')}
                >
                  3D MODEL
                </button>
                <button
                  className={`viewer-tab-btn ${rightViewMode === 'photos' ? 'active' : ''}`}
                  onClick={() => setRightViewMode('photos')}
                >
                  YOUR PHOTOS ({photos.length})
                </button>
              </div>
            </div>

            {/* Mode 1: 3D Model View */}
            {rightViewMode === '3d' && (
              <>
                <ThreePlantViewer
                  modelUrl={currentModelUrl}
                  species={currentPlant.species}
                  stage={currentStage}
                />

                <StageSwitcher
                  currentStage={currentStage}
                  onStageChange={handleStageChange}
                  hasCustomModels={{
                    stage1: Boolean(currentPlant.stage1_model),
                    stage2: Boolean(currentPlant.stage2_model),
                    stage3: Boolean(currentPlant.stage3_model)
                  }}
                />
              </>
            )}

            {/* Mode 2: Real Photos View */}
            {rightViewMode === 'photos' && (
              <RightPhotoViewer
                plant={currentPlant}
                photos={photos}
                selectedPhotoId={selectedPhotoId}
                onSelectPhoto={(photo) => setSelectedPhotoId(photo.id)}
                onRefreshPhotos={handleRefreshData}
                onOpenGallery={() => setActiveModal('photos')}
                onControlsActiveChange={(active) => setIsControlsLockedOpen(active)}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === 'journal' && (
        <JournalModal
          plant={currentPlant}
          entries={journalEntries}
          onClose={() => setActiveModal(null)}
          onRefresh={handleRefreshData}
        />
      )}

      {activeModal === 'photos' && (
        <PhotosModal
          plant={currentPlant}
          photos={photos}
          onClose={() => setActiveModal(null)}
          onRefresh={handleRefreshData}
        />
      )}

      {activeModal === 'models' && (
        <ModelManagementModal
          plant={currentPlant}
          onClose={() => setActiveModal(null)}
          onPlantUpdated={handlePlantSave}
        />
      )}

      {activeModal === 'add' && (
        <AddEditPlantModal
          plant={null}
          onClose={() => setActiveModal(null)}
          onSave={handlePlantSave}
        />
      )}

      {activeModal === 'edit' && (
        <AddEditPlantModal
          plant={currentPlant}
          onClose={() => setActiveModal(null)}
          onSave={handlePlantSave}
        />
      )}

      {activeModal === 'ai' && (
        <AiAnalysisModal
          plant={currentPlant}
          journalEntries={journalEntries}
          photos={photos}
          onClose={() => setActiveModal(null)}
          onPlantUpdated={handlePlantSave}
        />
      )}

      {activeModal === 'supabase' && (
        <SupabaseModal onClose={() => setActiveModal(null)} />
      )}

      {/* LEFT MENU BAR DRAWER */}
      <LeftMenuBar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAiConfig={() => setActiveModal('ai')}
        onOpen3dModels={() => setActiveModal('models')}
        onOpenEditPlant={() => setActiveModal('edit')}
        onOpenDatabase={() => setActiveModal('supabase')}
        onOpenSettings={() => setActiveModal('account')}
        onOpenAccount={() => setActiveModal('account')}
        isPhonePreview={isPhonePreview}
        onTogglePhonePreview={() => setIsPhonePreview(!isPhonePreview)}
        plantName={currentPlant.name || 'Monstera'}
      />

      {/* ACCOUNT & SETTINGS MODAL */}
      <AccountSettingsModal
        isOpen={activeModal === 'account'}
        onClose={() => setActiveModal(null)}
        plantCount={plants.length}
        journalCount={journalEntries.length}
        photoCount={photos.length}
      />
    </div>
  );
};

export default App;

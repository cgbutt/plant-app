import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Plant, GrowthStage, JournalEntry, PlantPhoto } from './types/plant';
import type { EncyclopediaPlant } from './types/encyclopedia';
import { StorageService } from './services/storage';
import { PlantEncyclopediaService } from './data/plantEncyclopedia';
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

// Plant Book Encyclopedia Components
import { PlantBookMain } from './components/plantbook/PlantBookMain';
import { PlantDetailView } from './components/plantbook/PlantDetailView';
import { AddToGardenModal } from './components/plantbook/AddToGardenModal';
import { BottomNavBar, type NavTab } from './components/plantbook/BottomNavBar';

import './index.css';
import './plantbook.css';

type AppViewMode = 'journal' | 'plantbook' | 'plantbook-detail';

export const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [photos, setPhotos] = useState<PlantPhoto[]>([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>('');

  // Primary View Mode (Journal vs Plant Book vs Detail)
  const [viewMode, setViewMode] = useState<AppViewMode>('journal');
  const [selectedEncyclopediaPlant, setSelectedEncyclopediaPlant] = useState<EncyclopediaPlant | null>(null);
  const [activeGardenModalPlant, setActiveGardenModalPlant] = useState<EncyclopediaPlant | null>(null);

  // Left Menu Bar Drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Right Panel Toggle: '3d' or 'photos'
  const [rightViewMode, setRightViewMode] = useState<'3d' | 'photos'>('3d');
  // Phone simulation view mode
  const [isPhonePreview, setIsPhonePreview] = useState(false);

  // Active Bottom Nav Tab
  const [currentNavTab, setCurrentNavTab] = useState<NavTab>('home');

  // Modal active state
  const [activeModal, setActiveModal] = useState<
    'add' | 'edit' | 'journal' | 'photos' | 'models' | 'ai' | 'supabase' | 'account' | null
  >(null);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

  // Synchronize URL hash with View Mode & Browser History
  const handleHashChange = useCallback(() => {
    const rawHash = window.location.hash || '';
    const hash = rawHash.toLowerCase();

    if (hash.startsWith('#/plant-book/') || hash.startsWith('#/book/')) {
      const slug = hash.replace(/^#\/(plant-book|book)\//, '').trim();
      const plant = PlantEncyclopediaService.getPlantById(slug);
      if (plant) {
        setSelectedEncyclopediaPlant(plant);
        setViewMode('plantbook-detail');
        setCurrentNavTab('plantbook');
        return;
      }
    }

    if (hash === '#/plant-book' || hash === '#/book') {
      setViewMode('plantbook');
      setSelectedEncyclopediaPlant(null);
      setCurrentNavTab('plantbook');
      return;
    }

    // Default to journal view
    setViewMode('journal');
    setCurrentNavTab('home');
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  // Navigation Helpers
  const navigateToPlantBook = () => {
    window.location.hash = '#/plant-book';
  };

  const navigateToPlantDetail = (plant: EncyclopediaPlant) => {
    window.location.hash = `#/plant-book/${plant.id}`;
  };

  const navigateToJournal = () => {
    window.location.hash = '';
  };

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
        <div>INITIALIZING ASPER PLANT JOURNAL & ENCYCLOPEDIA...</div>
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

  // Handle adding plant from encyclopedia into personal garden
  const handleGardenPlantAdded = (newPlant: Plant) => {
    const updatedList = StorageService.getPlants();
    setPlants(updatedList);
    setSelectedPlantId(newPlant.id);
    setActiveGardenModalPlant(null);
    navigateToJournal();
    showToast(`✓ Added ${newPlant.name} to your garden!`);
  };

  // Bottom Navigation Tab handler
  const handleBottomNavSelect = (tab: NavTab) => {
    setCurrentNavTab(tab);
    if (tab === 'home') {
      navigateToJournal();
    } else if (tab === 'plantbook') {
      navigateToPlantBook();
    } else if (tab === 'myplants') {
      navigateToJournal();
      setIsMenuOpen(true);
    } else if (tab === 'profile') {
      setActiveModal('account');
    }
  };

  return (
    <div className={`asper-viewport ${isPhonePreview ? 'phone-mode-active' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="plant-detail-toast">
          {toastMessage}
        </div>
      )}

      {/* VIEW MODE 1: Plant Book Main Encyclopedia Page */}
      {viewMode === 'plantbook' && (
        <PlantBookMain
          onSelectPlant={navigateToPlantDetail}
          onOpenMenu={() => setIsMenuOpen(true)}
          onReturnToJournal={navigateToJournal}
          isPhonePreview={isPhonePreview}
        />
      )}

      {/* VIEW MODE 2: Individual Plant Information Page */}
      {viewMode === 'plantbook-detail' && selectedEncyclopediaPlant && (
        <PlantDetailView
          plant={selectedEncyclopediaPlant}
          onBack={navigateToPlantBook}
          onAddToGarden={(p) => setActiveGardenModalPlant(p)}
        />
      )}

      {/* VIEW MODE 3: Classic 3D Botanical Plant Journal */}
      {viewMode === 'journal' && (
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
              onOpenPlantBook={navigateToPlantBook}
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
      )}

      {/* Floating Bottom Navigation Bar (Visible on mobile screens & phone preview mode) */}
      <BottomNavBar
        currentTab={currentNavTab}
        onSelectTab={handleBottomNavSelect}
        onAddClick={() => setActiveModal('add')}
      />

      {/* ADD TO MY GARDEN PREFILL MODAL */}
      {activeGardenModalPlant && (
        <AddToGardenModal
          plant={activeGardenModalPlant}
          onClose={() => setActiveGardenModalPlant(null)}
          onAdded={handleGardenPlantAdded}
        />
      )}

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
        onOpenPlantBook={navigateToPlantBook}
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

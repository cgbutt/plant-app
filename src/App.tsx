import React, { useState, useEffect, useCallback } from 'react';
import type { Plant, JournalEntry, PlantPhoto } from './types/plant';
import type { EncyclopediaPlant } from './types/encyclopedia';
import { StorageService } from './services/storage';
import { PlantEncyclopediaService } from './data/plantEncyclopedia';

// Leafy UI/UX Design System Components
import { LeafyNavbar, type LeafyNavDestination } from './components/leafy/LeafyNavbar';
import { LeafyBottomNav } from './components/leafy/LeafyBottomNav';
import { LeafyHomeView } from './components/leafy/LeafyHomeView';
import { LeafyPlantBookView } from './components/leafy/LeafyPlantBookView';
import { LeafyPlantDetailView } from './components/leafy/LeafyPlantDetailView';
import { LeafyJournalView } from './components/leafy/LeafyJournalView';
import { LeafyJournalEntryModal } from './components/leafy/LeafyJournalEntryModal';

// Existing Feature Modals (Preserved)
import { AddToGardenModal } from './components/plantbook/AddToGardenModal';
import { AddEditPlantModal } from './components/AddEditPlantModal';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { SupabaseModal } from './components/SupabaseModal';
import { LeftMenuBar } from './components/LeftMenuBar';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import { ModelManagementModal } from './components/ModelManagementModal';
import { PhotosModal } from './components/PhotosModal';

import './index.css';
import './plantbook.css';
import './leafy-theme.css';

type LeafyViewMode = 'home' | 'explore' | 'plantbook-detail' | 'journal';

export const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string>('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [photos, setPhotos] = useState<PlantPhoto[]>([]);

  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<LeafyViewMode>('home');
  const [previousViewMode, setPreviousViewMode] = useState<LeafyViewMode>('home');
  const [selectedEncyclopediaPlant, setSelectedEncyclopediaPlant] = useState<EncyclopediaPlant | null>(null);
  const [activeGardenModalPlant, setActiveGardenModalPlant] = useState<EncyclopediaPlant | null>(null);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'add' | 'edit' | 'journal-leafy' | 'photos' | 'models' | 'ai' | 'supabase' | 'account' | 'plus-choice' | null
  >(null);
  const [editingJournalEntry, setEditingJournalEntry] = useState<JournalEntry | null>(null);

  // Left Menu Bar Drawer state & Phone preview
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhonePreview, setIsPhonePreview] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize URL hash with View Mode & Browser History
  const handleHashChange = useCallback(() => {
    const rawHash = window.location.hash || '';
    const hash = rawHash.toLowerCase();

    if (hash.startsWith('#/plant-book/') || hash.startsWith('#/book/') || hash.startsWith('#/plant/')) {
      const slug = hash.replace(/^#\/(plant-book|book|plant)\//, '').trim();
      const plant = PlantEncyclopediaService.getPlantById(slug);
      if (plant) {
        setSelectedEncyclopediaPlant(plant);
        setViewMode('plantbook-detail');
        return;
      }
    }

    if (hash === '#/plant-book' || hash === '#/explore' || hash === '#/book') {
      setViewMode('explore');
      setSelectedEncyclopediaPlant(null);
      return;
    }

    if (hash === '#/journal') {
      setViewMode('journal');
      setSelectedEncyclopediaPlant(null);
      return;
    }

    // Default to Home (My Garden)
    setViewMode('home');
    setSelectedEncyclopediaPlant(null);
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  // Navigation helpers
  const navigateToHome = () => {
    setViewMode('home');
    setSelectedEncyclopediaPlant(null);
    window.location.hash = '#/';
  };

  const navigateToExplore = () => {
    setViewMode('explore');
    setSelectedEncyclopediaPlant(null);
    window.location.hash = '#/explore';
  };

  const navigateToJournal = () => {
    setViewMode('journal');
    setSelectedEncyclopediaPlant(null);
    window.location.hash = '#/journal';
  };

  const navigateToPlantDetail = (plant: EncyclopediaPlant) => {
    setPreviousViewMode(viewMode);
    setSelectedEncyclopediaPlant(plant);
    setViewMode('plantbook-detail');
    window.location.hash = `#/plant-book/${plant.id}`;
  };

  // Initialize data
  useEffect(() => {
    const loadedPlants = StorageService.getPlants();
    setPlants(loadedPlants);
    if (loadedPlants.length > 0) {
      setSelectedPlantId(loadedPlants[0].id);
    }
    const allJournalEntries = StorageService.getJournalEntries();
    setJournalEntries(allJournalEntries);
    const allPhotos = StorageService.getPhotos();
    setPhotos(allPhotos);
  }, []);

  // Sync data when plant changes
  const refreshData = () => {
    const loadedPlants = StorageService.getPlants();
    setPlants(loadedPlants);
    const allJournalEntries = StorageService.getJournalEntries();
    setJournalEntries(allJournalEntries);
    const allPhotos = StorageService.getPhotos();
    setPhotos(allPhotos);
  };

  const currentPlant = plants.find((p) => p.id === selectedPlantId) || plants[0];

  // Plant card click from My Garden (Screen 01)
  const handleOpenGardenPlantDetail = (plant: Plant) => {
    setSelectedPlantId(plant.id);
    // Find matching encyclopedia plant species
    const match =
      PlantEncyclopediaService.getAllPlants().find(
        (ep) =>
          ep.common_name.toLowerCase().includes(plant.name.toLowerCase()) ||
          plant.species.toLowerCase().includes(ep.common_name.toLowerCase()) ||
          ep.scientific_name.toLowerCase().includes(plant.species.toLowerCase())
      ) || PlantEncyclopediaService.getAllPlants()[0];

    navigateToPlantDetail(match);
  };

  // Plant added to garden handler
  const handleGardenPlantAdded = (newPlant: Plant) => {
    const updatedList = StorageService.getPlants();
    setPlants(updatedList);
    setSelectedPlantId(newPlant.id);
    setActiveGardenModalPlant(null);
    navigateToHome();
    showToast(`✓ Added ${newPlant.name} to your garden!`);
  };

  // Plant saved from modal
  const handlePlantSave = (savedPlant: Plant) => {
    const updatedList = StorageService.getPlants();
    setPlants(updatedList);
    setSelectedPlantId(savedPlant.id);
    showToast(`✓ Saved ${savedPlant.name}`);
  };

  // Bottom Nav Selection handler
  const handleBottomNavSelect = (tab: LeafyNavDestination | 'profile') => {
    if (tab === 'home') {
      navigateToHome();
    } else if (tab === 'explore') {
      navigateToExplore();
    } else if (tab === 'journal') {
      navigateToJournal();
    } else if (tab === 'profile') {
      setActiveModal('account');
    }
  };

  // Map active destination for desktop navbar and mobile bottom nav
  const activeNavDest: LeafyNavDestination =
    viewMode === 'explore' || viewMode === 'plantbook-detail'
      ? 'explore'
      : viewMode === 'journal'
      ? 'journal'
      : 'home';

  return (
    <div className={`leafy-app-shell ${isPhonePreview ? 'phone-mode-active' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="leafy-toast-notice">
          {toastMessage}
        </div>
      )}

      {/* Desktop Top Navigation Bar */}
      <LeafyNavbar
        currentTab={activeNavDest}
        onSelectTab={(tab) => {
          if (tab === 'home') navigateToHome();
          else if (tab === 'explore') navigateToExplore();
          else if (tab === 'journal') navigateToJournal();
        }}
        onOpenAddPlant={() => setActiveModal('add')}
        onOpenAi={() => setActiveModal('ai')}
        onOpen3dModels={() => setActiveModal('models')}
        onOpenProfile={() => setActiveModal('account')}
      />

      {/* Main Content Area */}
      <main className="leafy-main-content">
        {/* SCREEN 1: Home / My Garden */}
        {viewMode === 'home' && (
          <LeafyHomeView
            plants={plants}
            journalEntries={journalEntries}
            photos={photos}
            selectedPlantId={selectedPlantId}
            onSelectPlant={(p) => setSelectedPlantId(p.id)}
            onOpenPlantDetail={handleOpenGardenPlantDetail}
            onOpenAddPlant={() => setActiveModal('add')}
            onOpenJournal={navigateToJournal}
            onOpenExplore={navigateToExplore}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenProfile={() => setActiveModal('account')}
            onOpenAi={() => setActiveModal('ai')}
          />
        )}

        {/* SCREEN 2: Plant Book / Encyclopedia */}
        {viewMode === 'explore' && (
          <LeafyPlantBookView
            onSelectPlant={navigateToPlantDetail}
            onOpenMenu={() => setIsMenuOpen(true)}
            isPhonePreview={isPhonePreview}
          />
        )}

        {/* SCREEN 3: Plant Detail / Care Screen */}
        {viewMode === 'plantbook-detail' && selectedEncyclopediaPlant && (
          <LeafyPlantDetailView
            plant={selectedEncyclopediaPlant}
            userPlant={currentPlant}
            journalEntries={journalEntries.filter(
              (e) => currentPlant && e.plant_id === currentPlant.id
            )}
            onBack={() => {
              if (previousViewMode === 'home') navigateToHome();
              else navigateToExplore();
            }}
            onAddToGarden={(p) => setActiveGardenModalPlant(p)}
            onOpenAi={() => setActiveModal('ai')}
          />
        )}

        {/* SCREEN 4: Plant Journal */}
        {viewMode === 'journal' && (
          <LeafyJournalView
            journalEntries={journalEntries}
            plants={plants}
            photos={photos}
            onOpenNewEntry={() => {
              setEditingJournalEntry(null);
              setActiveModal('journal-leafy');
            }}
            onEditEntry={(entry) => {
              setEditingJournalEntry(entry);
              setActiveModal('journal-leafy');
            }}
            onRefreshEntries={refreshData}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Matching Reference Image) */}
      <LeafyBottomNav
        currentTab={activeNavDest}
        onSelectTab={handleBottomNavSelect}
        onOpenAddAction={() => setActiveModal('plus-choice')}
      />

      {/* Elevated Plus Button Choice Modal */}
      {activeModal === 'plus-choice' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div
            className="modal-card"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '380px',
              width: '90%',
              padding: '24px',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
              Add to Garden
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
              What would you like to document today?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                className="leafy-btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  setActiveModal('add');
                }}
              >
                🌱 + Add New Plant
              </button>

              <button
                className="leafy-btn-secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  setEditingJournalEntry(null);
                  setActiveModal('journal-leafy');
                }}
              >
                📝 + New Journal Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leafy Journal Entry Modal (Create / Edit) */}
      {activeModal === 'journal-leafy' && (
        <LeafyJournalEntryModal
          plants={plants}
          currentPlant={currentPlant}
          editingEntry={editingJournalEntry}
          onClose={() => {
            setActiveModal(null);
            setEditingJournalEntry(null);
          }}
          onSaved={() => {
            refreshData();
            showToast('✓ Journal entry saved!');
          }}
        />
      )}

      {/* Add To Garden Prefill Modal */}
      {activeGardenModalPlant && (
        <AddToGardenModal
          plant={activeGardenModalPlant}
          onClose={() => setActiveGardenModalPlant(null)}
          onAdded={handleGardenPlantAdded}
        />
      )}

      {/* Add Plant Modal */}
      {activeModal === 'add' && (
        <AddEditPlantModal
          plant={null}
          onClose={() => setActiveModal(null)}
          onSave={handlePlantSave}
        />
      )}

      {/* Edit Plant Modal */}
      {activeModal === 'edit' && currentPlant && (
        <AddEditPlantModal
          plant={currentPlant}
          onClose={() => setActiveModal(null)}
          onSave={handlePlantSave}
        />
      )}

      {/* AI Diagnosis Modal */}
      {activeModal === 'ai' && currentPlant && (
        <AiAnalysisModal
          plant={currentPlant}
          journalEntries={journalEntries}
          photos={photos}
          onClose={() => setActiveModal(null)}
          onPlantUpdated={handlePlantSave}
        />
      )}

      {/* 3D Model Management Modal */}
      {activeModal === 'models' && currentPlant && (
        <ModelManagementModal
          plant={currentPlant}
          onClose={() => setActiveModal(null)}
          onPlantUpdated={handlePlantSave}
        />
      )}

      {/* Photos Modal */}
      {activeModal === 'photos' && currentPlant && (
        <PhotosModal
          plant={currentPlant}
          photos={photos}
          onClose={() => setActiveModal(null)}
          onRefresh={refreshData}
        />
      )}

      {/* Supabase Database Sync Modal */}
      {activeModal === 'supabase' && (
        <SupabaseModal onClose={() => setActiveModal(null)} />
      )}

      {/* Account & Settings Modal */}
      <AccountSettingsModal
        isOpen={activeModal === 'account'}
        onClose={() => setActiveModal(null)}
        plantCount={plants.length}
        journalCount={journalEntries.length}
        photoCount={photos.length}
      />

      {/* Left Menu Drawer (Settings, DB, Phone Preview, 3D) */}
      <LeftMenuBar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenPlantBook={navigateToExplore}
        onOpenAiConfig={() => setActiveModal('ai')}
        onOpen3dModels={() => setActiveModal('models')}
        onOpenEditPlant={() => setActiveModal('edit')}
        onOpenDatabase={() => setActiveModal('supabase')}
        onOpenSettings={() => setActiveModal('account')}
        onOpenAccount={() => setActiveModal('account')}
        isPhonePreview={isPhonePreview}
        onTogglePhonePreview={() => setIsPhonePreview(!isPhonePreview)}
        plantName={currentPlant?.name || 'Monstera'}
      />
    </div>
  );
};

export default App;

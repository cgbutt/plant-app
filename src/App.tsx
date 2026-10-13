import React, { useState, useEffect, useCallback } from 'react';
import type { Plant, JournalEntry, PlantPhoto } from './types/plant';
import type { EncyclopediaPlant } from './types/encyclopedia';
import type { UserProfile, AuthMode } from './types/auth';
import { StorageService } from './services/storage';
import { PlantEncyclopediaService } from './data/plantEncyclopedia';
import { AuthService } from './services/auth';
import { CloudStorageService } from './services/cloudStorage';

// Leafy UI/UX Design System Components
import { LeafyNavbar, type LeafyNavDestination } from './components/leafy/LeafyNavbar';
import { LeafyBottomNav } from './components/leafy/LeafyBottomNav';
import { LeafyHomeView } from './components/leafy/LeafyHomeView';
import { LeafyPlantBookView } from './components/leafy/LeafyPlantBookView';
import { LeafyPlantDetailView } from './components/leafy/LeafyPlantDetailView';
import { LeafyJournalView } from './components/leafy/LeafyJournalView';
import { LeafyJournalEntryModal } from './components/leafy/LeafyJournalEntryModal';
import { LeafyAuthModal } from './components/leafy/LeafyAuthModal';
import { LeafyAccountModal } from './components/leafy/LeafyAccountModal';
import { LeafySupabaseConfigModal } from './components/leafy/LeafySupabaseConfigModal';

// Existing Feature Modals (Preserved)
import { AddToGardenModal } from './components/plantbook/AddToGardenModal';
import { AddEditPlantModal } from './components/AddEditPlantModal';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { LeftMenuBar } from './components/LeftMenuBar';
import { ModelManagementModal } from './components/ModelManagementModal';
import { PhotosModal } from './components/PhotosModal';

import './index.css';
import './plantbook.css';
import './leafy-theme.css';

type LeafyViewMode = 'home' | 'explore' | 'plantbook-detail' | 'journal';

export const App: React.FC = () => {
  // Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');

  // Plant & Journal Collection State
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
    | 'add'
    | 'edit'
    | 'journal-leafy'
    | 'photos'
    | 'models'
    | 'ai'
    | 'supabase-config'
    | 'auth'
    | 'account'
    | 'plus-choice'
    | null
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

  // Check if unmigrated local data exists in localStorage
  const [hasLocalDataToMigrate, setHasLocalDataToMigrate] = useState(false);

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

  // Load data based on authentication status (Cloud vs Local)
  const refreshUserData = useCallback(async (user: any | null) => {
    if (user) {
      // 1. Authenticated user -> Load EXCLUSIVELY private cloud data from PostgreSQL
      const [cloudPlants, cloudEntries, cloudPhotos, profile] = await Promise.all([
        CloudStorageService.getPlants(user.id),
        CloudStorageService.getJournalEntries(user.id),
        CloudStorageService.getPhotos(user.id),
        AuthService.getCurrentProfile()
      ]);

      setUserProfile(profile);

      // STRICT ISOLATION: No demo fallback for authenticated accounts!
      setPlants(cloudPlants);
      setSelectedPlantId(cloudPlants.length > 0 ? cloudPlants[0].id : '');
      setJournalEntries(cloudEntries);
      setPhotos(cloudPhotos);

      // Check if user has non-demo local plants that can optionally be imported
      const rawLocal = StorageService.getRawLocalPlants();
      const hasGuestData = rawLocal.length > 0 && !StorageService.isDefaultDemoOnly(rawLocal);
      setHasLocalDataToMigrate(hasGuestData && cloudPlants.length === 0);
    } else {
      // 2. Guest user -> Load local preview storage
      setUserProfile(null);
      const localPlants = StorageService.getPlants();
      setPlants(localPlants);
      setSelectedPlantId(localPlants.length > 0 ? localPlants[0].id : '');
      setJournalEntries(StorageService.getJournalEntries());
      setPhotos(StorageService.getPhotos());
      setHasLocalDataToMigrate(false);
    }
  }, []);

  // Initialize Auth & listen for auth state changes
  useEffect(() => {
    // Initial user fetch
    AuthService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      refreshUserData(user);
    });

    // Reactive subscription for login/logout/token refresh
    const sub = AuthService.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      refreshUserData(user);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [refreshUserData]);

  const currentPlant = plants.find((p) => p.id === selectedPlantId) || plants[0];

  // Plant card click from My Garden (Screen 01)
  const handleOpenGardenPlantDetail = (plant: Plant) => {
    setSelectedPlantId(plant.id);
    let match: EncyclopediaPlant | undefined;

    // 1. Priority: exact species_id
    if (plant.species_id) {
      match = PlantEncyclopediaService.getPlantById(plant.species_id);
    }

    // 2. Fallback: match by common name, scientific name, or slug
    if (!match) {
      match = PlantEncyclopediaService.getAllPlants().find(
        (ep) =>
          ep.scientific_name.toLowerCase() === plant.species.toLowerCase() ||
          ep.common_name.toLowerCase() === plant.species.toLowerCase() ||
          ep.common_name.toLowerCase() === plant.name.toLowerCase() ||
          plant.species.toLowerCase().includes(ep.common_name.toLowerCase()) ||
          ep.scientific_name.toLowerCase().includes(plant.species.toLowerCase())
      );
    }

    // 3. Fallback: first encyclopedia plant
    if (!match) {
      match = PlantEncyclopediaService.getAllPlants()[0];
    }

    navigateToPlantDetail(match);
  };

  // Plant added to garden handler
  const handleGardenPlantAdded = async (newPlant: Plant) => {
    if (currentUser) {
      const saved = await CloudStorageService.savePlant(newPlant, currentUser.id);
      if (saved) {
        setPlants((prev) => [saved, ...prev]);
        setSelectedPlantId(saved.id);

        // Also create initial journal entry in cloud
        await CloudStorageService.saveJournalEntry(
          {
            id: '',
            plant_id: saved.id,
            date: new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }).toUpperCase(),
            title: 'SPECIMEN ADDED FROM PLANT BOOK',
            notes: `Added ${saved.name} (${saved.species}) to personal garden.`,
            created_at: new Date().toISOString()
          },
          currentUser.id
        );
        await refreshUserData(currentUser);
      }
    } else {
      const updatedList = StorageService.updatePlant(newPlant);
      StorageService.addJournalEntry({
        plant_id: newPlant.id,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase(),
        title: 'SPECIMEN ADDED FROM PLANT BOOK',
        notes: `Added ${newPlant.name} (${newPlant.species}) to personal garden.`
      });
      setPlants(updatedList);
      setSelectedPlantId(newPlant.id);
      setJournalEntries(StorageService.getJournalEntries());
    }
    setActiveGardenModalPlant(null);
    navigateToHome();
    showToast(`✓ Added ${newPlant.name} to your garden!`);
  };

  // Plant saved from modal (add or edit)
  const handlePlantSave = async (savedPlant: Plant) => {
    if (currentUser) {
      const saved = await CloudStorageService.savePlant(savedPlant, currentUser.id);
      if (saved) {
        setPlants((prev) => {
          const idx = prev.findIndex((p) => p.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
        setSelectedPlantId(saved.id);
      }
    } else {
      const updatedList = StorageService.updatePlant(savedPlant);
      setPlants(updatedList);
      setSelectedPlantId(savedPlant.id);
    }
    showToast(`✓ Saved ${savedPlant.name}`);
  };

  // Plant deletion handler
  const handlePlantDelete = async (plantId: string) => {
    if (currentUser) {
      await CloudStorageService.deletePlant(plantId, currentUser.id);
      setPlants((prev) => prev.filter((p) => p.id !== plantId));
      if (selectedPlantId === plantId) {
        setSelectedPlantId('');
      }
    } else {
      const updated = StorageService.deletePlant(plantId);
      setPlants(updated);
      if (selectedPlantId === plantId) {
        setSelectedPlantId(updated.length > 0 ? updated[0].id : '');
      }
    }
    setActiveModal(null);
    showToast('Plant deleted from garden.');
  };

  // Journal entry save handler
  const handleSaveJournalEntry = async (entryData: Partial<JournalEntry>) => {
    if (currentUser) {
      await CloudStorageService.saveJournalEntry(entryData as JournalEntry, currentUser.id);
      await refreshUserData(currentUser);
    } else {
      if (entryData.id) {
        StorageService.updateJournalEntry(entryData as JournalEntry);
      } else {
        StorageService.addJournalEntry(entryData as any);
      }
      setJournalEntries(StorageService.getJournalEntries());
    }
    showToast('✓ Journal entry saved!');
  };

  // Journal entry delete handler
  const handleDeleteJournalEntry = async (entryId: string) => {
    if (currentUser) {
      await CloudStorageService.deleteJournalEntry(entryId, currentUser.id);
      setJournalEntries((prev) => prev.filter((e) => e.id !== entryId));
    } else {
      StorageService.deleteJournalEntry(entryId);
      setJournalEntries(StorageService.getJournalEntries());
    }
    showToast('Journal entry deleted.');
  };

  // Local Garden Import to Cloud Handler
  const handleMigrateLocalData = async () => {
    if (!currentUser) return;
    const localPlants = StorageService.getPlants();
    const localEntries = StorageService.getJournalEntries();

    showToast('Importing local plants to cloud account...');
    const result = await CloudStorageService.migrateLocalGarden(currentUser.id, localPlants, localEntries);

    // Clear local storage demo plants so guest and cloud don't conflict
    StorageService.clearLocalPlants();
    setHasLocalDataToMigrate(false);
    await refreshUserData(currentUser);
    showToast(`🌱 Successfully imported ${result.importedPlants} plants & ${result.importedEntries} logs!`);
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
        isLoggedIn={Boolean(currentUser)}
        userAvatarUrl={userProfile?.avatar_url}
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
            userDisplayName={userProfile?.display_name}
            userAvatarUrl={userProfile?.avatar_url}
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
            userPlant={
              plants.find((p) => {
                if (selectedPlantId && p.id === selectedPlantId) return true;
                if (p.species_id && p.species_id === selectedEncyclopediaPlant.id) return true;
                if (p.species.toLowerCase() === selectedEncyclopediaPlant.scientific_name.toLowerCase()) return true;
                if (p.species.toLowerCase() === selectedEncyclopediaPlant.common_name.toLowerCase()) return true;
                if (p.name.toLowerCase() === selectedEncyclopediaPlant.common_name.toLowerCase()) return true;
                return false;
              })
            }
            journalEntries={journalEntries.filter(
              (e) => {
                const matched = plants.find((p) => p.id === selectedPlantId);
                return matched && e.plant_id === matched.id;
              }
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
            onDeleteEntry={handleDeleteJournalEntry}
            onRefreshEntries={() => refreshUserData(currentUser)}
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
          onSaveEntry={handleSaveJournalEntry}
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
          onDelete={handlePlantDelete}
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
          onRefresh={() => refreshUserData(currentUser)}
        />
      )}

      {/* Leafy Authentication Modal (Login / Sign Up / Reset Password) */}
      {activeModal === 'auth' && (
        <LeafyAuthModal
          initialMode={authModalMode}
          onClose={() => setActiveModal(null)}
          onSuccess={async () => {
            const user = await AuthService.getCurrentUser();
            setCurrentUser(user);
            await refreshUserData(user);
            showToast('🌱 Signed in successfully!');
          }}
          onOpenConfig={() => setActiveModal('supabase-config')}
        />
      )}

      {/* Account & Profile Settings Modal */}
      <LeafyAccountModal
        isOpen={activeModal === 'account'}
        onClose={() => setActiveModal(null)}
        onOpenAuth={() => {
          setAuthModalMode('login');
          setActiveModal('auth');
        }}
        onOpenConfig={() => setActiveModal('supabase-config')}
        onMigrateLocalData={handleMigrateLocalData}
        hasLocalDataToMigrate={hasLocalDataToMigrate}
        plantCount={plants.length}
        journalCount={journalEntries.length}
        photoCount={photos.length}
      />

      {/* Supabase Connection & Credentials Modal */}
      {activeModal === 'supabase-config' && (
        <LeafySupabaseConfigModal
          onClose={() => setActiveModal(null)}
          onConnected={() => {
            refreshUserData(currentUser);
            showToast('🟢 Supabase project linked!');
          }}
        />
      )}

      {/* Left Menu Drawer (Settings, DB, Phone Preview, 3D) */}
      <LeftMenuBar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenPlantBook={navigateToExplore}
        onOpenAiConfig={() => setActiveModal('ai')}
        onOpen3dModels={() => setActiveModal('models')}
        onOpenEditPlant={() => setActiveModal('edit')}
        onOpenDatabase={() => setActiveModal('supabase-config')}
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

import React, { useState, useEffect, useCallback } from 'react';
import type { Plant, JournalEntry, PlantPhoto } from './types/plant';
import type { EncyclopediaPlant } from './types/encyclopedia';
import type { UserProfile, AuthMode } from './types/auth';
import { StorageService } from './services/storage';
import { AuthService } from './services/auth';
import { CloudStorageService } from './services/cloudStorage';

// Redesigned UI Components
import { LeafyHomeCollection } from './components/redesign/LeafyHomeCollection';
import { LeafyPlantDetailScreen } from './components/redesign/LeafyPlantDetailScreen';
import { LeafyPlantBookScreen } from './components/redesign/LeafyPlantBookScreen';

// Core Essential Modals (Preserved)
import { AddToGardenModal } from './components/plantbook/AddToGardenModal';
import { AddEditPlantModal } from './components/AddEditPlantModal';
import { LeafyAuthModal } from './components/leafy/LeafyAuthModal';
import { LeafyAccountModal } from './components/leafy/LeafyAccountModal';
import { LeafySupabaseConfigModal } from './components/leafy/LeafySupabaseConfigModal';

// Stylesheets
import './fonts.css';
import './index.css';
import './redesign.css';

type AppViewMode = 'collection' | 'detail' | 'plantbook';

export const App: React.FC = () => {
  // Authentication & Profile
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');

  // Plant Collection & Journals
  const [plants, setPlants] = useState<Plant[]>(() => StorageService.getPlants());
  const [activePlantIndex, setActivePlantIndex] = useState<number>(0);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => StorageService.getJournalEntries());
  const [, setPhotos] = useState<PlantPhoto[]>([]);

  // Navigation State
  const [viewMode, setViewMode] = useState<AppViewMode>('collection');
  const [selectedPlantId, setSelectedPlantId] = useState<string>(() => {
    const p = StorageService.getPlants();
    return p.length > 0 ? p[0].id : '';
  });
  const [activeGardenModalPlant, setActiveGardenModalPlant] = useState<EncyclopediaPlant | null>(null);

  // Modals
  const [activeModal, setActiveModal] = useState<
    'add' | 'edit' | 'auth' | 'account' | 'supabase-config' | null
  >(null);

  // Owner Name
  const [ownerName, setOwnerName] = useState<string>(() => StorageService.getOwnerName());

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Check if unmigrated local data exists in localStorage
  const [hasLocalDataToMigrate, setHasLocalDataToMigrate] = useState(false);

  // Load user data based on auth status (Cloud vs Local)
  const refreshUserData = useCallback(async (user: any | null) => {
    if (user) {
      const [cloudPlants, cloudEntries, cloudPhotos, profile] = await Promise.all([
        CloudStorageService.getPlants(user.id),
        CloudStorageService.getJournalEntries(user.id),
        CloudStorageService.getPhotos(user.id),
        AuthService.getCurrentProfile()
      ]);

      setUserProfile(profile);
      const userPlants = cloudPlants && cloudPlants.length > 0 ? cloudPlants : StorageService.getPlants();
      setPlants(userPlants);
      setActivePlantIndex(0);
      setSelectedPlantId(userPlants.length > 0 ? userPlants[0].id : '');
      setJournalEntries(cloudEntries);
      setPhotos(cloudPhotos);

      const rawLocal = StorageService.getRawLocalPlants();
      const hasGuestData = rawLocal.length > 0 && !StorageService.isDefaultDemoOnly(rawLocal);
      setHasLocalDataToMigrate(hasGuestData && cloudPlants.length === 0);
    } else {
      setUserProfile(null);
      const localPlants = StorageService.getPlants();
      setPlants(localPlants);
      setActivePlantIndex(0);
      setSelectedPlantId(localPlants.length > 0 ? localPlants[0].id : '');
      setJournalEntries(StorageService.getJournalEntries());
      setPhotos(StorageService.getPhotos());
      setHasLocalDataToMigrate(false);
    }
  }, []);

  // Initialize Auth & listen for auth state changes
  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      refreshUserData(user);
    });

    const sub = AuthService.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      refreshUserData(user);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [refreshUserData]);

  // Synchronize URL hash with View Mode
  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash.startsWith('#/book') || hash.startsWith('#/explore')) {
        setViewMode('plantbook');
      } else if (hash.startsWith('#/plant/')) {
        setViewMode('detail');
      } else {
        setViewMode('collection');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Determine active plant
  const currentPlant =
    plants.find((p) => p.id === selectedPlantId) ||
    plants[activePlantIndex] ||
    plants[0];

  // Navigation handlers
  const handleOpenPlantDetail = (plant: Plant) => {
    setSelectedPlantId(plant.id);
    const idx = plants.findIndex((p) => p.id === plant.id);
    if (idx >= 0) setActivePlantIndex(idx);
    setViewMode('detail');
    window.location.hash = `#/plant/${plant.id}`;
  };

  const handleBackToCollection = () => {
    setViewMode('collection');
    window.location.hash = '#/';
  };

  const handleOpenPlantBook = () => {
    setViewMode('plantbook');
    window.location.hash = '#/book';
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
        setActivePlantIndex(0);
        setViewMode('collection');
      }
    } else {
      const updatedList = StorageService.updatePlant(savedPlant);
      setPlants(updatedList);
      setSelectedPlantId(savedPlant.id);
      setActivePlantIndex(0);
      setViewMode('collection');
    }
    showToast(`✓ Added ${savedPlant.name} to collection`);
  };

  // Plant deleted
  const handlePlantDelete = async (plantId: string) => {
    if (currentUser) {
      await CloudStorageService.deletePlant(plantId, currentUser.id);
      setPlants((prev) => prev.filter((p) => p.id !== plantId));
    } else {
      const updated = StorageService.deletePlant(plantId);
      setPlants(updated);
    }
    setActivePlantIndex(0);
    setActiveModal(null);
    handleBackToCollection();
    showToast('Plant deleted from collection.');
  };

  // Add from encyclopedia to personal collection
  const handleGardenPlantAdded = async (newPlant: Plant) => {
    if (currentUser) {
      const saved = await CloudStorageService.savePlant(newPlant, currentUser.id);
      if (saved) {
        setPlants((prev) => [saved, ...prev]);
        setSelectedPlantId(saved.id);
        setActivePlantIndex(0);
      }
    } else {
      const updatedList = StorageService.updatePlant(newPlant);
      setPlants(updatedList);
      setSelectedPlantId(newPlant.id);
      setActivePlantIndex(0);
    }
    setActiveGardenModalPlant(null);
    handleBackToCollection();
    showToast(`🌱 Added ${newPlant.name} to your collection!`);
  };

  // Water cycle click action
  const handleWaterPlant = (plant: Plant) => {
    const updated = {
      ...plant,
      watering_time: 'Watered today 💧',
      last_update: 'Today'
    };
    handlePlantSave(updated);
    showToast(`💧 ${plant.name} marked as watered!`);
  };

  // Local data migration to cloud
  const handleMigrateLocalData = async () => {
    if (!currentUser) return;
    const localPlants = StorageService.getPlants();
    const localEntries = StorageService.getJournalEntries();

    showToast('Importing local plants to cloud account...');
    const result = await CloudStorageService.migrateLocalGarden(currentUser.id, localPlants, localEntries);

    StorageService.clearLocalPlants();
    setHasLocalDataToMigrate(false);
    await refreshUserData(currentUser);
    showToast(`🌱 Successfully imported ${result.importedPlants} plants!`);
  };

  return (
    <div className="leafy-redesign-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1F2922',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            pointerEvents: 'none'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* iPhone 16 Centered Frame Container */}
      <div className={`leafy-device-canvas ${viewMode === 'detail' ? 'detail-mode' : ''}`}>
        {/* SCREEN 1: Plant Collection Stack */}
        {viewMode === 'collection' && (
          <LeafyHomeCollection
            plants={plants}
            activePlantIndex={activePlantIndex}
            onActiveIndexChange={(idx) => {
              setActivePlantIndex(idx);
              if (plants[idx]) setSelectedPlantId(plants[idx].id);
            }}
            onOpenPlantDetail={handleOpenPlantDetail}
            onOpenPlantBook={handleOpenPlantBook}
            onOpenAddPlant={() => setActiveModal('add')}
            onOpenSettings={() => setActiveModal('account')}
            ownerName={userProfile?.display_name || ownerName}
            onSaveOwnerName={(newName) => {
              const saved = StorageService.setOwnerName(newName);
              setOwnerName(saved);
              showToast(`✨ Collection name updated to ${saved}!`);
            }}
          />
        )}

        {/* SCREEN 2: Plant Detail Screen */}
        {viewMode === 'detail' && currentPlant && (
          <LeafyPlantDetailScreen
            plant={currentPlant}
            journalEntries={journalEntries.filter((e) => e.plant_id === currentPlant.id)}
            onBack={handleBackToCollection}
            onExploreSpecies={(_speciesKey) => {
              handleOpenPlantBook();
            }}
            onEditPlant={() => setActiveModal('edit')}
            onWaterPlant={handleWaterPlant}
            onUpdatePlantAge={(plantId, newAge, newBirthDate) => {
              const updated = StorageService.updatePlantAge(plantId, newAge, newBirthDate);
              setPlants(updated);
              showToast('🌱 Plant age updated successfully!');
            }}
          />
        )}

        {/* Plant Book / Encyclopedia */}
        {viewMode === 'plantbook' && (
          <LeafyPlantBookScreen
            onBack={handleBackToCollection}
            onSelectPlant={(encyclopediaPlant) => {
              // Look if user already has this plant, else open add to garden
              const existing = plants.find(
                (p) =>
                  p.species_id === encyclopediaPlant.id ||
                  p.species.toLowerCase() === encyclopediaPlant.common_name.toLowerCase()
              );
              if (existing) {
                handleOpenPlantDetail(existing);
              } else {
                setActiveGardenModalPlant(encyclopediaPlant);
              }
            }}
            onAddToGarden={(encyclopediaPlant) => {
              setActiveGardenModalPlant(encyclopediaPlant);
            }}
          />
        )}
      </div>

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

      {/* Add To Garden Modal from Plant Book */}
      {activeGardenModalPlant && (
        <AddToGardenModal
          plant={activeGardenModalPlant}
          onClose={() => setActiveGardenModalPlant(null)}
          onAdded={handleGardenPlantAdded}
        />
      )}

      {/* Leafy Authentication Modal */}
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
        photoCount={0}
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
    </div>
  );
};

export default App;

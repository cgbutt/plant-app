import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Plant, PlantPhoto } from '../types/plant';
import { StorageService } from '../services/storage';
import { getAssetUrl } from '../utils/assets';

interface RightPhotoViewerProps {
  plant: Plant;
  photos: PlantPhoto[];
  selectedPhotoId: string;
  onSelectPhoto: (photo: PlantPhoto) => void;
  onRefreshPhotos: () => void;
  onOpenGallery: () => void;
  onControlsActiveChange?: (active: boolean) => void;
}

interface PhotoTransform {
  scale: number;
  x: number;
  y: number;
}

export const RightPhotoViewer: React.FC<RightPhotoViewerProps> = ({
  plant,
  photos,
  selectedPhotoId,
  onSelectPhoto,
  onRefreshPhotos,
  onOpenGallery,
  onControlsActiveChange
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdjustMode, setIsAdjustMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Notify parent if menu or adjuster is actively open to prevent idle fading
  useEffect(() => {
    onControlsActiveChange?.(menuOpen || isAdjustMode);
  }, [menuOpen, isAdjustMode, onControlsActiveChange]);

  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ startMouseX: number; startMouseY: number; startImgX: number; startImgY: number }>({
    startMouseX: 0,
    startMouseY: 0,
    startImgX: 0,
    startImgY: 0
  });

  const activePhoto = photos.find((p) => p.id === selectedPhotoId) || photos[0];

  // Persistent transforms for each photo by ID
  const [transforms, setTransforms] = useState<Record<string, PhotoTransform>>(() => {
    try {
      const saved = localStorage.getItem('plant_photo_transforms');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentTransform: PhotoTransform =
    (activePhoto && transforms[activePhoto.id]) || { scale: 1, x: 0, y: 0 };

  const updateCurrentTransform = useCallback(
    (updater: (prev: PhotoTransform) => PhotoTransform) => {
      if (!activePhoto) return;
      setTransforms((prev) => {
        const current = prev[activePhoto.id] || { scale: 1, x: 0, y: 0 };
        const nextTransform = updater(current);
        const updated = { ...prev, [activePhoto.id]: nextTransform };
        try {
          localStorage.setItem('plant_photo_transforms', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [activePhoto]
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Global mousemove and mouseup listeners for drag relocation
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.startMouseX;
      const deltaY = e.clientY - dragStartRef.current.startMouseY;
      updateCurrentTransform((prev) => ({
        ...prev,
        x: Math.round(dragStartRef.current.startImgX + deltaX),
        y: Math.round(dragStartRef.current.startImgY + deltaY)
      }));
    },
    [isDragging, updateCurrentTransform]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isAdjustMode) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startImgX: currentTransform.x,
      startImgY: currentTransform.y
    };
  };

  // Touch relocation support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isAdjustMode || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      startMouseX: touch.clientX,
      startMouseY: touch.clientY,
      startImgX: currentTransform.x,
      startImgY: currentTransform.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.startMouseX;
    const deltaY = touch.clientY - dragStartRef.current.startMouseY;
    updateCurrentTransform((prev) => ({
      ...prev,
      x: Math.round(dragStartRef.current.startImgX + deltaX),
      y: Math.round(dragStartRef.current.startImgY + deltaY)
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isAdjustMode) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    updateCurrentTransform((prev) => ({
      ...prev,
      scale: Math.min(3.5, Math.max(0.4, Number((prev.scale + delta).toFixed(2))))
    }));
  };

  const handleReset = () => {
    updateCurrentTransform(() => ({ scale: 1, x: 0, y: 0 }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const formattedDate = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).toUpperCase();

          const newPhoto = StorageService.addPhoto({
            plant_id: plant.id,
            image_url: event.target.result as string,
            caption: `${plant.name} specimen photograph`,
            date: formattedDate
          });

          onRefreshPhotos();
          onSelectPhoto(newPhoto);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const triggerUpload = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-panel-container">
      {/* Hidden file input controlled programmatically */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Top Combined Gallery & Upload Icon Button */}
      <div className="photo-top-actions" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`photo-icon-trigger-btn ${menuOpen ? 'active' : ''} ${isAdjustMode ? 'adjust-active' : ''}`}
          title="Photos & Gallery Options"
          aria-label="Photos and Gallery Options"
          aria-expanded={menuOpen}
        >
          <img
            src={getAssetUrl('gallery-icon.png')}
            alt="Gallery and Upload"
            className="photo-trigger-icon"
          />
        </button>

        {menuOpen && (
          <div className="photo-dropdown-menu">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenGallery();
              }}
              className="photo-dropdown-item"
            >
              <span className="photo-dropdown-icon">
                <img src={getAssetUrl('gallery-icon.png')} alt="" className="item-icon-img" />
              </span>
              <div className="photo-dropdown-text">
                <span className="dropdown-title">OPEN GALLERY</span>
                <span className="dropdown-desc">View all photos & history</span>
              </div>
            </button>

            <button
              onClick={triggerUpload}
              className="photo-dropdown-item upload-item"
            >
              <span className="photo-dropdown-icon plus-icon">＋</span>
              <div className="photo-dropdown-text">
                <span className="dropdown-title">UPLOAD PHOTO</span>
                <span className="dropdown-desc">Add new plant photograph</span>
              </div>
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                setIsAdjustMode((prev) => !prev);
              }}
              className={`photo-dropdown-item adjust-item ${isAdjustMode ? 'active' : ''}`}
            >
              <span className="photo-dropdown-icon adjust-icon">✥</span>
              <div className="photo-dropdown-text">
                <span className="dropdown-title">
                  {isAdjustMode ? 'EXIT RESIZE & MOVE' : 'RESIZE & RELOCATE'}
                </span>
                <span className="dropdown-desc">Zoom scale & drag reposition</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Main Photo Fitted to Panel with Interactive Resize & Relocate */}
      {activePhoto ? (
        <div
          className={`photo-main-display ${isAdjustMode ? 'adjust-mode-active' : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {isAdjustMode && (
            <div className="adjust-guide-badge">
              ✥ Drag image to relocate • Scroll or slide to zoom
            </div>
          )}

          <img
            src={activePhoto.image_url}
            alt={activePhoto.caption || 'Plant photo'}
            className="photo-main-img"
            style={{
              objectFit: 'contain',
              transform: `translate(${currentTransform.x}px, ${currentTransform.y}px) scale(${currentTransform.scale})`,
              transformOrigin: 'center center',
              cursor: isAdjustMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
            draggable={false}
          />
        </div>
      ) : (
        <div className="photo-empty-display">
          <div className="empty-icon">
            <img src={getAssetUrl('gallery-icon.png')} alt="" style={{ width: '48px', height: '48px', opacity: 0.6 }} />
          </div>
          <div className="empty-text">NO PHOTOS UPLOADED YET</div>
          <p className="empty-subtext">
            Upload photographs of your plant to document growth and run AI health diagnostics.
          </p>
          <button
            onClick={triggerUpload}
            className="photo-empty-upload-btn"
          >
            + UPLOAD FIRST PHOTO
          </button>
        </div>
      )}

      {/* Floating Toolbar for Resize and Relocate */}
      {isAdjustMode && activePhoto && (
        <div className="photo-adjust-toolbar">
          <div className="adjust-hint">
            <span className="adjust-hint-icon">✥</span>
            <span className="adjust-hint-text">DRAG TO MOVE</span>
          </div>

          <div className="adjust-divider" />

          <div className="adjust-scale-controls">
            <button
              className="adjust-scale-btn"
              onClick={() =>
                updateCurrentTransform((prev) => ({
                  ...prev,
                  scale: Math.max(0.4, Number((prev.scale - 0.1).toFixed(2)))
                }))
              }
              title="Zoom Out"
            >
              −
            </button>

            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.05"
              value={currentTransform.scale}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                updateCurrentTransform((prev) => ({ ...prev, scale: val }));
              }}
              className="adjust-scale-slider"
              title="Scale slider"
            />

            <button
              className="adjust-scale-btn"
              onClick={() =>
                updateCurrentTransform((prev) => ({
                  ...prev,
                  scale: Math.min(3.5, Number((prev.scale + 0.1).toFixed(2)))
                }))
              }
              title="Zoom In"
            >
              +
            </button>

            <span className="adjust-scale-val">
              {Math.round(currentTransform.scale * 100)}%
            </span>
          </div>

          <div className="adjust-divider" />

          <div className="adjust-actions">
            <button
              className="adjust-action-btn reset-btn"
              onClick={handleReset}
              title="Reset Zoom & Position"
            >
              ↺ RESET
            </button>
            <button
              className="adjust-action-btn done-btn"
              onClick={() => setIsAdjustMode(false)}
              title="Done adjusting"
            >
              ✓ DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import type { Plant, PlantPhoto } from '../types/plant';
import { StorageService } from '../services/storage';

interface PhotosModalProps {
  plant: Plant;
  photos: PlantPhoto[];
  onClose: () => void;
  onRefresh: () => void;
}

export const PhotosModal: React.FC<PhotosModalProps> = ({ plant, photos, onClose, onRefresh }) => {
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showUpload, setShowUpload] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();

    StorageService.addPhoto({
      plant_id: plant.id,
      image_url: previewUrl,
      caption: caption.trim() || `${plant.name} specimen photograph`,
      date: formattedDate
    });

    setCaption('');
    setPreviewUrl('');
    setShowUpload(false);
    onRefresh();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">REAL PLANT PHOTOGRAPHS — {plant.name}</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-actions-top">
            <button
              className="minimal-btn primary"
              onClick={() => setShowUpload(!showUpload)}
            >
              {showUpload ? 'CANCEL' : '+ UPLOAD PLANT PHOTOGRAPH'}
            </button>
          </div>

          {showUpload && (
            <form onSubmit={handleUploadSubmit} className="photo-upload-form">
              <div className="form-row">
                <label className="field-label">SELECT IMAGE FILE</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="minimal-file-input"
                  required
                />
              </div>

              {previewUrl && (
                <div className="image-preview-box">
                  <img src={previewUrl} alt="Upload preview" />
                </div>
              )}

              <div className="form-row">
                <label className="field-label">CAPTION / OBSERVATION</label>
                <input
                  type="text"
                  placeholder="e.g. Fenestration pattern on new leaf"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="minimal-input"
                />
              </div>

              <button type="submit" className="minimal-btn save">
                CONFIRM UPLOAD
              </button>
            </form>
          )}

          {/* Photo Gallery Grid */}
          <div className="photo-gallery-grid">
            {photos.length === 0 ? (
              <div className="empty-state">NO PHOTOGRAPHS UPLOADED YET</div>
            ) : (
              photos.map((photo) => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-wrapper">
                    <img src={photo.image_url} alt={photo.caption || 'Plant photo'} />
                  </div>
                  <div className="photo-meta">
                    <span className="photo-date">{photo.date}</span>
                    <p className="photo-caption">{photo.caption}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

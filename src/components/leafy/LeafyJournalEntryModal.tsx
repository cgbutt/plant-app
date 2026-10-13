import React, { useState } from 'react';
import type { Plant, JournalEntry } from '../../types/plant';
import { StorageService } from '../../services/storage';

interface LeafyJournalEntryModalProps {
  plants: Plant[];
  currentPlant?: Plant;
  editingEntry?: JournalEntry | null;
  onClose: () => void;
  onSaveEntry?: (entry: Partial<JournalEntry>) => Promise<void>;
  onSaved?: () => void;
}

export const LeafyJournalEntryModal: React.FC<LeafyJournalEntryModalProps> = ({
  plants,
  currentPlant,
  editingEntry,
  onClose,
  onSaveEntry,
  onSaved
}) => {
  const [plantId, setPlantId] = useState(
    editingEntry?.plant_id || currentPlant?.id || (plants[0] ? plants[0].id : '')
  );
  const [title, setTitle] = useState(editingEntry?.title || '');
  const [notes, setNotes] = useState(editingEntry?.notes || '');
  const [heightCm, setHeightCm] = useState(
    editingEntry?.height_cm !== undefined ? String(editingEntry.height_cm) : ''
  );
  const [leafCount, setLeafCount] = useState(
    editingEntry?.leaf_count !== undefined ? String(editingEntry.leaf_count) : ''
  );
  const [watering, setWatering] = useState(editingEntry?.watering || '');
  const [photoUrl, setPhotoUrl] = useState(editingEntry?.photo_url || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();

    const entryPayload: Partial<JournalEntry> = {
      ...(editingEntry || {}),
      plant_id: plantId,
      date: editingEntry?.date || formattedDate,
      title: title.trim(),
      notes: notes.trim(),
      height_cm: heightCm ? parseFloat(heightCm) : undefined,
      leaf_count: leafCount ? parseInt(leafCount, 10) : undefined,
      watering: watering.trim() || undefined,
      condition: 'Healthy',
      photo_url: photoUrl.trim() || undefined
    };

    if (onSaveEntry) {
      await onSaveEntry(entryPayload);
    } else {
      if (editingEntry) {
        StorageService.updateJournalEntry(entryPayload as JournalEntry);
      } else {
        StorageService.addJournalEntry(entryPayload as any);
      }
      if (onSaved) onSaved();
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '520px',
          width: '90%',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pastel-icon-circle journal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Capture plant growth, milestones, and care details
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Select Plant */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              PLANT
            </label>
            <select
              value={plantId}
              onChange={(e) => setPlantId(e.target.value)}
              className="minimal-input"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px',
                background: '#ffffff'
              }}
            >
              {plants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.species})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              ENTRY TITLE
            </label>
            <input
              type="text"
              placeholder="e.g. New leaf! 🌱 or Repotted with fresh soil"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px'
              }}
              required
            />
          </div>

          {/* Metrics: Height & Leaves */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                HEIGHT (CM)
              </label>
              <input
                type="number"
                placeholder="e.g. 42"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-leafy)',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                LEAF COUNT
              </label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={leafCount}
                onChange={(e) => setLeafCount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  fontFamily: 'var(--font-leafy)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Watering activity */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              WATERING / FEEDING
            </label>
            <input
              type="text"
              placeholder="e.g. Watered 200ml with liquid seaweed fertilizer"
              value={watering}
              onChange={(e) => setWatering(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Optional Photo URL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              PHOTO URL (OPTIONAL)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              NOTES & OBSERVATIONS
            </label>
            <textarea
              rows={3}
              placeholder="A beautiful new leaf unfurled today. Looking vibrant and happy!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontFamily: 'var(--font-leafy)',
                fontSize: '14px',
                resize: 'vertical'
              }}
              required
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="leafy-btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="leafy-btn-primary"
              style={{ flex: 2 }}
            >
              {editingEntry ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

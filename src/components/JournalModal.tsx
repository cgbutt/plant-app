import React, { useState } from 'react';
import type { Plant, JournalEntry } from '../types/plant';
import { StorageService } from '../services/storage';

interface JournalModalProps {
  plant: Plant;
  entries: JournalEntry[];
  onClose: () => void;
  onRefresh: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ plant, entries, onClose, onRefresh }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [leafCount, setLeafCount] = useState('');
  const [condition, setCondition] = useState(plant.leaf_condition);
  const [watering, setWatering] = useState('');
  const [soil] = useState(plant.soil_condition);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();

    StorageService.addJournalEntry({
      plant_id: plant.id,
      date: formattedDate,
      title: title.trim().toUpperCase(),
      notes: notes.trim(),
      height_cm: heightCm ? parseFloat(heightCm) : undefined,
      leaf_count: leafCount ? parseInt(leafCount, 10) : undefined,
      condition: condition.trim(),
      watering: watering.trim(),
      soil_condition: soil.trim()
    });

    setTitle('');
    setNotes('');
    setHeightCm('');
    setLeafCount('');
    setWatering('');
    setShowAddForm(false);
    onRefresh();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">PLANT JOURNAL — {plant.name}</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-actions-top">
            <button
              className="minimal-btn primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'CANCEL' : '+ NEW JOURNAL ENTRY'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="journal-form">
              <div className="form-row">
                <label className="field-label">ENTRY TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. NEW LEAF EMERGING"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="minimal-input"
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-row">
                  <label className="field-label">HEIGHT (CM)</label>
                  <input
                    type="number"
                    placeholder="42"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="minimal-input"
                  />
                </div>
                <div className="form-row">
                  <label className="field-label">LEAF COUNT</label>
                  <input
                    type="number"
                    placeholder="8"
                    value={leafCount}
                    onChange={(e) => setLeafCount(e.target.value)}
                    className="minimal-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-row">
                  <label className="field-label">CONDITION</label>
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="minimal-input"
                  />
                </div>
                <div className="form-row">
                  <label className="field-label">WATERING / FERTILIZER</label>
                  <input
                    type="text"
                    placeholder="e.g. Watered 250ml"
                    value={watering}
                    onChange={(e) => setWatering(e.target.value)}
                    className="minimal-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="field-label">OBSERVATIONS / NOTES</label>
                <textarea
                  rows={3}
                  placeholder="Detailed notes on leaf development, light changes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="minimal-textarea"
                  required
                />
              </div>

              <button type="submit" className="minimal-btn save">
                SAVE JOURNAL ENTRY
              </button>
            </form>
          )}

          {/* Journal Entry History Timeline */}
          <div className="journal-timeline">
            {entries.length === 0 ? (
              <div className="empty-state">NO JOURNAL ENTRIES LOGGED YET</div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="timeline-card">
                  <div className="timeline-date">{entry.date}</div>
                  <div className="timeline-title">{entry.title}</div>

                  <div className="timeline-metrics">
                    {entry.height_cm !== undefined && (
                      <span>Height: <strong>{entry.height_cm} cm</strong></span>
                    )}
                    {entry.leaf_count !== undefined && (
                      <span>Leaves: <strong>{entry.leaf_count}</strong></span>
                    )}
                    {entry.condition && (
                      <span>Condition: <strong>{entry.condition}</strong></span>
                    )}
                    {entry.watering && (
                      <span>Watering: <strong>{entry.watering}</strong></span>
                    )}
                  </div>

                  <div className="timeline-notes">{entry.notes}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

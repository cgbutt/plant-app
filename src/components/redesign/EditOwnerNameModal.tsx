import React, { useState, useEffect, useRef } from 'react';
import { ModalCloseIcon } from './Icons';
import { formatPossessiveName } from '../../utils/plantDate';

export interface EditOwnerNameModalProps {
  isOpen: boolean;
  currentName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

export const EditOwnerNameModal: React.FC<EditOwnerNameModalProps> = ({
  isOpen,
  currentName,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Strip any trailing possessive to show raw name
      const clean = (currentName || 'Kanak').replace(/['’]s?$/i, '').trim();
      setName(clean);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSave(trimmed);
      onClose();
    }
  };

  const previewPossessive = formatPossessiveName(name || 'Your');

  return (
    <div className="leafy-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="edit-owner-title">
      <div className="leafy-edit-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="leafy-edit-popup-header">
          <h3 id="edit-owner-title" className="leafy-edit-popup-title">Edit Collection Owner</h3>
          <button
            className="leafy-popup-close-btn"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <ModalCloseIcon size={18} color="#6B7280" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="leafy-edit-popup-body">
          <label className="leafy-popup-field-label" htmlFor="owner-name-input">
            Your First Name or Nickname
          </label>
          <input
            id="owner-name-input"
            ref={inputRef}
            type="text"
            className="leafy-popup-text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kanak, Ali, James"
            maxLength={30}
            required
          />

          {/* Live Preview */}
          <div className="leafy-popup-preview-box">
            <span className="leafy-popup-preview-label">Live Header Preview</span>
            <div className="leafy-popup-preview-heading">
              <span className="leafy-popup-preview-owner">{previewPossessive}</span>
              <span className="leafy-popup-preview-sub">Plant Collection</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="leafy-popup-actions-row">
            <button
              type="button"
              className="leafy-popup-btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="leafy-popup-btn primary"
              disabled={!name.trim()}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

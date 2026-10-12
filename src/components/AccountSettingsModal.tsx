import React, { useState } from 'react';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantCount: number;
  journalCount: number;
  photoCount: number;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  plantCount,
  journalCount,
  photoCount
}) => {
  const [caretakerName, setCaretakerName] = useState(() => {
    return localStorage.getItem('asper_caretaker_name') || 'Elden Botanist';
  });
  const [caretakerEmail, setCaretakerEmail] = useState(() => {
    return localStorage.getItem('asper_caretaker_email') || 'botanist@asper.plants';
  });
  const [tempUnit, setTempUnit] = useState(() => {
    return localStorage.getItem('asper_temp_unit') || 'celsius';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('asper_caretaker_name', caretakerName);
    localStorage.setItem('asper_caretaker_email', caretakerEmail);
    localStorage.setItem('asper_temp_unit', tempUnit);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      plants: localStorage.getItem('asper_plants_v1'),
      journal: localStorage.getItem('asper_journal_v1'),
      photos: localStorage.getItem('asper_photos_v1'),
      caretaker: caretakerName
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asper-botanical-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <span className="modal-title">ACCOUNT & SETTINGS</span>
            <span className="modal-subtitle">Configure Caretaker Profile & System Preferences</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Account Profile Card */}
          <div className="account-profile-box">
            <div className="avatar-big">🌿</div>
            <div className="profile-inputs">
              <div className="form-group">
                <label className="form-label">CARETAKER NAME</label>
                <input
                  type="text"
                  className="form-input"
                  value={caretakerName}
                  onChange={(e) => setCaretakerName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="form-input"
                  value={caretakerEmail}
                  onChange={(e) => setCaretakerEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Plant Stats Bar */}
          <div className="stats-bar-row">
            <div className="stat-card">
              <span className="stat-num">{plantCount}</span>
              <span className="stat-lbl">SPECIMENS</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{journalCount}</span>
              <span className="stat-lbl">JOURNAL LOGS</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{photoCount}</span>
              <span className="stat-lbl">PHOTOS ARCHIVED</span>
            </div>
          </div>

          {/* App Preferences */}
          <div className="settings-section">
            <span className="settings-section-title">PREFERENCES</span>

            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-title">Temperature Units</span>
                <span className="setting-desc">Preferred climate measurement unit</span>
              </div>
              <div className="setting-control">
                <button
                  type="button"
                  className={`unit-toggle-btn ${tempUnit === 'celsius' ? 'active' : ''}`}
                  onClick={() => setTempUnit('celsius')}
                >
                  °C
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${tempUnit === 'fahrenheit' ? 'active' : ''}`}
                  onClick={() => setTempUnit('fahrenheit')}
                >
                  °F
                </button>
              </div>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-title">Botanical Audio Feedback</span>
                <span className="setting-desc">Play subtle click feedback on model interaction</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Data Backup Section */}
          <div className="settings-section">
            <span className="settings-section-title">DATA MANAGEMENT</span>
            <div className="backup-row">
              <button type="button" onClick={handleExportData} className="export-backup-btn">
                💾 EXPORT DATA BACKUP (JSON)
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {saveSuccess && <span className="save-status-msg">✓ Preferences Saved!</span>}
          <div className="footer-actions">
            <button className="btn-secondary" onClick={onClose}>CANCEL</button>
            <button className="btn-primary" onClick={handleSave}>SAVE SETTINGS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

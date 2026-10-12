import React, { useState } from 'react';
import { SupabaseService } from '../services/supabase';

interface SupabaseModalProps {
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ onClose }) => {
  const currentCreds = SupabaseService.getCredentials();
  const [url, setUrl] = useState(currentCreds.url);
  const [key, setKey] = useState(currentCreds.key);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSaveCreds = (e: React.FormEvent) => {
    e.preventDefault();
    SupabaseService.saveCredentials(url.trim(), key.trim());
    setStatusMessage('Supabase credentials updated successfully.');
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SupabaseService.getSqlMigrationScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">SUPABASE DATABASE & RLS ARCHITECTURE</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Supabase credentials config */}
          <form onSubmit={handleSaveCreds} className="supabase-config-box">
            <div className="form-section-title">SUPABASE API CONFIGURATION</div>

            <div className="form-row">
              <label className="field-label">SUPABASE PROJECT URL</label>
              <input
                type="text"
                placeholder="https://your-project.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="minimal-input"
              />
            </div>

            <div className="form-row">
              <label className="field-label">SUPABASE ANON / PUBLIC KEY</label>
              <input
                type="password"
                placeholder="eyJhbGciOi..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="minimal-input"
              />
            </div>

            <button type="submit" className="minimal-btn primary">
              CONNECT SUPABASE BACKEND
            </button>

            {statusMessage && <div className="status-msg">{statusMessage}</div>}
          </form>

          {/* SQL Migration Script Generator */}
          <div className="sql-script-box">
            <div className="sql-header">
              <div className="form-section-title">DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) SQL</div>
              <button className="minimal-btn copy-btn" onClick={handleCopySql}>
                {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY SQL SCRIPT'}
              </button>
            </div>

            <pre className="sql-code-block">{SupabaseService.getSqlMigrationScript()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

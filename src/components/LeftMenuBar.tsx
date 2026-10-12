import React from 'react';
import { getAssetUrl } from '../utils/assets';

interface LeftMenuBarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlantBook: () => void;
  onOpenAiConfig: () => void;
  onOpen3dModels: () => void;
  onOpenEditPlant: () => void;
  onOpenDatabase: () => void;
  onOpenSettings: () => void;
  onOpenAccount: () => void;
  isPhonePreview: boolean;
  onTogglePhonePreview: () => void;
  plantName: string;
}

export const LeftMenuBar: React.FC<LeftMenuBarProps> = ({
  isOpen,
  onClose,
  onOpenPlantBook,
  onOpenAiConfig,
  onOpen3dModels,
  onOpenEditPlant,
  onOpenDatabase,
  onOpenSettings,
  onOpenAccount,
  isPhonePreview,
  onTogglePhonePreview,
  plantName
}) => {
  if (!isOpen) return null;

  return (
    <div className="menu-backdrop" onClick={onClose}>
      <aside
        className="left-menu-bar"
        onClick={(e) => e.stopPropagation()}
        aria-label="Navigation Menu"
      >
        {/* Menu Top Bar */}
        <div className="menu-header">
          <div className="menu-brand">
            <img src={getAssetUrl('ui-assets/ASPER.png')} alt="ASPER" className="menu-brand-img" />
            <span className="menu-brand-sub">CONTROL PANEL</span>
          </div>
          <button
            className="menu-close-btn"
            onClick={onClose}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* User Account Card */}
        <div className="menu-account-card" onClick={() => { onOpenAccount(); onClose(); }}>
          <div className="account-info">
            <div className="account-name">Botanist Account</div>
            <div className="account-status">Verified Caretaker • Online</div>
          </div>
        </div>

        {/* Navigation Actions List */}
        <div className="menu-nav-list">
          <div className="menu-section-label">ENCYCLOPEDIA & GUIDES</div>

          {/* PLANT BOOK ENCYCLOPEDIA */}
          <button
            className="menu-item-btn highlight-plantbook"
            onClick={() => {
              onOpenPlantBook();
              onClose();
            }}
          >
            <div className="menu-item-icon-minimal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </div>
            <div className="menu-item-text">
              <span className="menu-item-title">PLANT BOOK</span>
              <span className="menu-item-desc">Search Species & Comprehensive Care Guides</span>
            </div>
          </button>

          <div className="menu-section-label" style={{ marginTop: '14px' }}>SYSTEM TOOLS</div>

          {/* 1. AI CONFIG */}
          <button
            className="menu-item-btn highlight-ai"
            onClick={() => {
              onOpenAiConfig();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">AI CONFIG</span>
              <span className="menu-item-desc">Gemini Vision & Diagnostic API Keys</span>
            </div>
          </button>

          {/* 2. 3D MODELS */}
          <button
            className="menu-item-btn"
            onClick={() => {
              onOpen3dModels();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">3D MODELS</span>
              <span className="menu-item-desc">Custom GLB files for stages 1, 2, 3</span>
            </div>
          </button>

          {/* 3. EDIT PLANT */}
          <button
            className="menu-item-btn"
            onClick={() => {
              onOpenEditPlant();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">EDIT PLANT</span>
              <span className="menu-item-desc">Configure {plantName} & soil mix</span>
            </div>
          </button>

          {/* 4. DATABASE */}
          <button
            className="menu-item-btn"
            onClick={() => {
              onOpenDatabase();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">DATABASE (DB)</span>
              <span className="menu-item-desc">Supabase PostgreSQL cloud sync</span>
            </div>
          </button>

          {/* 5. PHONE / DESKTOP TOGGLE */}
          <button
            className="menu-item-btn phone-mode"
            onClick={() => {
              onTogglePhonePreview();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">
                {isPhonePreview ? 'SWITCH TO DESKTOP' : 'SWITCH TO PHONE UI'}
              </span>
              <span className="menu-item-desc">
                Current: {isPhonePreview ? 'Mobile Phone Simulator' : 'Full Desktop View'}
              </span>
            </div>
            <span className={`menu-item-badge ${isPhonePreview ? 'phone' : 'desktop'}`}>
              {isPhonePreview ? 'PHONE' : 'DESKTOP'}
            </span>
          </button>

          <div className="menu-section-label" style={{ marginTop: '14px' }}>PREFERENCES</div>

          {/* 6. SETTINGS & ACCOUNT */}
          <button
            className="menu-item-btn"
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
          >
            <div className="menu-item-text">
              <span className="menu-item-title">SETTINGS & ACCOUNT</span>
              <span className="menu-item-desc">Units, storage cache, notifications</span>
            </div>
          </button>
        </div>

        {/* Menu Footer */}
        <div className="menu-footer">
          <div className="footer-specimen-badge">
            <span className="specimen-dot"></span>
            <span>Active: {plantName}</span>
          </div>
          <div className="footer-meta">ASPER BOTANICAL JOURNAL v2.4</div>
        </div>
      </aside>
    </div>
  );
};

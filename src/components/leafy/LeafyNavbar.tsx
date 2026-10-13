import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export type LeafyNavDestination = 'home' | 'explore' | 'journal';

interface LeafyNavbarProps {
  currentTab: LeafyNavDestination;
  onSelectTab: (tab: LeafyNavDestination) => void;
  onOpenAddPlant: () => void;
  onOpenAi: () => void;
  onOpen3dModels: () => void;
  onOpenProfile: () => void;
  isLoggedIn?: boolean;
  userAvatarUrl?: string;
}

export const LeafyNavbar: React.FC<LeafyNavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddPlant,
  onOpenAi,
  onOpen3dModels,
  onOpenProfile,
  isLoggedIn,
  userAvatarUrl
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <header className="leafy-desktop-navbar">
      <div className="leafy-navbar-container">
        {/* Brand Logo & Name */}
        <div className="leafy-brand-group" onClick={() => onSelectTab('home')}>
          <div className="leafy-brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
            </svg>
          </div>
          <div>
            <span className="leafy-brand-text">Leafy</span>
            <span className="leafy-brand-tagline">Plants Healthier Days</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="leafy-desktop-links" aria-label="Main Navigation">
          <button
            className={`leafy-nav-link ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => onSelectTab('home')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>

          <button
            className={`leafy-nav-link ${currentTab === 'explore' ? 'active' : ''}`}
            onClick={() => onSelectTab('explore')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            Explore
          </button>

          <button
            className={`leafy-nav-link ${currentTab === 'journal' ? 'active' : ''}`}
            onClick={() => onSelectTab('journal')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Journal
          </button>
        </nav>

        {/* Action Buttons & Profile Avatar */}
        <div className="leafy-desktop-actions">
          {/* Quick Theme Toggle Button */}
          <button
            className="leafy-header-icon-btn"
            title={`Current: ${resolvedTheme} mode. Click to switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode.`}
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
          >
            {resolvedTheme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* AI Plant Health Doctor button */}
          <button
            className="leafy-header-icon-btn"
            title="AI Plant Health Diagnosis"
            onClick={onOpenAi}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
            </svg>
          </button>

          {/* 3D Blender Models Manager */}
          <button
            className="leafy-header-icon-btn"
            title="Manage 3D Plant Growth Models"
            onClick={onOpen3dModels}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/>
              <path d="m3.27 6.96 8.73 4.88 8.73-4.88"/>
              <path d="M12 21.84V11.84"/>
            </svg>
          </button>

          {/* Quick Add Plant Button */}
          <button
            className="leafy-btn-primary"
            style={{ padding: '9px 18px', fontSize: '13px' }}
            onClick={onOpenAddPlant}
          >
            <span>+ Add Plant</span>
          </button>

          {/* User Profile Avatar / Sign In */}
          {isLoggedIn ? (
            <img
              src={userAvatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"}
              alt="User profile"
              className="leafy-nav-avatar"
              title="Account & Settings"
              onClick={onOpenProfile}
            />
          ) : (
            <button
              className="leafy-btn-secondary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
              onClick={onOpenProfile}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

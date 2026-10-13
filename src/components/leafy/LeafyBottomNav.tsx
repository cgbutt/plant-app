import React from 'react';
import type { LeafyNavDestination } from './LeafyNavbar';

interface LeafyBottomNavProps {
  currentTab: LeafyNavDestination | 'profile';
  onSelectTab: (tab: LeafyNavDestination | 'profile') => void;
  onOpenAddAction: () => void;
}

export const LeafyBottomNav: React.FC<LeafyBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddAction
}) => {
  return (
    <nav className="leafy-bottom-nav" aria-label="Mobile Navigation">
      <div className="leafy-bottom-nav-container">
        {/* 1. Home / Garden (Leaf) */}
        <button
          className={`leafy-bottom-tab ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => onSelectTab('home')}
          aria-label="Home / My Garden"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
          </svg>
          <span>Home</span>
        </button>

        {/* 2. Explore / Plant Book (4-grid tiles) */}
        <button
          className={`leafy-bottom-tab ${currentTab === 'explore' ? 'active' : ''}`}
          onClick={() => onSelectTab('explore')}
          aria-label="Explore Plant Book"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="2" />
            <rect width="7" height="7" x="14" y="3" rx="2" />
            <rect width="7" height="7" x="14" y="14" rx="2" />
            <rect width="7" height="7" x="3" y="14" rx="2" />
          </svg>
          <span>Explore</span>
        </button>

        {/* 3. Center Elevated + Circle */}
        <button
          className="leafy-floating-add-btn"
          onClick={onOpenAddAction}
          aria-label="Add Plant or Journal Entry"
          title="Add New Plant / Journal Entry"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>

        {/* 4. Journal */}
        <button
          className={`leafy-bottom-tab ${currentTab === 'journal' ? 'active' : ''}`}
          onClick={() => onSelectTab('journal')}
          aria-label="Plant Journal"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>Journal</span>
        </button>

        {/* 5. Profile */}
        <button
          className={`leafy-bottom-tab ${currentTab === 'profile' ? 'active' : ''}`}
          onClick={() => onSelectTab('profile')}
          aria-label="Profile and Settings"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

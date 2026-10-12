import React from 'react';

export type NavTab = 'home' | 'plantbook' | 'myplants' | 'profile';

interface BottomNavBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onAddClick: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  onAddClick
}) => {
  return (
    <nav className="botanical-bottom-nav" aria-label="Mobile Navigation Bar">
      <div className="bottom-nav-container">
        {/* Tab 1: Home / Journal */}
        <button
          className={`nav-item-btn ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => onSelectTab('home')}
        >
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </span>
          <span className="nav-label">Home</span>
        </button>

        {/* Tab 2: Plant Book */}
        <button
          className={`nav-item-btn ${currentTab === 'plantbook' ? 'active' : ''}`}
          onClick={() => onSelectTab('plantbook')}
        >
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
          </span>
          <span className="nav-label">Plant Book</span>
        </button>

        {/* Center Floating Plus Action Button */}
        <button
          className="center-floating-plus-btn"
          onClick={onAddClick}
          title="Add Plant or Specimen"
          aria-label="Add Plant"
        >
          <span className="plus-symbol">+</span>
        </button>

        {/* Tab 3: My Plants */}
        <button
          className={`nav-item-btn ${currentTab === 'myplants' ? 'active' : ''}`}
          onClick={() => onSelectTab('myplants')}
        >
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-9"/>
              <path d="M12 13c-4.5 0-7-3-7-7 4 0 7 2.5 7 7Z"/>
              <path d="M12 13c4.5 0 7-3 7-7-4 0-7 2.5-7 7Z"/>
            </svg>
          </span>
          <span className="nav-label">My Plants</span>
        </button>

        {/* Tab 4: Profile / Settings */}
        <button
          className={`nav-item-btn ${currentTab === 'profile' ? 'active' : ''}`}
          onClick={() => onSelectTab('profile')}
        >
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <span className="nav-label">Profile</span>
        </button>
      </div>
    </nav>
  );
};

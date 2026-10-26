import React from 'react';

// Precision Leaf outline icon sampled from Figma reference top-right of cards
export const ReferenceLeafIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 24,
  color = '#1D2820',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block' }}
  >
    <path
      d="M19.8 4.2C14.5 4.2 7.8 8.8 5.4 15.6C8 16.6 15.2 15.2 19 9.4C19.8 8 20 6 19.8 4.2Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.4 15.6C4 18 3 19.5 3 19.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M9 13.5C12 11.5 15.5 9 18.5 6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Potted plant outline icon from "Explore more about Pothos" card
export const ExplorePotPlantIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 56,
  color = '#23321C',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left sprout leaf curving downwards */}
    <path
      d="M24 27V20C24 20 15 21 14 16C12 20.5 16 25 24 25"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right large pointed leaf pointing upward right */}
    <path
      d="M24 27V17C24 17 34 17.5 37 10C39 17 34.5 24 24 24"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Pot rim */}
    <rect x="13" y="27" width="22" height="4" rx="2" stroke={color} strokeWidth="2.8" />
    {/* Pot body tapering down */}
    <path
      d="M16 31L17.8 41.2C18 42.2 18.8 43 19.8 43H28.2C29.2 43 30 42.2 30.2 41.2L32 31"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Droplet outline icon from "Water Cycle" pill
export const WaterCycleDropletIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#20383C',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3.2C12 3.2 6.5 10.2 6.5 14.8C6.5 17.8 8.96 20.2 12 20.2C15.04 20.2 17.5 17.8 17.5 14.8C17.5 10.2 12 3.2 12 3.2Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.2 13.5C14.2 12.2 13.4 10.6 12 9.4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Birthday cake with candle from "02 Years" card
export const AgeCakeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#2D3C23',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Candle flame */}
    <path
      d="M12 2C11.5 2.8 11.2 3.5 11.2 4.2C11.2 4.9 11.5 5.5 12 5.5C12.5 5.5 12.8 4.9 12.8 4.2C12.8 3.5 12.5 2.8 12 2Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Candle stem */}
    <path d="M12 5.5V8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    {/* Cake container */}
    <rect x="4.5" y="8" width="15" height="12" rx="2" stroke={color} strokeWidth="1.8" />
    {/* Wavy frosting drips */}
    <path
      d="M4.5 12C6 13.2 7 11 8.5 12C10 13.2 11 11 12 12C13 11 14 13.2 15.5 12C17 11 18 13.2 19.5 12"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

// Backward-compatible alias
export const AgeSproutIcon = AgeCakeIcon;

// Standalone Open Book outline icon matching Figma reference
export const NavBookIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = '#000000',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2.5 5C2.5 4.2 3.2 3.5 4 3.5H9C10.8 3.5 12 4.6 12 6.2V20.5C12 19 10.8 18 9 18H4C3.2 18 2.5 18.7 2.5 19.5V5Z"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 5C21.5 4.2 20.8 3.5 20 3.5H15C13.2 3.5 12 4.6 12 6.2V20.5C12 19 13.2 18 15 18H20C20.8 18 21.5 18.7 21.5 19.5V5Z"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Standalone Plus icon for bottom navigation
export const NavPlusIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 32,
  color = '#000000',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 4V20M4 12H20"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Standalone Settings Gear outline icon for bottom navigation
export const NavSettingsIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = '#000000',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.9" />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Subtle edit pencil icon
export const EditPencilIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 18,
  color = 'currentColor',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Close X icon
export const ModalCloseIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = 'currentColor',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Minimal Back Arrow icon for top-left navigation
export const NavBackArrowIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 22,
  color = '#1D2820',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block' }}
  >
    <path
      d="M15 19L8 12L15 5"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


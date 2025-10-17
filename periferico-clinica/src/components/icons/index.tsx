import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const Building2: React.FC<IconProps> = ({ className = 'w-8 h-8', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <path d="M18 9h1a2 2 0 0 1 2 2v11" />
    <path d="M11 7h2" />
    <path d="M11 11h2" />
    <path d="M11 15h2" />
  </svg>
);

export const Stethoscope: React.FC<IconProps> = ({ className = 'w-8 h-8', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v3.6a6 6 0 0 0 6 6V19a3 3 0 1 0 6 0v-5.4a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v4" />
    <path d="M12 15v4" />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({ className = 'ml-2 h-4 w-4', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

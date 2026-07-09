import React from 'react';

import { mark } from './styles';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 64, className }) => (
  <svg
    className={className ? `${mark} ${className}` : mark}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="PetFinder"
  >
    <circle cx="50" cy="50" r="48" fill="#ffd666" />
    <g fill="none" stroke="#94443f" strokeWidth="2.6">
      <circle cx="50" cy="54" r="34" opacity="0.28" />
      <circle cx="50" cy="54" r="24" opacity="0.45" />
    </g>
    <circle cx="50" cy="54" r="4.2" fill="#94443f" opacity="0.6" />
    <g fill="#94443f">
      <ellipse cx="50" cy="46" rx="15" ry="12" />
      <ellipse cx="33" cy="30" rx="7" ry="9" transform="rotate(-16 33 30)" />
      <ellipse cx="43" cy="20" rx="7.5" ry="9.5" transform="rotate(-5 43 20)" />
      <ellipse cx="57" cy="20" rx="7.5" ry="9.5" transform="rotate(5 57 20)" />
      <ellipse cx="67" cy="30" rx="7" ry="9" transform="rotate(16 67 30)" />
    </g>
  </svg>
);

interface LogoProps {
  width?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 180, className }) => (
  <svg
    className={className ? `${mark} ${className}` : mark}
    width={width}
    height={(width * 142) / 180}
    viewBox="0 0 180 142"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="PetFinder"
  >
    <g transform="translate(48,4) scale(0.84)">
      <circle cx="50" cy="50" r="48" fill="#ffd666" />
      <g fill="none" stroke="#94443f" strokeWidth="2.6">
        <circle cx="50" cy="54" r="34" opacity="0.28" />
        <circle cx="50" cy="54" r="24" opacity="0.45" />
      </g>
      <circle cx="50" cy="54" r="4.2" fill="#94443f" opacity="0.6" />
      <g fill="#94443f">
        <ellipse cx="50" cy="46" rx="15" ry="12" />
        <ellipse cx="33" cy="30" rx="7" ry="9" transform="rotate(-16 33 30)" />
        <ellipse
          cx="43"
          cy="20"
          rx="7.5"
          ry="9.5"
          transform="rotate(-5 43 20)"
        />
        <ellipse
          cx="57"
          cy="20"
          rx="7.5"
          ry="9.5"
          transform="rotate(5 57 20)"
        />
        <ellipse cx="67" cy="30" rx="7" ry="9" transform="rotate(16 67 30)" />
      </g>
    </g>
    <text
      x="90"
      y="128"
      textAnchor="middle"
      fontFamily="Nunito, sans-serif"
      fontWeight="800"
      fontSize="30"
      fill="#94443f"
      letterSpacing="-0.5"
    >
      petfinder
    </text>
  </svg>
);

export default Logo;

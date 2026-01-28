import { memo } from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

// Pixel art SVG icons
const icons: Record<string, JSX.Element> = {
  computer: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* Monitor Base Shadow */}
      <path d="M12 38 H36 V42 H12 Z" fill="#404040" />
      <path d="M14 36 H34 V40 H14 Z" fill="#808080" />
      {/* Monitor Stand */}
      <path d="M20 32 H28 V36 H20 Z" fill="#C0C0C0" />
      <path d="M22 32 H26 V36 H22 Z" fill="#E0E0E0" />
      {/* Monitor Frame */}
      <path d="M6 6 H42 V32 H6 Z" fill="#808080" />
      <path d="M7 7 H41 V31 H7 Z" fill="#C0C0C0" />
      <path d="M8 8 H40 V30 H8 Z" fill="#dfdfdf" />
      {/* Screen */}
      <path d="M11 11 H37 V27 H11 Z" fill="#000080" />
      <path d="M12 12 H36 V26 H12 Z" fill="#3131FF" />
      {/* Screen Reflection */}
      <path d="M12 12 H18 V14 H12 Z" fill="#6B6BFF" />
      {/* CRT Frame Shading */}
      <path d="M6 31 H42 V32 H6 Z" fill="#404040" />
      <path d="M41 7 V31 H42 V7 Z" fill="#404040" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* 3D Bevelled Frame */}
      <path d="M4 4 H44 V44 H4 Z" fill="#404040" />
      <path d="M4 4 H43 V43 H4 Z" fill="#808080" />
      <path d="M5 5 H42 V42 H5 Z" fill="#C0C0C0" />
      
      {/* Head Silhouette - Dithered Style */}
      <path d="M18 16 H30 V28 H18 Z" fill="#808080" />
      <path d="M20 18 H28 V26 H20 Z" fill="#E0E0E0" />
      <path d="M16 28 H32 V40 H16 Z" fill="#000080" />
      <path d="M18 30 H30 V38 H18 Z" fill="#3131FF" />
      
      {/* 3D Highlights */}
      <path d="M5 5 H42 V6 H5 Z" fill="#ffffff" />
      <path d="M5 5 V42 H6 V5 Z" fill="#ffffff" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* 3D Bevelled Frame */}
      <path d="M4 4 H44 V44 H4 Z" fill="#808080" />
      <path d="M4 4 H43 V43 H4 Z" fill="#dfdfdf" />
      <path d="M5 5 H42 V42 H5 Z" fill="#C0C0C0" />
      {/* Computer Icon */}
      <rect x="12" y="10" width="24" height="18" fill="#808080" />
      <rect x="13" y="11" width="22" height="16" fill="#dfdfdf" />
      <rect x="15" y="13" width="18" height="12" fill="#000080" />
      {/* Hammer/Wrench Overlay */}
      <path
        d="M28 24 L38 34"
        stroke="#404040"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 24 L38 34"
        stroke="#808080"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="24"
        y="20"
        width="8"
        height="8"
        fill="#FFD93D"
        stroke="#404040"
      />
    </svg>
  ),
  internet: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* The classic "e" */}
      <path
        d="M12 24 C12 14 20 8 30 8 C38 8 42 14 42 14 L36 20 C36 20 34 16 30 16 C26 16 22 20 22 24 C22 28 26 32 30 32 C34 32 36 28 36 28 L42 34 C42 34 38 40 30 40 C20 40 12 34 12 24 Z"
        fill="#3131FF"
        stroke="#000080"
        strokeWidth="1"
      />
      <path d="M22 24 H42" stroke="#3131FF" strokeWidth="6" />
      <path d="M22 24 H42" stroke="#6B6BFF" strokeWidth="2" />
      {/* Gold ring */}
      <path d="M8 32 L40 16" stroke="#FFD93D" strokeWidth="4" opacity="0.8" />
      <path d="M8 32 L40 16" stroke="#8B4513" strokeWidth="1" opacity="0.8" />
    </svg>
  ),
  paint: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* OG Palette with brush */}
      <ellipse
        cx="24"
        cy="28"
        rx="18"
        ry="14"
        fill="#E0E0E0"
        stroke="#808080"
        strokeWidth="2"
      />
      <circle cx="16" cy="24" r="3" fill="#FF0000" />
      <circle cx="24" cy="20" r="3" fill="#FFFF00" />
      <circle cx="32" cy="24" r="3" fill="#0000FF" />
      <circle cx="20" cy="32" r="3" fill="#00FF00" />
      <circle cx="28" cy="32" r="3" fill="#FF00FF" />
      {/* Brush */}
      <path d="M38 6 L30 18 L34 22 L42 10 Z" fill="#8B4513" stroke="#404040" />
      <rect
        x="28"
        y="16"
        width="6"
        height="4"
        transform="rotate(-45 28 16)"
        fill="#FFD93D"
      />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* OG Document with Shading */}
      <path d="M10 4 H32 L40 12 V44 H10 Z" fill="#808080" />
      <path d="M8 2 H31 L38 9 V42 H8 Z" fill="#C0C0C0" />
      <path d="M9 3 H30 L37 10 V41 H9 Z" fill="#FFFFFF" />
      {/* Dog-ear */}
      <path d="M30 3 V10 H37 Z" fill="#808080" />
      <path d="M31 3 V9 H37 Z" fill="#dfdfdf" />
      {/* Lines */}
      <rect x="14" y="16" width="20" height="2" fill="#E0E0E0" />
      <rect x="14" y="22" width="20" height="2" fill="#E0E0E0" />
      <rect x="14" y="28" width="20" height="2" fill="#E0E0E0" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* OG Walkman style cassette */}
      <rect x="4" y="12" width="40" height="28" rx="2" fill="#404040" />
      <rect x="6" y="14" width="36" height="24" rx="1" fill="#FFD93D" />
      <rect x="10" y="18" width="28" height="16" fill="#8B4513" />
      {/* Reels */}
      <circle cx="17" cy="26" r="5" fill="#C0C0C0" stroke="#404040" />
      <circle cx="31" cy="26" r="5" fill="#C0C0C0" stroke="#404040" />
      <circle cx="17" cy="26" r="2" fill="#404040" />
      <circle cx="31" cy="26" r="2" fill="#404040" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* 3D Perspective Folder */}
      <path d="M4 12 H20 L24 8 H44 V36 H4 L4 12 Z" fill="#808080" />
      <path d="M6 10 H20 L24 6 H42 V34 H6 L6 10 Z" fill="#C0C0C0" />
      <path d="M6 14 H42 V38 H6 Z" fill="#dfdfdf" />
      <path
        d="M4 14 H44 V40 H4 Z"
        fill="#FFD93D"
        stroke="#808080"
        strokeWidth="2"
      />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* OG Aluminum Can */}
      <path d="M12 12 H36 V40 H12 Z" fill="#808080" />
      <path d="M10 10 H38 V14 H10 Z" fill="#C0C0C0" stroke="#808080" />
      {/* Ridges */}
      <path
        d="M16 16 V36 M24 16 V36 M32 16 V36"
        stroke="#C0C0C0"
        strokeWidth="2"
      />
      <path
        d="M18 16 V36 M26 16 V36 M34 16 V36"
        stroke="#404040"
        strokeWidth="1"
      />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* Generic File */}
      <path
        d="M12 6 H36 V42 H12 Z"
        fill="#C0C0C0"
        stroke="#808080"
        strokeWidth="2"
      />
      <path d="M14 8 H34 V40 H14 Z" fill="#FFFFFF" />
      <rect x="18" y="12" width="12" height="6" fill="#87CEEB" />
    </svg>
  ),
  guestbook: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* OG Open Book with Shading */}
      <path d="M8 8 H40 V36 H8 Z" fill="#808080" />
      <path d="M6 6 H38 V34 H6 Z" fill="#C0C0C0" />
      <path d="M7 7 H22 V33 H7 Z" fill="#FFFFFF" />
      <path d="M22 7 H37 V33 H22 Z" fill="#FFFFFF" />
      <path d="M22 7 V33" stroke="#808080" strokeWidth="1" />
      {/* Scribbles */}
      <rect x="10" y="12" width="8" height="2" fill="#dfdfdf" />
      <rect x="26" y="12" width="8" height="2" fill="#dfdfdf" />
    </svg>
  ),
  kickflip: (
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="8" y="24" width="32" height="6" rx="2" fill="#404040" />
      <rect x="10" y="22" width="28" height="2" fill="#C0C0C0" />
      <circle cx="14" cy="32" r="4" fill="#333" stroke="#808080" />
      <circle cx="34" cy="32" r="4" fill="#333" stroke="#808080" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* Handheld Body */}
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#808080" />
      <rect
        x="10"
        y="6"
        width="28"
        height="36"
        rx="2"
        fill="#C0C0C0"
        stroke="#404040"
      />
      {/* Screen */}
      <rect
        x="12"
        y="10"
        width="24"
        height="20"
        fill="#2d3436"
        stroke="#404040"
      />
      {/* The Snake (Green) */}
      <rect x="14" y="14" width="4" height="4" fill="#00ff00" />
      <rect x="18" y="14" width="4" height="4" fill="#00cc00" />
      <rect x="22" y="14" width="4" height="4" fill="#00cc00" />
      <rect x="22" y="18" width="4" height="4" fill="#00cc00" />
      {/* The Food (Red) */}
      <rect x="30" y="22" width="4" height="4" fill="#ff0000" />
      {/* Buttons */}
      <circle cx="18" cy="36" r="3" fill="#404040" />
      <circle cx="30" cy="36" r="3" fill="#404040" />
      <rect x="22" y="34" width="4" height="4" fill="#404040" />
    </svg>
  ),
  reel: (
    <svg viewBox="0 0 48 48" fill="none">
      <rect
        x="6"
        y="10"
        width="36"
        height="28"
        rx="2"
        fill="#333"
        stroke="#808080"
      />
      <rect x="10" y="14" width="28" height="20" fill="#1a1a1a" />
      <path
        d="M10 18 H38 M10 30 H38"
        stroke="#333"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  ),
  astro: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="#1a1a2e"
        stroke="#808080"
        strokeWidth="2"
      />
      <circle cx="24" cy="24" r="12" fill="#3131FF" opacity="0.5" />
      <rect x="22" y="10" width="4" height="4" fill="#FFF" />
      <rect x="12" y="22" width="4" height="4" fill="#FFF" />
    </svg>
  ),
  latina: (
    <svg viewBox="0 0 48 48" fill="none">
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="4"
        fill="#FF6B6B"
        stroke="#808080"
      />
      <rect x="12" y="12" width="24" height="24" fill="#FFD93D" />
      <path d="M12 24 H36" stroke="#FF6B6B" strokeWidth="2" />
    </svg>
  ),
  egyptian: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 6 L42 38 H6 Z" fill="#C0C0C0" stroke="#808080" />
      <path d="M24 10 L38 36 H10 Z" fill="#FFD93D" />
      <rect x="20" y="24" width="8" height="2" fill="#8B4513" />
    </svg>
  ),
  japanese: (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" fill="#FFF" stroke="#808080" />
      <circle cx="24" cy="24" r="10" fill="#FF0000" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 48 48" fill="none">
      {/* 3D Bevelled Base */}
      <path d="M6 6 H42 V42 H6 Z" fill="#404040" />
      <path d="M6 6 H41 V41 H6 Z" fill="#808080" />
      <path d="M7 7 H40 V40 H7 Z" fill="#C0C0C0" />
      <path d="M8 8 H38 V38 H8 Z" fill="#0077B5" />
      {/* Pixelated "in" */}
      <path
        d="M14 16 V32 M24 22 V32 M24 22 C24 22 24 18 28 18 C32 18 32 22 32 22 V32"
        stroke="white"
        strokeWidth="4"
      />
      <rect x="12" y="10" width="4" height="4" fill="white" />
    </svg>
  ),
};

function Icon({ name, size = 48, className }: IconProps) {
  const icon = icons[name] || icons.file;

  return (
    <div
      style={{ width: size, height: size }}
      className={className}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
}

export default memo(Icon);

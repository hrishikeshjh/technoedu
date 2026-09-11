import React from 'react';

// ── Indian State Emblem (Ashoka Lion Capital) ──────────────────────────────
// Used for: UPSC, WBCS, SSC, Banking, Railways (Government of India exams)
export const IndianStateEmblem: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base platform / plinth */}
    <rect x="8" y="78" width="64" height="6" rx="1" fill="currentColor" />
    <rect x="14" y="74" width="52" height="4" rx="1" fill="currentColor" />

    {/* Abacus / drum with animals and wheel */}
    <ellipse cx="40" cy="65" rx="28" ry="6" fill="currentColor" />
    <rect x="12" y="55" width="56" height="10" rx="2" fill="currentColor" />
    {/* Wheel (Dharma Chakra) - center */}
    <circle cx="40" cy="60" r="6" fill="white" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="60" r="2" fill="currentColor" />
    {/* Spokes */}
    <line x1="40" y1="55" x2="40" y2="65" stroke="currentColor" strokeWidth="0.8" />
    <line x1="35" y1="57" x2="45" y2="63" stroke="currentColor" strokeWidth="0.8" />
    <line x1="35" y1="63" x2="45" y2="57" stroke="currentColor" strokeWidth="0.8" />
    <line x1="34" y1="60" x2="46" y2="60" stroke="currentColor" strokeWidth="0.8" />
    {/* Horse left of wheel */}
    <path d="M22 60 C22 56 25 54 28 55 C30 55.5 30 58 28 59 L25 60 Z" fill="white" stroke="currentColor" strokeWidth="1"/>
    {/* Bull right of wheel */}
    <path d="M52 60 C52 56 56 54 58 55 C60 55.5 61 58 59 59 L56 60 Z" fill="white" stroke="currentColor" strokeWidth="1"/>

    {/* Three lion bodies (one facing front, two turned) */}
    {/* Centre lion body */}
    <path d="M33 52 C33 44 36 38 40 36 C44 38 47 44 47 52 Z" fill="currentColor" />
    {/* Left lion body (turned) */}
    <path d="M20 51 C18 44 21 38 25 37 C28 38 30 43 28 50 Z" fill="currentColor" />
    {/* Right lion body (turned) */}
    <path d="M60 51 C62 44 59 38 55 37 C52 38 50 43 52 50 Z" fill="currentColor" />

    {/* Centre lion head */}
    <ellipse cx="40" cy="33" rx="6" ry="5" fill="currentColor" />
    {/* Centre lion mane */}
    <ellipse cx="40" cy="34" rx="8" ry="7" fill="currentColor" />
    <ellipse cx="40" cy="33" rx="4" ry="4" fill="white" />
    {/* Centre lion face */}
    <circle cx="38" cy="32" r="0.8" fill="currentColor" />
    <circle cx="42" cy="32" r="0.8" fill="currentColor" />
    <path d="M38 34.5 Q40 36 42 34.5" stroke="currentColor" strokeWidth="0.6" fill="none" />

    {/* Left lion head */}
    <ellipse cx="24" cy="34" rx="5" ry="4.5" fill="currentColor" />
    <ellipse cx="24" cy="34" rx="7" ry="6" fill="currentColor" />
    <ellipse cx="24" cy="34" rx="3.5" ry="3.5" fill="white" />
    <circle cx="22.5" cy="33" r="0.7" fill="currentColor" />
    <circle cx="25.5" cy="33" r="0.7" fill="currentColor" />

    {/* Right lion head */}
    <ellipse cx="56" cy="34" rx="5" ry="4.5" fill="currentColor" />
    <ellipse cx="56" cy="34" rx="7" ry="6" fill="currentColor" />
    <ellipse cx="56" cy="34" rx="3.5" ry="3.5" fill="white" />
    <circle cx="54.5" cy="33" r="0.7" fill="currentColor" />
    <circle cx="57.5" cy="33" r="0.7" fill="currentColor" />

    {/* Motto text: Satyameva Jayate */}
    <text x="40" y="88" textAnchor="middle" fontSize="5.5" fontFamily="serif" fill="currentColor" letterSpacing="0.3">सत्यमेव जयते</text>
  </svg>
);

// ── Globe / International (Study Abroad) ──────────────────────────────────
// Used for: GRE, GMAT, IELTS, TOEFL, SAT
export const InternationalGlobe: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="2.5" fill="none" />
    {/* Latitude lines */}
    <ellipse cx="40" cy="40" rx="32" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="8" y1="40" x2="72" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="24" x2="66" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="14" y1="56" x2="66" y2="56" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
    {/* Longitude lines */}
    <ellipse cx="40" cy="40" rx="18" ry="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="40" y1="8" x2="40" y2="72" stroke="currentColor" strokeWidth="1.5" />
    {/* Graduation cap overlay — small cap at top to signal academia */}
    <rect x="29" y="6" width="22" height="3" rx="1.5" fill="currentColor" />
    <line x1="40" y1="9" x2="40" y2="14" stroke="currentColor" strokeWidth="2" />
    <path d="M32 11 L40 7 L48 11 L40 15 Z" fill="currentColor" />
  </svg>
);

// ── Scales of Justice ──────────────────────────────────────────────────────
// Used for: CLAT, Law entrances
export const ScalesOfJustice: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pillar */}
    <line x1="40" y1="8" x2="40" y2="72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Base */}
    <rect x="24" y="72" width="32" height="5" rx="2" fill="currentColor" />
    <rect x="18" y="77" width="44" height="4" rx="2" fill="currentColor" />
    {/* Cross arm */}
    <line x1="14" y1="22" x2="66" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Top ornament */}
    <circle cx="40" cy="10" r="4" fill="currentColor" />
    <line x1="40" y1="6" x2="40" y2="8" stroke="currentColor" strokeWidth="2" />

    {/* Left chain & pan */}
    <line x1="18" y1="22" x2="12" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" />
    <line x1="18" y1="22" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" />
    <path d="M8 42 Q12 48 18 48 Q24 48 28 42 Z" fill="currentColor" />
    <line x1="8" y1="42" x2="28" y2="42" stroke="currentColor" strokeWidth="1.5" />

    {/* Right chain & pan (slightly lower = justice balanced) */}
    <line x1="62" y1="22" x2="56" y2="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" />
    <line x1="62" y1="22" x2="68" y2="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2" />
    <path d="M52 44 Q56 50 62 50 Q68 50 72 44 Z" fill="currentColor" />
    <line x1="52" y1="44" x2="72" y2="44" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ── IIM / Management Crest ─────────────────────────────────────────────────
// Used for: CAT, CUET, Management entrances
export const ManagementCrest: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield outline */}
    <path d="M10 12 H70 V52 Q70 72 40 82 Q10 72 10 52 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    {/* Horizontal divider */}
    <line x1="10" y1="38" x2="70" y2="38" stroke="currentColor" strokeWidth="1.5" />
    {/* Vertical divider */}
    <line x1="40" y1="12" x2="40" y2="38" stroke="currentColor" strokeWidth="1.5" />
    {/* Top-left: book */}
    <rect x="18" y="19" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="25" y1="19" x2="25" y2="30" stroke="currentColor" strokeWidth="1.2" />
    {/* Top-right: rising bar chart (growth) */}
    <rect x="44" y="27" width="4" height="3" rx="0.5" fill="currentColor" />
    <rect x="50" y="23" width="4" height="7" rx="0.5" fill="currentColor" />
    <rect x="56" y="19" width="4" height="11" rx="0.5" fill="currentColor" />
    {/* Bottom: graduation torch / lamp */}
    <ellipse cx="40" cy="56" rx="8" ry="5" fill="currentColor" />
    <rect x="37" y="47" width="6" height="9" rx="1" fill="currentColor" />
    {/* Flame */}
    <path d="M40 44 C38 41 36 38 40 35 C44 38 42 41 40 44 Z" fill="currentColor" />
  </svg>
);

// ── Banking / Finance Emblem ───────────────────────────────────────────────
// Used for: Banking PO, IBPS, SBI, RBI exams
export const BankingEmblem: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Building / pillars */}
    <rect x="8" y="28" width="64" height="40" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Pediment / triangle roof */}
    <path d="M6 28 L40 8 L74 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
    {/* Base line */}
    <rect x="4" y="68" width="72" height="5" rx="1" fill="currentColor" />
    <rect x="8" y="73" width="64" height="3" rx="1" fill="currentColor" />
    {/* Pillars */}
    <rect x="16" y="30" width="6" height="36" rx="1" fill="currentColor" />
    <rect x="28" y="30" width="6" height="36" rx="1" fill="currentColor" />
    <rect x="46" y="30" width="6" height="36" rx="1" fill="currentColor" />
    <rect x="58" y="30" width="6" height="36" rx="1" fill="currentColor" />
    {/* Coin / rupee symbol center */}
    <circle cx="40" cy="17" r="5" fill="currentColor" />
    <text x="40" y="20.5" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fill="white" fontWeight="bold">₹</text>
  </svg>
);

// ── Dispatcher: returns the right emblem component for a given exam ─────────
export function getExamEmblem(
  shortCode: string,
  category: string,
  size = 36
): React.ReactNode {
  const code = shortCode.toUpperCase();

  // Indian government exams → State Emblem
  if (
    code.includes('UPSC') ||
    code.includes('WBCS') ||
    code.includes('SSC') ||
    code.includes('RAILWAYS') ||
    code.includes('DEFENCE') ||
    category === 'Government' && !code.includes('BANKING')
  ) {
    return <IndianStateEmblem size={size} />;
  }

  // Banking / finance exams
  if (
    code.includes('BANKING') ||
    code.includes('IBPS') ||
    code.includes('SBI') ||
    code.includes('RBI')
  ) {
    return <BankingEmblem size={size} />;
  }

  // Study Abroad / international English & aptitude
  if (
    code.includes('GRE') ||
    code.includes('GMAT') ||
    code.includes('IELTS') ||
    code.includes('TOEFL') ||
    code.includes('SAT') ||
    category === 'Study Abroad'
  ) {
    return <InternationalGlobe size={size} />;
  }

  // Law entrances
  if (
    code.includes('CLAT') ||
    code.includes('LAW') ||
    category === 'Law & Entrance' && (code.includes('CLAT') || code.includes('AILET'))
  ) {
    return <ScalesOfJustice size={size} />;
  }

  // Management / CAT / CUET
  if (
    code.includes('CAT') ||
    code.includes('CUET') ||
    code.includes('XAT') ||
    code.includes('SNAP') ||
    category === 'Law & Entrance'
  ) {
    return <ManagementCrest size={size} />;
  }

  // Default
  return <IndianStateEmblem size={size} />;
}

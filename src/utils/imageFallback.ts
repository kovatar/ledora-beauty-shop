import type React from 'react';

// Safe SVG data URIs for cosmetic products in case external CDN has TLS/handshake latency
export function getProductFallbackImage(category: string = 'skincare', title: string = "L'DORA"): string {
  const brandName = "L'DORA BEAUTY";
  
  // Category-specific color accents
  let color1 = '#D81B60';
  let color2 = '#BE123C';
  let categoryLabel = 'محصول تخصصی لدورا';
  let iconSvg = '';

  if (category === 'skincare') {
    color1 = '#E11D48';
    color2 = '#9F1239';
    categoryLabel = 'مراقبت از پوست لدورا کِر';
    iconSvg = `
      <rect x="75" y="55" width="50" height="90" rx="12" fill="#FFFFFF" opacity="0.95"/>
      <rect x="90" y="38" width="20" height="20" rx="4" fill="#FCE4EC"/>
      <circle cx="100" cy="85" r="14" fill="#F43F5E" opacity="0.2"/>
      <path d="M100 76 L100 94 M91 85 L109 85" stroke="#D81B60" stroke-width="2.5" stroke-linecap="round"/>
    `;
  } else if (category === 'haircare') {
    color1 = '#D97706';
    color2 = '#B45309';
    categoryLabel = 'مراقبت از مو الیکس و لدورا';
    iconSvg = `
      <rect x="78" y="50" width="44" height="95" rx="10" fill="#FFFFFF" opacity="0.95"/>
      <path d="M85 35 L115 35 L110 50 L90 50 Z" fill="#FEF3C7"/>
      <path d="M100 75 Q108 90 100 110" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round"/>
    `;
  } else if (category === 'makeup') {
    color1 = '#C026D3';
    color2 = '#86198F';
    categoryLabel = 'آرایشی لدورا بیوتی';
    iconSvg = `
      <rect x="85" y="70" width="30" height="75" rx="6" fill="#1E293B"/>
      <path d="M89 70 L89 45 Q100 35 111 45 L111 70 Z" fill="#E11D48"/>
      <rect x="85" y="90" width="30" height="10" fill="#F472B6"/>
    `;
  } else if (category === 'fragrance') {
    color1 = '#0D9488';
    color2 = '#115E59';
    categoryLabel = 'پرفیوم لدورا فرگرنس';
    iconSvg = `
      <rect x="70" y="60" width="60" height="80" rx="16" fill="#FFFFFF" opacity="0.95"/>
      <rect x="88" y="42" width="24" height="20" rx="4" fill="#CCFBF1"/>
      <circle cx="100" cy="100" r="18" fill="#0D9488" opacity="0.15"/>
      <text x="100" y="104" font-family="sans-serif" font-size="9" font-weight="bold" fill="#0D9488" text-anchor="middle">PARFUM</text>
    `;
  } else {
    color1 = '#2563EB';
    color2 = '#1D4ED8';
    categoryLabel = 'بهداشت و سلامت PMLM';
    iconSvg = `
      <rect x="65" y="65" width="70" height="60" rx="14" fill="#FFFFFF" opacity="0.95"/>
      <path d="M100 80 L100 110 M85 95 L115 95" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="100%" stop-color="#F1F5F9" />
      </linearGradient>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#bgGrad)"/>
    <circle cx="100" cy="95" r="55" fill="${color1}" opacity="0.08"/>
    ${iconSvg}
    <rect x="25" y="156" width="150" height="24" rx="12" fill="#FFFFFF" opacity="0.9" stroke="#E2E8F0" stroke-width="1"/>
    <text x="100" y="172" font-family="sans-serif" font-size="9" font-weight="bold" fill="#334155" text-anchor="middle">${brandName}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  category: string = 'skincare',
  title: string = "L'DORA"
) {
  const target = event.currentTarget;
  target.onerror = null; // prevent infinite loops
  target.src = getProductFallbackImage(category, title);
}

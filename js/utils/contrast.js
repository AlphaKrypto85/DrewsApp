/**
 * WCAG 2.1 Contrast & Color Utility
 * Calculates luminance and contrast ratios to ensure accessibility.
 */

export function hexToRgb(hex) {
  let cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getWcagRating(ratio) {
  if (ratio >= 7.0) {
    return { level: 'AAA', status: 'Excellent', pass: true, color: '#10b981' };
  } else if (ratio >= 4.5) {
    return { level: 'AA', status: 'Pass', pass: true, color: '#059669' };
  } else if (ratio >= 3.0) {
    return { level: 'AA Large', status: 'Large Text Only', pass: false, color: '#f59e0b' };
  } else {
    return { level: 'Fail', status: 'Low Contrast', pass: false, color: '#ef4444' };
  }
}

export function getAccessibleTextColor(backgroundHex) {
  const whiteRatio = getContrastRatio(backgroundHex, '#ffffff');
  const blackRatio = getContrastRatio(backgroundHex, '#111827');
  return whiteRatio >= blackRatio ? '#ffffff' : '#111827';
}

export function rgbToHex(r, g, b) {
  const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
  return '#' + [r, g, b].map(x => clamp(x).toString(16).padStart(2, '0')).join('');
}

export function adjustBrightness(hex, percent) {
  const rgb = hexToRgb(hex);
  const change = Math.round(255 * (percent / 100));
  return rgbToHex(rgb.r + change, rgb.g + change, rgb.b + change);
}

export function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  return getLuminance(rgb) > 0.45;
}

export function getHoverColor(hex) {
  const lum = getLuminance(hexToRgb(hex));
  const change = lum < 0.10 ? +14 : -12;
  return adjustBrightness(hex, change);
}

export function autoHarmonizeColors(primaryHex, bgHex, accentHex) {
  const isLightBg = isLightColor(bgHex);
  const primaryHover = getHoverColor(primaryHex);

  if (isLightBg) {
    return {
      primary: primaryHex,
      primaryHover,
      accent: accentHex || adjustBrightness(primaryHex, 20),
      bg: bgHex,
      surface: '#ffffff',
      heroBg: adjustBrightness(bgHex, -3),
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b'
    };
  } else {
    return {
      primary: primaryHex,
      primaryHover,
      accent: accentHex || adjustBrightness(primaryHex, 20),
      bg: bgHex,
      surface: adjustBrightness(bgHex, 10),
      heroBg: adjustBrightness(bgHex, 5),
      border: adjustBrightness(bgHex, 18),
      text: '#f8fafc',
      textMuted: '#94a3b8'
    };
  }
}

export function toggleCanvasMode(colors) {
  const currentlyLight = isLightColor(colors.bg);
  if (currentlyLight) {
    return {
      ...colors,
      bg: '#0b0f19',
      surface: '#111827',
      heroBg: '#0e1526',
      border: '#1f293d',
      text: '#f8fafc',
      textMuted: '#94a3b8'
    };
  } else {
    return {
      ...colors,
      bg: '#f8fafc',
      surface: '#ffffff',
      heroBg: '#f1f5f9',
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b'
    };
  }
}

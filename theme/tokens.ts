// JS-side mirror of design tokens for Reanimated, SVG, and LinearGradient props

export const colors = {
  background: '#0A0A0F',
  surface: '#12121A',
  elevated: '#1C1C28',
  border: '#2A2A3A',

  textPrimary: '#FFFFFF',
  textSecondary: '#8A8A9A',
  textTertiary: '#4A4A5A',
  textInverse: '#0A0A0F',

  primary: '#0066CC',
  accent: '#00C9B1',
  gradientStart: '#0066CC',
  gradientEnd: '#00C9B1',

  status: {
    warning: { bg: '#2A1F00', border: '#7A5A00', text: '#FFD166' },
    success: { bg: '#00261A', border: '#006644', text: '#06D6A0' },
    error: { bg: '#2A0A0A', border: '#7A1A1A', text: '#FF6B6B' },
    pending: { bg: '#0D1A2A', border: '#1A3A66', text: '#4DA6FF' },
    completed: { bg: '#121A12', border: '#2A3A2A', text: '#8A9A8A' },
    info: { bg: '#0A1A2A', border: '#1A3A5A', text: '#64B5F6' },
  },
} as const;

export const gradients = {
  primary: ['#0066CC', '#00C9B1'] as const,
  primaryReversed: ['#00C9B1', '#0066CC'] as const,
  card: ['rgba(28, 28, 40, 0)', 'rgba(10, 10, 15, 0.95)'] as const,
  subtle: ['rgba(0, 102, 204, 0.1)', 'rgba(0, 201, 177, 0.05)'] as const,
  hero: ['rgba(10, 10, 15, 0)', 'rgba(10, 10, 15, 0.7)', 'rgba(10, 10, 15, 0.98)'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  display: { size: 32, lineHeight: 40, weight: '700' as const },
  h1: { size: 26, lineHeight: 34, weight: '700' as const },
  h2: { size: 22, lineHeight: 30, weight: '600' as const },
  h3: { size: 18, lineHeight: 26, weight: '600' as const },
  bodyLg: { size: 16, lineHeight: 24, weight: '400' as const },
  body: { size: 15, lineHeight: 22, weight: '400' as const },
  label: { size: 13, lineHeight: 18, weight: '500' as const },
  caption: { size: 12, lineHeight: 16, weight: '400' as const },
} as const;

export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
  glowPrimary: {
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  glowAccent: {
    shadowColor: '#00C9B1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

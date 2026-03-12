// Shared types and colors for the app preview components
// Always dark theme - matches the real Termoras desktop app

export type PreviewView = 'terminal' | 'kanban' | 'git'

export const PREVIEW_COLORS = {
  bgPrimary: '#0d1b2a',
  bgSidebar: '#091520',
  bgActive: '#1a3040',
  bgHover: '#122535',
  textPrimary: '#d4dde8',
  textSecondary: '#7089a0',
  textDim: '#52555e',
  accentBlue: '#6ba1f1',
  accentGreen: '#5ec4a8',
  accentRed: '#f06f6f',
  border: '#17293a',
  glowColor: 'rgba(107, 161, 241, 0.3)',
} as const

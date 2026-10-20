export const lightColors = {
  background: '#F3F4F8',
  card: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#6B7280',
  border: '#D1D5DB',
  primary: '#2563EB',
  danger: '#DC2626',
};

export const darkColors = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#F8FAFC',
  subtext: '#94A3B8',
  border: '#334155',
  primary: '#3B82F6',
  danger: '#F87171',
};

export function getTheme(scheme) {
  return scheme === 'dark' ? darkColors : lightColors;
}
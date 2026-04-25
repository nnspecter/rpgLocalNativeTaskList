// theme/colors.ts
export const lightTheme = {
  background: '#F4F4F8',
  text: '#1C1B1F',
  primary: '#6200ee',
  card: '#FFFFFF',
  border: '#e0e0e0',
  inputBackground: '#FAFAFA',
  avatarBackground: '#EEF0FF',
  errorBackground: '#FFEDEC',
  errorText: '#BA1A1A',
  buttonDisabled: '#9E9E9E',
};

export const darkTheme = {
  background: '#121212',
  text: '#E6E1E5',
  primary: '#bb86fc',
  card: '#1E1E2E',
  border: '#333333',
  inputBackground: '#2A2A3A',
  avatarBackground: '#2D2B55',
  errorBackground: '#3B1A1A',
  errorText: '#FF8A80',
  buttonDisabled: '#555555',
};

export type Theme = typeof lightTheme;
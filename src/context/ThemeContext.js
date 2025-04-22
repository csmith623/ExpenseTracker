import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

const lightColors = {
  background: '#FFFFFF',
  text: '#121212',
  card: '#F5F5F5',
  border: '#E0E0E0',
};

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  border: '#333333',
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState({
    mode: colorScheme,
    colors: colorScheme === 'dark' ? darkColors : lightColors,
    accent: '#4CAF50'
  });

  const updateTheme = (newTheme) => {
    setTheme(prev => ({
      ...prev,
      ...newTheme,
      colors: newTheme.mode === 'dark' ? darkColors : lightColors
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
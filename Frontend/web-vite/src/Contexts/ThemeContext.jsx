import React, { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

export const useUser = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("Light"); // Store the current logged-in user

  const setLight = () => {
    setCurrentTheme("Light")
  }

  const setDark = () => {
    setCurrentTheme("Dark")
  }

  const value = {
    currentTheme,
    setLight,
    setDark
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

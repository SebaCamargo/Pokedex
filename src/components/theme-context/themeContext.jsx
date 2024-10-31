
// src/ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';


// Crear un contexto para el tema
const ThemeContext = createContext();

// Estilos de tema
const darkTheme = {
  backgroundColor: '#215b4e',
  minHeight: '100vh'

};

const lightTheme = {
  backgroundColor: '#76a990',
  minHeight: '100vh'

};


// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro


// Función para alternar entre dark y light mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Cambiar entre dark y light
  };

  // Determina qué tema aplicar
  const currentTheme = isDarkMode ? darkTheme : lightTheme;


  return (
    
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto
export const useTheme = () => useContext(ThemeContext);

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definimos un tipo para los temas disponibles
type Theme = 'light' | 'dark' | 'yellow' | 'orange' | 'green' | 'blue' | 'pink'; // Puedes agregar más temas aquí

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void; // Función para establecer el tema directamente
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializamos el tema con el valor guardado en localStorage o 'light' por defecto
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );

  // Efecto para aplicar el tema al documento y guardarlo en localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  return context;
};
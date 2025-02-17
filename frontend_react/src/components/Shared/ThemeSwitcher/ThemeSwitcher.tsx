import { FC } from 'react';
import { useTheme } from './ThemeContext'; // Asegúrate de importar el hook useTheme
import './ThemeSwitcher.css';

export const ThemeSwitcher: FC = () => {
  // Definimos un tipo para los temas disponibles
  type Theme = 'light' | 'dark' | 'yellow' | 'orange' | 'green' | 'blue' | 'pink';

  const { theme, setTheme } = useTheme(); // Usamos setTheme del contexto

  // Lista de temas disponibles
  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'pink', label: 'Pink' },
  ];

  // Maneja el cambio de tema
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as Theme; // Aseguramos que el valor sea de tipo Theme
    setTheme(selectedTheme); // Establece el tema directamente
  };

  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select" className="sr-only">Select theme</label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="theme-select"
      >
        {themes.map((themeOption) => (
          <option key={themeOption.value} value={themeOption.value}>
            {themeOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};
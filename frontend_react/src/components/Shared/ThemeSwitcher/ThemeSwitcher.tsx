import { FC } from 'react';
import { useTheme } from './ThemeContext'; // Asegúrate de importar el hook useTheme
import './ThemeSwitcher.css';

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme(); // Consume el contexto

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    // Cambiar el tema directamente usando el setter de tema
    localStorage.setItem('theme', selectedTheme); // Guarda el tema seleccionado en el localStorage
    toggleTheme(); // Invoca el toggle para cambiar el tema
  };

  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={handleChange}
        className="theme-select"
        aria-label="Select theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

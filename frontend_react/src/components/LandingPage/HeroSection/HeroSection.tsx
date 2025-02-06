import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useTheme } from '../../Shared/ThemeSwitcher/ThemeContext'; // Importa el contexto

export const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className={`hero ${theme === 'dark' ? 'hero-dark' : 'hero-light'}`}>
            <div className="hero-content">
                <h1>Tus Notas, Tu Vida, Tu Espacio</h1>
                <h3>Organiza tu día a día de manera rápida, eficiente y desde cualquier lugar</h3>
                <p className="hero-description">Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar, desde tareas diarias hasta ideas importantes. ¡Empieza ahora y mantén todo bajo control!</p>
                <Link to="/dashboard" className="button hero-button">
                    Dashboard
                </Link>
            </div>
        </section>
    );
};


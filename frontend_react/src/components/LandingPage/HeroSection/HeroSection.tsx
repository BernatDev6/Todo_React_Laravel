import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useTheme } from '../../Shared/ThemeSwitcher/ThemeContext'; // Importa el contexto

export const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className={`hero ${theme === 'dark' ? 'hero-dark' : 'hero-light'}`}>
            <div className="hero-content">
                <h1>Crea tus Notas para Organizar</h1>
                <p>Organiza tu vida con facilidad. Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar.</p>
                <p>Organiza tu vida con facilidad. Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar.</p>
                <p>Organiza tu vida con facilidad. Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar.</p>
                <Link to="/dashboard" className="button hero-button">
                    Dashboard
                </Link>
            </div>
        </section>
    );
};


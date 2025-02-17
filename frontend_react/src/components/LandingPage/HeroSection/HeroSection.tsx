import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import { useTheme } from '../../Shared/ThemeSwitcher/ThemeContext';

export const HeroSection = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login', { state: { message: 'Inicia sesión para acceder al dashboard.' } });
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <section className={`hero ${theme}`}>
            <div className="hero-content">
                <h1>Tus Notas, Tu Vida, Tu Espacio</h1>
                <h3>Organiza tu día a día de manera rápida, eficiente y desde cualquier lugar</h3>
                <p className="hero-description">
                    Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar, desde tareas diarias hasta ideas importantes. ¡Empieza ahora y mantén todo bajo control!
                </p>
                <button onClick={handleDashboardClick} className="button hero-button">
                    Mis Notas
                </button>
            </div>
        </section>
    );
};
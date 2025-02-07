import { NavLink } from 'react-router-dom';
import './HowItWorksSection.css'

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="how-it-works-section">
            <h2>¿Cómo Funciona?</h2>
            <div className="steps-container">
                <div className="step">
                    <h3>1. <NavLink to="/register" className="register-link">Regístrate</NavLink></h3>
                    <i className="arrow-icon fas fa-arrow-right"></i>
                    <p>Crea una cuenta rápido y en pocos pasos.</p>
                </div>
                <div className="step">
                    <h3>2. Crea tus Notas</h3>
                    <i className="arrow-icon fas fa-arrow-right"></i>
                    <p>Agrega tus ideas y tareas importantes.</p>
                </div>
                <div className="step">
                    <h3>3. Organiza y Accede</h3>
                    <i className="arrow-icon fas fa-arrow-right"></i>
                    <p>Gestiona tus notas desde cualquier dispositivo.</p>
                </div>
            </div>
        </section>
    );
};
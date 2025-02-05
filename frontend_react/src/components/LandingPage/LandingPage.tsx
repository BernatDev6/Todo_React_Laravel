import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";


export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Crea tus Notas para Organizar</h1>
          <a href="#features" className="cta-button">Descubre Más</a>
        </div>
        <div className="hero-image">
          <img src="assets/images/hero.jpg" alt="Eventos" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-item">
          <h2>Gestión de Eventos</h2>
          <p>Organiza tus eventos, agrega detalles, fechas y más con nuestra herramienta intuitiva.</p>
        </div>
        <div className="feature-item">
          <h2>Sistema de Invitaciones</h2>
          <p>Crea enlaces de invitación únicos para asegurar la privacidad y el control de los participantes.</p>
        </div>
        <div className="feature-item">
          <h2>Participación Fácil</h2>
          <p>Únete a eventos con solo un clic, mantente al tanto de las actividades y comunícate con otros participantes.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>¡Únete Ahora y Empieza a Organizar!</h2>
        <Link to="/login" className="cta-button">Login</Link>
        <Link to="/register" className="cta-button">Register</Link>
      </section>
    </div>
  );
};
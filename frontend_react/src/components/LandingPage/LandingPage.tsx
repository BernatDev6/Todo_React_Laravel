import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";


export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Crea tus Notas para Organizar</h1>
          <p>Organiza tu vida con facilidad. Crea, guarda y accede a tus notas en cualquier momento. Tu espacio personal para todo lo que necesitas recordar.</p>
          <Link to="/dashboard" className="cta-button">Dashboard</Link>
        </div>
      </section>

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
    </div>
  );
};
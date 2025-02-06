import React from "react";
import "./LandingPage.css";
import { HeroSection } from "./HeroSection/HeroSection";


export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <HeroSection />
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
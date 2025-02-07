import './FeaturesSection.css'

export const FeaturesSection: React.FC = () => {
    return (
        <section className="features">
            <div className="feature-item">
                <h2>Organización de Tareas</h2>
                <p>Gestiona tus tareas de manera eficiente. Asigna prioridades y no te pierdas nada importante.</p>
            </div>
            <div className="feature-item">
                <h2>Categorías Personalizadas</h2>
                <p>Agrupa tus tareas en categorías para una mejor organización y accesibilidad.</p>
            </div>
            <div className="feature-item">
                <h2>Acceso Rápido</h2>
                <p>Consulta, edita y completa tus tareas en cualquier momento y desde cualquier dispositivo.</p>
            </div>
        </section>

    );
};
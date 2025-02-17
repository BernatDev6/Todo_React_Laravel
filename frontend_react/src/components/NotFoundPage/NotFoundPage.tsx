import './NotFoundPage.css';

export const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Página no encontrada</h1>
            <h1 className="not-found-title">222 - Página no encontrada</h1>
            <p className="not-found-text">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <a href="/" className="not-found-link">
                Volver al inicio
            </a>
        </div>
    );
};
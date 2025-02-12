import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import "./FooterComp.css"

export const FooterComp: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    © {new Date().getFullYear()} Mis Notas. Todos los derechos reservados.
                </p>
                <p className="footer-text">
                    Desarrollado por{" "}
                    <a
                        href="mailto:faenabernat@gmail.com"
                        className="footer-link"
                    >
                        Bernat Font
                    </a>
                    .
                </p>
                <p className="footer-text">
                    <Link to="/privacyPolicy" className="footer-link">
                        Política de Privacidad
                    </Link>{" "}
                    |{" "}
                    <Link to="/legalNotice" className="footer-link">
                        Aviso Legal
                    </Link>
                </p>
            </div>
        </footer>
    );
};
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './MainMenu.css';

export const MainMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="main-menu">
            <NavLink to="/" className="menu-icon">
                <img src="/icon.svg" alt="Logo" />
            </NavLink>
            <div className="menu-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/" className="button menu-link" onClick={closeMenu}>Inicio</NavLink>
                <NavLink to="/dashboard" className="button menu-link" onClick={closeMenu}>Notas</NavLink>
                <NavLink to="/userPannel" className="button menu-link" onClick={closeMenu}>Perfil</NavLink>
                <NavLink to="/login" className="button menu-link" onClick={closeMenu}>Login</NavLink>
            </nav>


            {/* Overlay */}
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
    );
};

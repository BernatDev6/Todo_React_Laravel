import { NavLink } from 'react-router-dom';
import './MainMenu.css'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const MainMenu = () => {
    return (
        <div className="main-menu">
            <img src="" alt="" />
            <nav className="menu">
                <NavLink to="/" className="button menu-link">Landing</NavLink>
                <NavLink to="/dashboard" className="button menu-link">Dashboard</NavLink>
                <NavLink to="/login" className="button menu-link">Login</NavLink>
            </nav>
            <ThemeSwitcher />
        </div>
    )
}

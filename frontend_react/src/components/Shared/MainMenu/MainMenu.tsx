import { NavLink } from 'react-router-dom';
import { ConfigComp } from '../ConfigComp/ConfigComp';
import './MainMenu.css'

export const MainMenu = () => {
    return (
        <div className="main-menu">
            <img src="" alt="" />
            <nav className="menu">
                <NavLink to="/" className="button menu-link">Landing</NavLink>
                <NavLink to="/dashboard" className="button menu-link">Dashboard</NavLink>
                <ConfigComp />
            </nav>
            <NavLink to="/login" className="login-link">Login</NavLink>
        </div>
    )
}

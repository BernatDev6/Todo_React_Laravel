import { Link } from 'react-router-dom';
import './MainMenu.css'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const MainMenu = () => {
    return (
        <div className="main-menu">
            <img src="" alt="" />
            <nav className="menu">
                <Link to="/" className="button">Landing</Link>
                <Link to="/dashboard" className="button">Dashboard</Link>
                <Link to="/login" className="button">Login</Link>
            </nav>
            <ThemeSwitcher />
        </div>
    )
}

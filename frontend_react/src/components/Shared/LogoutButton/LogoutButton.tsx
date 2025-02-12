import { logout } from '../../../api';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'

interface LogoutButtonProps {
    onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            onLogout();
            navigate('/');
        } catch (error) {
            alert('Error al cerrar sesión');
        }
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logout&nbsp;&nbsp;
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
    )
}
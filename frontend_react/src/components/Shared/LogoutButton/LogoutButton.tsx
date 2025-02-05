import { logout } from '../../../api';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'

export const LogoutButton: React.FC = () => {
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            alert('Error al cerrar sesión');
        }
    };

    return <button className="logout-btn" onClick={handleLogout}>Logout</button>
}

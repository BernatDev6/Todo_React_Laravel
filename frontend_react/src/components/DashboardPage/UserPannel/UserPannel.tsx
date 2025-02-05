import { LogoutButton } from '../../Shared/LogoutButton/LogoutButton';
import { Link } from 'react-router-dom';
import './UserPannel.css'

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserPannelProps {
    user: User;
}

export const UserPannel: React.FC<UserPannelProps> = ({ user }) => {
    return (
        <section className='user-pannel'>
            <h1 className="user-pannel-title">Panel de Usuario</h1>
            <div className="user-info">
                <div className="user-info-item">
                    <span className="user-info-label">ID:</span>
                    <span className="user-info-value">{user.id}</span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-label">Nombre:</span>
                    <span className="user-info-value">{user.name}</span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-label">Correo:</span>
                    <span className="user-info-value">{user.email}</span>
                </div>
            </div>
            <Link to="/" className="redirect-btn-landing">Landing</Link>
            <LogoutButton />
        </section>
    );
};

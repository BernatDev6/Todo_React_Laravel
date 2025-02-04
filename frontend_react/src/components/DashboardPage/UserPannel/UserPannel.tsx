import { LogoutButton } from '../../Shared/LogoutButton/LogoutButton';
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
            <h1 className="user-pannel-title">
                ID: {user.id} * Name: {user.name} * Correo: {user.email}
            </h1>
            <LogoutButton />
        </section>
    );
};

import { useEffect, useState } from 'react';
import { getUserData } from '../../api';
import { useNavigate } from 'react-router-dom';
import { LoaderComp } from '../Shared/LoaderComp/LoaderComp';
import { PannelComp } from './PannelComp/PannelComp';
import './UserPannel.css';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserPannel: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { message: 'Inicia sesión para acceder al perfil.' } });
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserData(token);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login', { state: { message: 'Error al obtener los datos del usuario.' } });
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return <LoaderComp />;
  }

  return (
    <div className="user-pannel-container">
        <PannelComp user={user} />
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getUserData } from '../../api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const userData = await getUserData(token);
      setUser(userData);
    } catch (error) {
      alert('Error al obtener los datos del usuario');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <p className="loading-message">Cargando información del usuario...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">ID: {user.id} * Name:
        {user.name} * Correo: {user.email}</h1>
      <p className="dashboard-message">
        ¡Estamos contentos de tenerte aquí! Puedes ver tus
        datos y gestionar tu cuenta.
      </p>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}; 
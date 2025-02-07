import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getUserNotes } from '../../api';
import './DashboardPage.css';
import { CreateNote } from './CreateNoteModal/CreateNote';
import { UserPannel } from './UserPannel/UserPannel';
import { ListNote } from './ShowNotes/ListNote/ListNote';
import { CardNote } from './ShowNotes/CardNote/CardNote';
import { LoaderComp } from '../Shared/LoaderComp/LoaderComp';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

export const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserData(token);
        setUser(userData);

        const userNotes = await getUserNotes(token);
        setNotes(userNotes);
      } catch (error) {
        alert('Error al obtener los datos del usuario');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <LoaderComp />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Pannel de informacion del usuario */}
      <UserPannel user={user} />

      {/* Componente modal para crear nota */}
      <CreateNote setNotes={setNotes} notes={notes} />

      {/* Botones para cambiar de vista */}
      <div className="view-toggle-buttons">
        <button
          className={`button toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          Lista
        </button>
        <button
          className={`button toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
          onClick={() => setViewMode('card')}
        >
          Cards
        </button>
      </div>

      {/* Listado de Notas del Usuario */}
      {viewMode === 'list' ? (
        <ListNote notes={notes} />
      ) : (
        <CardNote notes={notes} />
      )}
    </div>
  );
};

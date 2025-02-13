import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getUserNotes } from '../../api';
import { CreateNoteModal } from './CreateNoteModal/CreateNoteModal';
import { EditNoteModal } from './EditNoteModal/EditNoteModal';
import { ListNote } from './ShowNotes/ListNote/ListNote';
import { CardNote } from './ShowNotes/CardNote/CardNote';
import { LoaderComp } from '../Shared/LoaderComp/LoaderComp';
import { ViewToggleButtons } from './ViewToggleButtons/ViewToggleButtons'; // Importamos el nuevo componente
import './DashboardPage.css';

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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { state: { message: 'Inicia sesión, para acceder al dashboard.' } });
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserData(token);
        setUser(userData);

        const userNotes = await getUserNotes(token);
        setNotes(userNotes);
      } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : 'Error desconocido');
        localStorage.removeItem('token');
        navigate('/login', { state: { message: 'Tu sesión ha expirado. Inicia sesión nuevamente.' } });
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
    navigate('/login', { state: { message: 'Inicia sesión para acceder al dashboard.' } });
    return null;
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleModalClose = () => {
    setSelectedNote(null);
  };

  return (
    <div className="dashboard-container">

      <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} notes={notes} setNotes={setNotes}/>

      {notes.length === 0 ? (
        <p className="no-notes-message">No tienes notas disponibles. ¡Crea tu primera nota!</p>
      ) : viewMode === 'list' ? (
        <ListNote notes={notes} setNotes={setNotes} onNoteClick={handleNoteClick} />
      ) : (
        <CardNote notes={notes} onNoteClick={handleNoteClick} />
      )}

      {selectedNote && (
        <EditNoteModal
          note={selectedNote}
          notes={notes}
          onClose={handleModalClose}
          setNotes={setNotes}
        />
      )}
    </div>
  );
};
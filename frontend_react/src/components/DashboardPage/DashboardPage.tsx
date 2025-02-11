import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getUserNotes } from '../../api';
import './DashboardPage.css';
import { CreateNoteModal } from './CreateNoteModal/CreateNoteModal';
import { EditNoteModal } from './EditNoteModal/EditNoteModal';
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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // Nota seleccionada para editar
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

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleModalClose = () => {
    setSelectedNote(null);
  };

  return (
    <div className="dashboard-container">
      <UserPannel user={user} />
      <CreateNoteModal setNotes={setNotes} notes={notes} />

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

      {notes.length === 0 ? (
        <p className="no-notes-message">No tienes notas disponibles. ¡Crea tu primera nota!</p>
      ) : viewMode === 'list' ? (
        <ListNote notes={notes} setNotes={setNotes} onNoteClick={handleNoteClick} />
      ) : (
        <CardNote notes={notes} onNoteClick={handleNoteClick} />
      )}

      {/* Modal para editar nota */}
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

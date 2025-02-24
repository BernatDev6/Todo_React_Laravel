import { useEffect, useState } from 'react';
import { getUserNotes } from '../../../api';
import './UserNotesInfo.css';
import { Loader2Comp } from '../../Shared/Loader2Comp/Loader2Comp';

// Definición de la interfaz Note
interface Note {
    id: number;
    title: string;
    content: string;
    status: 'activa' | 'pendiente' | 'completada';
}

export const UserNotesInfo: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true); // Estado para controlar el loading

    const fetchUserNotes = () => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        setLoading(true); // Activar loading antes de la llamada
        getUserNotes(token)
            .then(data => {
                // Asegúrate de que data sea un array
                if (Array.isArray(data)) {
                    setNotes(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setNotes([]); // Inicializa notes como un array vacío en caso de error
                }
                setLoading(false); // Desactivar loading después de obtener los datos
            })
            .catch(error => {
                console.error('Error fetching user notes:', error);
                setNotes([]); // Inicializa notes como un array vacío en caso de error
                setLoading(false); // Desactivar loading en caso de error
            });
    }

    useEffect(() => {
        fetchUserNotes();
    }, []);

    // Verifica que notes sea un array antes de usar filter
    const activeNotes = Array.isArray(notes) ? notes.filter(note => note.status === 'activa').length : 0;
    const pendingNotes = Array.isArray(notes) ? notes.filter(note => note.status === 'pendiente').length : 0;
    const completedNotes = Array.isArray(notes) ? notes.filter(note => note.status === 'completada').length : 0;

    return (
        <div className="user-notes-info-container">
            <div className="info-note-card activa">
                <h3>Notas Activas</h3>
                <p>{loading && activeNotes === 0 ? <Loader2Comp /> : activeNotes}</p>
            </div>
            <div className="info-note-card pendiente">
                <h3>Notas Pendientes</h3>
                <p>{loading && pendingNotes === 0 ? <Loader2Comp /> : pendingNotes}</p>
            </div>
            <div className="info-note-card completada">
                <h3>Notas Completadas</h3>
                <p>{loading && completedNotes === 0 ? <Loader2Comp /> : completedNotes}</p>
            </div>
        </div>
    );
};
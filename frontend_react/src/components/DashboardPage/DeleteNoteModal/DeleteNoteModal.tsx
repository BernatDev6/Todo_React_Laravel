import React, { useState } from 'react';
import { deleteNote } from '../../../api';
import './DeleteNoteModal.css';

interface Note {
    id: number;
    title: string;
    content: string;
    status: 'activa' | 'pendiente' | 'completada';
}

interface DeleteNoteProps {
    noteId: number;
    setNotes: (notes: Note[]) => void;
    notes: Note[];
    onClose: () => void;
}

export const DeleteNoteModal: React.FC<DeleteNoteProps> = ({ noteId, setNotes, notes, onClose }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteNote = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await deleteNote(noteId);

            // Actualiza las notas eliminando la nota correspondiente
            setNotes(notes.filter((note) => note.id !== noteId));
            setShowDeleteModal(false);
            onClose() // Cerramos el modal de editar
        } catch (error) {
            alert('Error al eliminar la nota');
            console.error(error);
        }
    };

    return (
        <>
            <button className="delete-note-btn" onClick={() => setShowDeleteModal(true)} title="Delete Note">
                <span>Delete</span>
                <i className="fa-regular fa-trash-can"></i>
            </button>
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content modal-content-delete">
                        <h3>Eliminar Nota</h3>
                        <p>¿Estás seguro de que deseas eliminar esta nota?</p>
                        <div className="modal-buttons">
                            <button className="button close-btn" onClick={() => setShowDeleteModal(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <button className="button delete-btn" onClick={handleDeleteNote}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

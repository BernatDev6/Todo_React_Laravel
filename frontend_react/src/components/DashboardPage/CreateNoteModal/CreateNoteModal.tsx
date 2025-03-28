import React, { useState } from 'react';
import { createNote } from '../../../api';
import './CreateNoteModal.css'

interface CreateNoteProps {
  setNotes: (notes: any[]) => void;
  notes: any[];
}

export const CreateNoteModal: React.FC<CreateNoteProps> = ({ setNotes, notes }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', status: 'pendiente' });

  const handleCreateNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const createdNote = await createNote(token, newNote);
      setNotes([...notes, createdNote]);
      setShowCreateModal(false);
      setNewNote({ title: '', content: '', status: 'pendiente' });
    } catch (error) {
      alert('Error al crear la nota');
    }
  };

  return (
    <>
      <button className="button create-note-btn" onClick={() => setShowCreateModal(true)} title="Add Note"><i className="fa-solid fa-plus"></i></button>
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear Nueva Nota</h3>
            <form className="modal-form" onSubmit={handleCreateNote}>
              <label>Título:</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                required
              />
              <label>Contenido:</label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button className="button cancel-btn" type="button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button className="button save-btn" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

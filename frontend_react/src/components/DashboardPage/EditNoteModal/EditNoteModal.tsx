import React, { useState } from 'react';
import './EditNoteModal.css';
import { updateNote } from '../../../api';

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose, setNotes }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedNote = { title, content, status: note.status };
      await updateNote(note.id, updatedNote);

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? { ...n, title, content } : n))
      );

      onClose();
    } catch (error) {
      alert('Error updating the note. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Nota</h3>
        <form className="modal-form" onSubmit={handleSave}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={(e) => { e.preventDefault(); onClose(); }} className="button cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="button save-btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

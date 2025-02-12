import React, { useState } from 'react';
import './EditNoteModal.css';
import { updateNote } from '../../../api';
import { DeleteNoteModal } from '../DeleteNoteModal/DeleteNoteModal';

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

interface EditNoteModalProps {
  note: Note;
  notes: Note[];
  onClose: () => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, notes, onClose, setNotes }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState(note.status);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedNote = { title, content, status };
      await updateNote(note.id, updatedNote);

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? { ...n, title, content, status } : n))
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
          <label>Estado:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'pendiente' | 'activa' | 'completada')} className="form-select">
            <option value="pendiente">Pendiente</option>
            <option value="activa">Activa</option>
            <option value="completada">Completada</option>
          </select>
          <div className="modal-buttons">
            <button onClick={(e) => { e.preventDefault(); onClose(); }} className="button cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="button save-btn">Guardar</button>
          </div>
        </form>
        {/* Botón de settings */}
        <div className="settings-container">
          <button className="settings-btn">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div className="settings-menu">
            <button className="settings-menu-btn">
              <DeleteNoteModal noteId={note.id} notes={notes} setNotes={setNotes} onClose={onClose} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

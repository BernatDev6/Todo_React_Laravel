import React from 'react';
import './ListNote.css';
import { DeleteNoteModal } from '../../DeleteNoteModal/DeleteNoteModal';

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

interface ListNoteProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>; // Declaración de setNotes
}

export const ListNote: React.FC<ListNoteProps> = ({ notes, setNotes, onNoteClick }) => {
  return (
    <section className="list-note-container">
      {notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className={`note-item ${note.status}`}>
              <div onClick={() => onNoteClick(note)} className="item-content">
                <h3 className="content-title">{note.title}</h3>
                <p className="content-text">{note.content}</p>
                <p className="content-status">{note.status}</p>
              </div>
              <div className="delete-list-btn">
                <DeleteNoteModal noteId={note.id} notes={notes} setNotes={setNotes} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="charge-notes-message">Charging...</p>
      )}
    </section>
  );
};

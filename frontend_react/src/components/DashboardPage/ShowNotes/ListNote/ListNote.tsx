import React from 'react';
import './ListNote.css';

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

interface ListNoteProps {
  notes: Note[];
}

export const ListNote: React.FC<ListNoteProps> = ({ notes }) => {
  return (
    <section className="list-note-container">
      {notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className={`note-item ${note.status}`}>
              <h3 className="item-title">{note.title}</h3>
              <p className="item-content">{note.content}</p>
              <p className="item-status">{note.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="charge-notes-message">Charging...</p>
      )}
    </section>
  );
};

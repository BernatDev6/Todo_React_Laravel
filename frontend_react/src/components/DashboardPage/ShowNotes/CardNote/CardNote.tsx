import React from 'react';
import './CardNote.css';

interface Note {
    id: number;
    title: string;
    content: string;
    status: 'activa' | 'pendiente' | 'completada';
}

interface CardNoteProps {
    notes: Note[];
    onNoteClick: (note: Note) => void;
}

export const CardNote: React.FC<CardNoteProps> = ({ notes, onNoteClick }) => {
    return (
        <section className="note-cards-container">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <article
                        key={note.id}
                        onClick={() => onNoteClick(note)}
                        className={`note-card ${note.status}`}
                    >
                        <div className="note-card-content">
                            <h3 className="card-title">{note.title}</h3>
                            <p className="card-content">{note.content}</p>
                            <p className="card-status">{note.status}</p>
                        </div>
                        <div className="note-card-overlay"></div>
                    </article>
                ))
            ) : (
                <p className="no-notes-message">No notes available</p>
            )}
        </section>
    );
};

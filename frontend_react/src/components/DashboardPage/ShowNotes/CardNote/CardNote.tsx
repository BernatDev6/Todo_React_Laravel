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
}

export const CardNote: React.FC<CardNoteProps> = ({ notes }) => {
    return (
        <section className="note-cards-container">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <article className={`note-card ${note.status}`}>
                        <div className="note-card-content">
                            <h3>{note.title}</h3>
                            <p className="card-content">{note.content}</p>
                            <p>{note.status}</p>
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

import React from 'react';
import './TableNote.css';

interface Note {
    id: number;
    title: string;
    content: string;
    status: 'activa' | 'pendiente' | 'completada';
}

interface TableNoteProps {
    notes: Note[];
    onNoteClick: (note: Note) => void;
}

export const TableNote: React.FC<TableNoteProps> = ({ notes, onNoteClick }) => {
    return (
        <section className="table-note-container">
            {notes.length > 0 ? (
                <table className="notes-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th className="content-col">Content</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note) => (
                            <tr key={note.id} onClick={() => onNoteClick(note)} className={`note-row ${note.status}`}>
                                <td>{note.title}</td>
                                <td className="content-col"><div className="note-row-content">{note.content}</div></td>
                                <td><span className="note-row-status">{note.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-notes-message">No notes available</p>
            )}
        </section>
    );
};
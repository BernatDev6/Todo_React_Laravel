import React from 'react';
import './ViewToggleButtons.css';
import { CreateNoteModal } from '../CreateNoteModal/CreateNoteModal';

interface Note {
    id: number;
    title: string;
    content: string;
    status: 'activa' | 'pendiente' | 'completada';
}

interface ViewToggleButtonsProps {
    viewMode: 'list' | 'card';
    setViewMode: (mode: 'list' | 'card') => void;
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({ viewMode, setViewMode, notes, setNotes }) => {
    return (
        <div className="view-toggle-buttons-container">
            <div className="view-toggle-buttons">
                <button
                    className={`button toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                >
                    <i className="fa-solid fa-list-ul"></i>
                </button>
                <button
                    className={`button toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                    onClick={() => setViewMode('card')}
                >
                    <i className="fa-regular fa-file"></i>
                </button>
            </div>
            <div>
                <CreateNoteModal setNotes={setNotes} notes={notes} />
            </div>
        </div>

    );
};
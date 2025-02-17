import React, { useState, useEffect } from 'react';
import './SearchAndFilterNotes.css';

interface Note {
  id: number;
  title: string;
  content: string;
  status: 'activa' | 'pendiente' | 'completada';
}

interface SearchAndFilterNotesProps {
  notes: Note[];
  onFilteredNotes: (filteredNotes: Note[]) => void;
}

export const SearchAndFilterNotes: React.FC<SearchAndFilterNotesProps> = ({ notes, onFilteredNotes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'activa' | 'pendiente' | 'completada'>('all');

  // Función para filtrar y buscar notas
  useEffect(() => {
    const filteredNotes = notes.filter((note) => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || note.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    onFilteredNotes(filteredNotes);
  }, [searchTerm, filterStatus, notes, onFilteredNotes]);

  return (
    <div className="search-and-filter-container">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Selector de filtro */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'activa' | 'pendiente' | 'completada')}
        className="filter-select"
      >
        <option value="all">Todas</option>
        <option value="activa">Activas</option>
        <option value="pendiente">Pendientes</option>
        <option value="completada">Completadas</option>
      </select>
    </div>
  );
};
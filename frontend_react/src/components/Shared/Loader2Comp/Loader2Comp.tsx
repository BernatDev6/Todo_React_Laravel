import React from 'react';
import './Loader2Comp.css';

interface Loader2CompProps {
  size?: string; // Propiedad opcional para el tamaño
}

export const Loader2Comp: React.FC<Loader2CompProps> = ({ size = '60px' }) => {
  return (
    <svg className="loader2" viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <circle r="20" cy="50" cx="50" />
    </svg>
  );
};
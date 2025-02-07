import React, { useState } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import './ConfigComp.css'

export const ConfigComp: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    return (
        <>
            <button className="config-btn" onClick={() => setShowModal(true)}>
                <i className="config-icon fa-solid fa-gear"></i>
            </button>
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="theme-row">
                            <span>Tema:</span>
                            <ThemeSwitcher />
                        </div>
                        {/* Botón de cierre */}
                        <button className="close-btn" onClick={closeModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

import React, { useState, FormEvent } from 'react';
import { registerUser } from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';
import { LoaderComp } from '../Shared/LoaderComp/LoaderComp';

export const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true); // Mostrar loader

        try {
            const { user, token } = await registerUser(name, email, password);
            localStorage.setItem('token', token);
            navigate('/dashboard', { state: { user } });
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error en el registro');
        } finally {
            setIsLoading(false); // Ocultar loader
        }
    };

    return (
        <div className="register">
            {isLoading ?
                (<LoaderComp />)
                :
                (<div className="register-container">
                    <h2 className="register-title">Registro de Usuario</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="input-group">
                            <label className="input-label">Nombre:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Contraseña:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="button submit-btn" disabled={isLoading}>
                            {isLoading ? 'Registrando...' : 'Registrarse'}
                        </button>
                        <Link to="/login">Login</Link>
                    </form>
                </div>
                )}
        </div>
    );
};

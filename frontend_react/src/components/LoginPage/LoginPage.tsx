import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api';
import './LoginPage.css'
import { LoaderComp } from '../Shared/LoaderComp/LoaderComp';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const token = await login(email, password);
            if (!token) throw new Error("No token received");

            localStorage.setItem('token', token);
            const userData = { email };

            navigate('/dashboard', { state: { user: userData } });
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error en el login');
        } finally {
            setIsLoading(false); // Desactivar el loader
        }
    };

    return (
        <div className="login">
            {isLoading ? (
                <LoaderComp />
            ) : (
                <div className="login-container">
                    <h2 className="login-title">Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="button submit-btn">Login</button>
                        <Link to="/register">Register</Link>
                    </form>
                </div>
            )}
        </div>
    );
};

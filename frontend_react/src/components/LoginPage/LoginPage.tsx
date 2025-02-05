import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = await login(email, password);
            if (!token) throw new Error("No token received");

            localStorage.setItem('token', token);

            const userData = { email };

            navigate('/dashboard', { state: { user: userData } });
            alert('Login exitoso');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error en el login');
        }
    };

    return (
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
                <button type="submit" className="submit-btn">Login</button>
                <Link to="/register">Register</Link>
                <Link to="/">Landing</Link>
            </form>
        </div>
    );
}; 
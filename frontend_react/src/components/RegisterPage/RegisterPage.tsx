import React, { useState, FormEvent } from 'react';
import { registerUser } from '../../api';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterPage: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const { user, token } = await registerUser(name, email, password);
            localStorage.setItem('token', token);
            alert(`Registro exitoso. Bienvenido, ${user.name}`);
            navigate('/dashboard', { state: { user } });
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error en el registro');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registro de Usuario</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit"
                    className="submit-btn">Registrarse</button>
                    <Link to="/login">Login</Link>
            </form>
        </div>
    );
}; 

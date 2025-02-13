import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login', { state: { message: 'Inicia sesión, para acceder al dashboard.' } });
        }
    }, [token, navigate]);

    return token ? <Outlet /> : null;
};
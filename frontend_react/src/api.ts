import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface LoginResponse {
    token: string;
}

interface RegisterResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

/** 
 * Inicia sesión en el sistema. 
 * @param email Correo del usuario 
 * @param password Contraseña del usuario 
 * @returns El token JWT si el inicio de sesión es exitoso 
 * @throws Error si el login falla 
 */
export const login = async (email: string, password: string):
    Promise<string> => {
    try {
        const response = await
            axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
        return response.data.token;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Error en el logout:', error);
    }
};

/** 
 * Registra un nuevo usuario en el sistema. 
 * @param name Nombre del usuario 
 * @param email Correo del usuario 
 * @param password Contraseña del usuario 
 * @returns Los datos del usuario registrado junto con el token de 
autenticación 
 */
export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<RegisterResponse> => {
    const response = await
        axios.post<RegisterResponse>(`${API_URL}/register`, {
            name,
            email,
            password,
        });

    return response.data;
};

/** 
 * Obtiene los datos del usuario autenticado. 
 */
export const getUserData = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los datos del usuario');
    }
};

/** 
 * Interceptor de Axios que agrega el token JWT a las solicitudes. 
 */
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
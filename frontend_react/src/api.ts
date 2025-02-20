import axios from 'axios';

export const API_URL = 'http://localhost:8000/api';

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
        throw new Error(error.response?.data?.error || 'Error en el login.');
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
export const registerUser = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
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
 * Obtiene las notas del usuario autenticado. 
 */
export const getUserNotes = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/notes`, {
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
 * Creando la nota del usuario autenticado. 
 */
export const createNote = async (token: string, note: { title: string, content: string }) => {
    const { data } = await axios.post(`${API_URL}/notes`, note, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

/** 
 * Actualizando la nota seleccionada. 
 */
export const updateNote = async (noteId: number, updatedNote: { title: string; content: string; status: 'pendiente' | 'activa' | 'completada' }) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se ha encontrado el token');

    const response = await axios.put(
        `${API_URL}/notes/${noteId}`,
        updatedNote,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

/** 
 * Eliminamos la nota seleccionada. 
 */
export const deleteNote = async (noteId: number) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se ha encontrado el token');

    const response = await axios.delete(
        `${API_URL}/notes/${noteId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

export const getProfileImage = async (): Promise<string | null> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se ha encontrado el token');

    try {
        const response = await axios.get(`${API_URL}/profile/image`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data.profile_image || null;
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        return null;
    }
};

export const uploadProfileImage = async (file: File): Promise<string> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se ha encontrado el token');

    try {
        const formData = new FormData();
        formData.append('profile_image', file);

        const response = await axios.post(`${API_URL}/profile/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.image; // Retorna la URL de la imagen subida
    } catch (error) {
        console.error('Error al subir la imagen de perfil:', error);
        throw new Error('Error al subir la imagen de perfil');
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
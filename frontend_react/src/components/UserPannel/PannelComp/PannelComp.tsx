import { useState, useEffect } from 'react';
import { getProfileImage, uploadProfileImage } from '../../../api';
import { ConfigComp } from '../../Shared/ConfigComp/ConfigComp';
import NoUserImage from '../../../assets/images/no-user-image.webp';
import { Loader2Comp } from '../../Shared/Loader2Comp/Loader2Comp';

import './PannelComp.css';

interface User {
    id: number;
    name: string;
    email: string;
}

interface PannelCompProps {
    user: User;
}

export const PannelComp: React.FC<PannelCompProps> = ({ user }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(true); // Estado para el loader

    // Función para obtener la imagen del perfil
    const fetchProfileImage = async () => {
        try {
            const imageUrl = await getProfileImage();
            if (imageUrl) {
                setProfileImage(`${imageUrl}?t=${Date.now()}`); // Evitar caché
                setIsUploading(false); // Desactivar el loader
            }
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
        }
    };

    // Cargar la imagen cuando el componente se monta
    useEffect(() => {
        fetchProfileImage();
    }, []);

    // Manejar la subida de imagen
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setIsUploading(true); // Activar el loader
            try {
                await uploadProfileImage(file); // Subimos la imagen
                await fetchProfileImage(); // Volvemos a obtener la imagen del servidor
            } catch (error) {
                console.error('Error al subir la imagen de perfil:', error);
            } finally {
                setIsUploading(false); // Desactivar el loader
            }
        }
    };

    return (
        <section className='user-pannel'>
            <h1 className="user-pannel-title">Panel de Usuario</h1>
            <div className="user-info">
                {/* Imagen de perfil */}
                <div className="user-profile-image">
                    {isUploading ? (
                        <div className="profile-image-loader">
                            <Loader2Comp size='90' />
                        </div>
                    ) : profileImage ? (
                        <img src={profileImage} alt="Foto de perfil" className="profile-img" />
                    ) : (
                        <img src={NoUserImage} alt="no-img-profile-img" className="profile-img" />
                    )}

                    <label htmlFor="file-upload" className="custom-file-label">
                        Subir imagen
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="custom-file-input"
                    />
                </div>

                {/* Información del usuario */}
                <div className="user-info-item">
                    <span className="user-info-label">Nombre usuario:</span>
                    <span className="user-info-value">{user.name}</span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-label">Correo:</span>
                    <span className="user-info-value">{user.email}</span>
                </div>
                <div className="user-info-item">
                    <span className="user-info-label">Configuración:</span>
                    <ConfigComp />
                </div>
            </div>
        </section>
    );
};

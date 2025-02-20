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
            setIsUploading(true); // Activar loader antes de la petición
            const imageUrl = await getProfileImage();
            console.log("URL de la imagen recibida:", imageUrl);
            if (imageUrl) {
                const fullImageUrl = `${imageUrl}?t=${new Date().getTime()}`;
                setProfileImage(fullImageUrl);
                               
            }
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
        } finally {
            setIsUploading(false); // Asegurar que el loader se desactive siempre
        }
    };


    // Cargar la imagen cuando el componente se monta
    useEffect(() => {
        fetchProfileImage();
    }, [user.id]);

    // Manejar la subida de imagen
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Validar tipo de archivo
            if (!file.type.startsWith("image/")) {
                console.error("El archivo seleccionado no es una imagen.");
                alert("Por favor, selecciona un archivo de imagen válido.");
                return;
            }

            setIsUploading(true);
            try {
                await uploadProfileImage(file);
                await fetchProfileImage();
            } catch (error) {
                console.error("Error al subir la imagen de perfil:", error);
            } finally {
                setIsUploading(false);
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
                            <Loader2Comp size="90" />
                        </div>
                    ) : (
                        <img
                            src={profileImage || NoUserImage}
                            alt="Foto de perfil"
                            className="profile-img"
                        />
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

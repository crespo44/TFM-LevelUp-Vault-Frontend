import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import imageService from '../../services/imageService';
import { toast } from 'react-toastify';
import Button from '../Buttons/Button';
import './ImageGallery.css';

const ImageGallery = ({ gameId, rol, onPublicIdsReady }) => {
    const queryClient = useQueryClient();
    const [localImages, setLocalImages] = useState([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['images', gameId],
        queryFn: async () => {
            const response = await imageService.listImages(gameId);
            return response.data;
        },
        enabled: !!gameId,
    });
    
    useEffect(() => {
        if (Array.isArray(data?.files)) {
            setLocalImages(data.files);
            if (typeof onPublicIdsReady === 'function') {
                onPublicIdsReady(data.files.map(img => img.publicId));
            }
        }
    }, [data, onPublicIdsReady]);

    const uploadMutation = useMutation({
        mutationFn: (file) => {
            const formData = new FormData();
            formData.append('file', file);
            return imageService.uploadImage(gameId, formData);
        },
        onSuccess: (response) => {
            toast.success("Imagen subida correctamente");
            const newImage = {
            publicId: response.data.publicId,
            url: `${response.data.url}?t=${Date.now()}`
        };
        setLocalImages(prev => [...prev, newImage]);
        },
        onError: () => toast.error("Error al subir imagen")
    });

    const deleteMutation = useMutation({
        mutationFn: (publicId) => imageService.deleteImage(publicId),
        onSuccess: () => {
            toast.success("Imagen eliminada");
            queryClient.invalidateQueries({ queryKey: ['images', gameId] });
        },
        onError: () => toast.error("Error al eliminar imagen")
    });


    return (
        <div className="image-gallery">
            <h4>Imágenes del Juego</h4>
            {rol === 'usuario' && (
                <>
                    <div className="file-select" id="src-file1" >
                        <input type="file" className='btn-addFile' disabled={uploadMutation.isPending} onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                uploadMutation.mutate(file);
                            }
                            e.target.value = null;
                        }} />
                    </div>
                </>
            )}
            {isLoading && <p>Cargando imágenes...</p>}
            {isError && <p>Error al cargar imágenes.</p>}

            <div className="image-list">
                {localImages.map((img) => (
                    <div key={img.publicId} className="image-item">
                        <img src={img.url} alt={`Imagen subida`} />
                        <Button text="❌" className="image-delete-button"   onClick={() => {
                            deleteMutation.mutate(img.publicId);
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
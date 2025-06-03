import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import imageService from '../../services/imageService';
import { toast } from 'react-toastify';
import Button from '../Buttons/Button';
import './ImageGallery.css';

const ImageGallery = ({ gameId, rol }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const queryClient = useQueryClient();
    const [imageURLs, setImageURLs] = useState({});

    const { data, isLoading, isError } = useQuery({
        queryKey: ['images', gameId],
        queryFn: async () => {
            const response = await imageService.listImages(gameId);
            return response.data;
        },
        enabled: !!gameId,
    });

    const images = useMemo(() => (
        Array.isArray(data?.files) ? data.files : []
    ), [data]);

    const uploadMutation = useMutation({
        mutationFn: (file) => {
            const formData = new FormData();
            formData.append('file', file);
            return imageService.uploadImage(gameId, formData);
        },
        onSuccess: () => {
            toast.success("Imagen subida correctamente");
            queryClient.invalidateQueries({ queryKey: ['images', gameId] });
        },
        onError: () => toast.error("Error al subir imagen")
    });

    const deleteMutation = useMutation({
        mutationFn: (filename) => imageService.deleteImage(gameId, filename),
        onSuccess: () => {
            toast.success("Imagen eliminada");
            queryClient.invalidateQueries({ queryKey: ['images', gameId] });
        },
        onError: () => toast.error("Error al eliminar imagen")
    });

    const handleUpload = () => {
        if (selectedFile) {
            uploadMutation.mutate(selectedFile);
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            const urls = {};
            for (const img of images) {
                try {
                    const res = await imageService.downloadImage(gameId, img);
                    const url = URL.createObjectURL(res.data);
                    urls[img] = url;
                } catch (err) {
                    console.error("Error cargando imagen:", img, err);
                }
            }
            setImageURLs(urls);
            return () => Object.values(urls).forEach(url => URL.revokeObjectURL(url));
        };

        if (images.length) {
            loadImages();
        }
    }, [images, gameId]);

    return (
        <div className="image-gallery">
            <h4>Imágenes del Juego</h4>
            {rol === 'usuario' && (
                <>
                    <div className="file-select" id="src-file1" >
                        <input type="file" className='btn-addFile' onChange={e => setSelectedFile(e.target.files[0])} />
                    </div>

                    <Button className='btn-uploadImage' text="Subir Imagen" onClick={handleUpload} />
                </>
            )}
            {isLoading && <p>Cargando imágenes...</p>}
            {isError && <p>Error al cargar imágenes.</p>}

            <div className="image-list">
                {images.map(img => (
                    <div key={img} className="image-item">
                        <img
                            src={imageURLs[img]}
                            alt={img}
                        />
                        <Button text="❌" className="image-delete-button" onClick={() => deleteMutation.mutate(img)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import Card from "../Card/Card";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import gameService from "../../services/gameService";
import EditGameForm from "../EditGameForm/EditGameForm";
import ImageGallery from '../ImageGallery/ImageGallery';
import defaultImage from '../../assets/default-gamepad.webp'
import "./GameCard.css";

const GameCard = ({ game, rol }) => {
    const queryClient = useQueryClient();
    const { title, description, genre, platform, status, rating, notes, imageUrl } = game;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const imageToShow = imageUrl || defaultImage;

    const formatArrayText = (value) => {
        return Array.isArray(value) ? value.join(", ") : value || "-";
    };

    const renderStars = (rating) => {
        const maxStars = 5;
        const filledStars = Math.round(rating);
        return [...Array(maxStars)].map((_, i) => (
            <span key={i} className={i < filledStars ? "star_game-card filled" : "star_game-card"}>★</span>
        ));
    };
    const deleteMutation = useMutation({
        mutationFn: async () => {
            if (rol === "administrador") {
                return await gameService.adminDeleteGame(game._id);
            } else {
                return await gameService.deleteGame(game._id);
            }
        },
        onSuccess: () => {
            toast.success('El juego ha sido eliminado');
            queryClient.invalidateQueries(["games"]);
        },
        onError: (error) => {
            toast.error('Error al añadir el juego');
            console.error(error);
        }
    });

    const handleDelete = () => {
            deleteMutation.mutate();
        };

    return (
        <>
            <Card className="game-card">
                <div className="game-top">
                    <div className="game-image">
                        <img src={imageToShow} alt={title} />
                    </div>
                    <div className="game-headings">
                        {rol === "administrador" && <p className="game-user"><span className="label">Usuario:</span> {game.userName || "-"}</p>}
                        <h3 className="game-title">{title}</h3>
                        <p className="game-description">{description}</p>
                    </div>
                </div>

                <div className="game-meta">
                    <div className="meta-row">
                        <p><span className="label">Género:</span> {formatArrayText(genre)}</p>
                        <p><span className="label">Plataforma:</span> {formatArrayText(platform)}</p>
                    </div>
                    <div className="meta-row">
                        <p><span className="label">Estatus:</span> {status}</p>
                        <div><span className="label">Rating:</span> {renderStars(rating)}</div>
                    </div>
                    <div className="meta-row">
                        <p><span className="label">Notas:</span> {notes}</p>
                    </div>
                    <div className="meta-row">
                        <ImageGallery gameId={game._id} rol={rol} />
                    </div>
                    <div className="game-actions">
                        <Button text="Editar" onClick={() => setIsModalOpen(true)} />
                        <Button text="Eliminar" onClick={handleDelete} />
                    </div>
                </div>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EditGameForm game={game} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default GameCard;
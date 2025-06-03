import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import editGameSchema from "./editGameValidation";
import gameService from "../../services/gameService";
import Button from "../Buttons/Button";
import StarsInput from "../StarsInput/StarsInput";
import "./EditGameForm.css";

const EditGameForm = ({ game, onClose }) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(editGameSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: [],
      platform: [],
      status: "",
      notes: ""
    },
  });

  useEffect(() => {
    if (game) {
      reset({
        title: game.title || "",
        description: game.description || "",
        genre: game.genre || [],
        platform: game.platform || [],
        status: game.status || "",
        notes: game.notes || ""
      });
      setRating(game.rating || 0);
    }
  }, [game, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, gameData }) => gameService.updateGame(id, gameData),
    onSuccess: () => {
      queryClient.invalidateQueries(["games"]);
      toast.success("Juego actualizado correctamente");
      onClose();
    },
    onError: () => {
      toast.error("Error al actualizar el juego");
    },
  });

  const onSubmit = (data) => {
    data.rating = rating;
    updateMutation.mutate({ id: game._id, gameData: data });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar Juego</h2>

      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" {...register("title")} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" {...register("description")} />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genre" className="form-label">Género:</label>
        <div className="checkbox-group">
          {["Acción", "Aventura", "RPG", "Shooter", "Puzzle", "Platformas", "Estrategia", "Deportes", "Carreras", "Simulación", "Lucha", "Terror", "Survival", "MMO", "Sandbox", "Otros"].map((genre) => (
            <div className="checkbox-item" key={genre}>
              <input type="checkbox" id={`genre-${genre}`} value={genre} {...register("genre")}
                defaultChecked={game?.genre?.includes(genre)}
              />
              <label className="label-checkbox" htmlFor={`genre-${genre}`}>{genre}</label>
            </div>
          ))}
        </div>
        {errors.genre && <span className="error">{errors.genre.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="platform" className="form-label">Plataformas:</label>
        <div className="checkbox-group">
          {["PC", "PlayStation", "PS2", "PS3", "PS4", "PS5", "Xbox", "Xbox 360", "Xbox One", "Xbox Ser. X", "Nintendo 3DS", "Nintendo DS", "Switch", "Wii", "Wii U", "Android", "iOS", "Mac", "Linux", "Otros"].map((platform) => (
            <div className="checkbox-item" key={platform}>
              <input type="checkbox" id={`platform-${platform}`} value={platform} {...register("platform")} defaultChecked={game?.platform?.includes(platform)} />
              <label className="label-checkbox" htmlFor={`platform-${platform}`}>{platform}</label>
            </div>
          ))}
        </div>
        {errors.platform && <span className="error">{errors.platform.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado:</label>
        <select id="status" {...register("status")}>
          <option value="">Seleccione</option>
          <option value="No jugado">No jugado</option>
          <option value="Jugando">Jugando</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        {errors.status && <span className="error">{errors.status.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="rating">Valoración:</label>
        <StarsInput rating={rating} onChange={(value) => setRating(value)} />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas:</label>
        <textarea id="notes" {...register("notes")} />
        {errors.notes && <span className="error">{errors.notes.message}</span>}
      </div>

      <div className="edit-buttons">
        <Button type="submit" text={updateMutation.isLoading ? "Guardando..." : "Guardar"} disabled={updateMutation.isLoading} />
      </div>
    </form>
  );
};

export default EditGameForm;
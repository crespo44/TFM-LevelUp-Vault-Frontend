import "./GamesFilter.css";
import Button from "../Buttons/Button";

const GameFilters = ({ filters, onChange, onSearch, rol }) => {
  return (
    <div className="game-filters">
      <input
        type="text"
        name="title"
        placeholder="Filtrar por título"
        value={filters.title || ""}
        onChange={onChange}
      />

      <input
        type="text"
        name="genre"
        placeholder="Filtrar por género"
        value={filters.genre || ""}
        onChange={onChange}
      />

      <input
        type="text"
        name="platform"
        placeholder="Filtrar por plataforma"
        value={filters.platform || ""}
        onChange={onChange}
      />

      <select
        name="status"
        value={filters.status || ""}
        onChange={onChange}
      >
        <option value="">Todos los estatus</option>
        <option value="No jugado">No jugado</option>
        <option value="Jugando">Jugando</option>
        <option value="Finalizado">Finalizado</option>
      </select>

      {rol === "administrador" && (
        <input
          type="text"
          name="user"
          placeholder="Filtrar por usuario"
          value={filters.user || ""}
          onChange={onChange}
        />
      )}

      <Button onClick={onSearch} text='Buscar' />
    </div>
  );
};

export default GameFilters;
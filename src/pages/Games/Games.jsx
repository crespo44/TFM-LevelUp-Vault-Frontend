import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import gameService from "../../services/gameService";
import Card from '../../components/Card/Card';
import CreateGameForm from '../../components/CreateGameForm/CreateGameForm';
import GamesFilters from "../../components/GamesFilter/GamesFilter";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Buttons/Button";
import './Games.css';

const Games = () => {
  const rol = useSelector((state) => state.auth.rol);
  const [filters, setFilters] = useState({});
  const [formFilters, setFormFilters] = useState({ title: "", genre: "", platform: "", status: "", user: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const juegosRef = useRef(null);
  const itemsPerPage = rol === "administrador" ? 6 : 4;

  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setFilters({ ...formFilters });
    setFormFilters({ title: "", genre: "", platform: "", status: "", user: ""});
    setCurrentPage(1);
  };

  const { data: games = [], isLoading, isError } = useQuery({
    queryKey: ["games", filters, rol],
    queryFn: async () => {
      try {
        if(rol === 'administrador'){
          const response = await gameService.getAllGames(filters);
          return response.data;
        }
        const response = await gameService.getFilteredGames(filters);
        return response.data;
      } catch {
        return [];
      }
    },
    keepPreviousData: true,
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGames = games.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(games.length / itemsPerPage);

  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range = [1];
    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  useEffect(() => {
    const top = document.querySelector(".cards-container");
    if (top) {
      top.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);


  return (
    <div className="games-page">
      <div className="games-header">
        <h2>{rol === "administrador" ? "🎮 Gestión de Juegos" : "🎮 Mis Juegos"}</h2>
        <p>
          {rol === "administrador"
            ? "Filtra y administra todos los juegos registrados por los usuarios"
            : "Añade, organiza y explora tus juegos favoritos"}
        </p>
      </div>
      {rol === "usuario" && (
        <div className="button-filtros-wrapper">
          <Button
            className="mobile-link-filtros"
            onClick={() => { juegosRef.current && juegosRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            text="Ir a juegos"
          />
        </div>
      )}


      <div className={`games-grid ${rol}`}>
        {rol === "usuario" && (
          <div className="games-form">
            <Card className="wide-card">
              <CreateGameForm />
            </Card>
          </div>
        )}

        <div className="games-content">
          <div className="filters-container" ref={juegosRef}>
             <GamesFilters
              rol={rol}
              filters={formFilters}
              onChange={handleChange}
              onSearch={handleSearch}
            />
          </div>

          <div className={`cards-container ${rol}`}>
            {isLoading && <p>Cargando juegos...</p>}
            {isError && <p>Error al cargar los juegos</p>}
            {!isLoading && !isError && games.length === 0 && (
              <div className="no-games-message">No hay juegos que coincidan con los filtros.</div>
            )}
             {!isLoading && !isError && games.length > 0 &&
               paginatedGames.map((game) => (
                 <GameCard key={game._id} game={game} rol={rol} />
               ))
             }
          </div>

          <div className="pagination-container">
            {totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-pages">
                {paginationRange.map((page, idx) =>
                  page === "..."
                    ? <span key={`ellipsis-${idx}`} className="ellipsis">...</span>
                    : <button
                        key={page}
                        className={currentPage === page ? 'active' : ''}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                )}
              </div>

              <div className="pagination-controls">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
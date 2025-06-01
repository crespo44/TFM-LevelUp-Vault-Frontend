import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/gaming-banner.webp";
import "./HeroBanner.css";

const HeroBanner = ({ showAddGameBtn = false, onAddGame }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
<section className="hero-banner">
      <img src={heroImg} alt="" className="hero-img" draggable={false} />
      <div className="hero-content">
        <h1>
          {user.rol === "administrador"
            ? "Panel de Juegos (Admin)"
            : "Bienvenido a LevelUp Vault"}
        </h1>
        <p>
          {user.rol === "administrador"
            ? "Gestiona y explora todos los juegos de los usuarios en la plataforma."
            : "Organiza y descubre tus videojuegos favoritos, guarda tu progreso y comparte tus valoraciones."}
        </p>
        {showAddGameBtn && (
          <button onClick={onAddGame || (() => navigate("/add-game"))}>
            Agregar Juego
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
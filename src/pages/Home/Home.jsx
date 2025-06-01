import { useSelector } from "react-redux";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Card from "../../components/Card/Card";
import "./Home.css";
import misJuegosImg from "../../assets/mis-juegos.webp";    
import noticiasImg from "../../assets/noticias.webp";
import contactoImg from "../../assets/contacto.webp";
import usuariosImg from "../../assets/usuarios.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const sections = user.rol === "administrador"
    ? [
        {
          title: "Juegos guardados",
          img: misJuegosImg,
          link: "/juegos",
          desc: "Gestiona todos los juegos registrados. Busca, edita y elimina cualquier videojuego de la plataforma como administrador.",
          extra: "Puedes ver los usuarios creadores y acceder a todas las funcionalidades avanzadas.",
          imgRight: false
        },
        {
          title: "Noticias",
          img: noticiasImg,
          link: "/noticias",
          desc: "Últimas noticias sobre videojuegos actualizadas cada día. Mantente al día con los lanzamientos más recientes y tendencias del sector.",
          extra: "Haz clic para ver análisis, trailers y novedades.",
          imgRight: true
        },
        {
          title: "Usuarios",
          img: usuariosImg,
          link: "/usuarios",
          desc: "Gestiona los usuarios registrados. Revisa su actividad, cambia roles o elimina cuentas si es necesario.",
          extra: "Accede al listado y busca por nombre, correo o rol.",
          imgRight: false
        }
      ]
    : [
        {
          title: "Mis juegos",
          img: misJuegosImg,
          link: "/games",
          desc: "Revisa y organiza tu colección personal de videojuegos. Añade nuevos títulos, ponles valoración y deja notas de progreso.",
          extra: "Puedes marcar el estado de cada juego: jugando, completado o pendiente.",
          imgRight: false
        },
        {
          title: "Noticias",
          img: noticiasImg,
          link: "/news",
          desc: "Descubre todas las novedades del mundo gamer. Desde nuevos lanzamientos hasta ofertas y reseñas.",
          extra: "Explora noticias, trailers y próximos lanzamientos destacados.",
          imgRight: true
        },
        {
          title: "Contacto",
          img: contactoImg,
          link: "/contact",
          desc: "¿Tienes dudas, sugerencias o necesitas soporte? Ponte en contacto con el equipo de LevelUp y te responderemos.",
          extra: "Rellena el formulario y recibirás una respuesta lo antes posible.",
          imgRight: false
        }
      ];

  return (
    <>
      <HeroBanner />
      <section className="home-cards-container">
            {sections.map((section) => (
            <div
                key={section.title}
                className={`home-card-row${section.imgRight ? " img-right" : ""}`}
                onClick={() => navigate(section.link)}
                tabIndex={0}
                role="button"
                aria-label={section.title}
            >
                <div className="home-card-img-container">
                <img src={section.img} alt={section.title} className="home-card-img" />
                </div>
                <Card className="home-card-content">
                <h2 className="home-card-title">{section.title}</h2>
                <p className="home-card-desc">{section.desc}</p>
                <p className="home-card-extra">{section.extra}</p>
                </Card>
            </div>
            ))}
      </section>
    </>
  );
};

export default Home;
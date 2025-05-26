import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/LUVLogo.webp';

const Navbar = ({ username, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>

      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar__links ${menuOpen ? 'active' : ''}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Mis juegos</Link>
        <Link to="/add-game" onClick={() => setMenuOpen(false)}>Agregar Juego</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>

        <div className="navbar__user-mobile">
          <span>{username}</span>
          <button onClick={handleLogout} className="logout-icon">⎋</button>
        </div>
      </div>

      <div className="navbar__user-desktop">
        <span>{username}</span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
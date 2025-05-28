import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '/LUVLogo.webp';
import Button from '../../components/Buttons/Button';
import { useSelector,  useDispatch  } from 'react-redux';
import { logout } from '../../slices/authSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
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
        <Link to="/addGame" onClick={() => setMenuOpen(false)}>Agregar juego</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>

        <div className="navbar__user-mobile">
          <span>{username}</span>
          <button onClick={handleLogout} className="logout-icon">⎋</button>
        </div>
      </div>

      <div className="navbar__user-desktop">
        <span>{username}</span>
        <Button onClick={handleLogout} text='Cerrar sesión' />
      </div>
    </nav>
  );
};

export default Navbar;
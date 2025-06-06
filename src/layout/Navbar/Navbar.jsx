import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '/LUVLogo.webp';
import Button from '../../components/Buttons/Button';
import { useSelector,  useDispatch  } from 'react-redux';
import { logout } from '../../slices/authSlice';
import userService from "../../services/userService";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const rol = useSelector((state) => state.auth.rol); 

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
    userService.logout(); 
    navigate('/');
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
        <Link to="/home" onClick={() => setMenuOpen(false)}>Inicio</Link>

        {rol==='administrador' ? 
        <Link to="/games" onClick={() => setMenuOpen(false)}>Juegos</Link> : 
        <Link to="/games" onClick={() => setMenuOpen(false)}>Mis juegos</Link>
        }
        {rol==='administrador' ? 
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Usuarios</Link>:
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contacto</Link>}


        <div className='navbar__user-mobile'>
          <span className='navbar_username'>{username}</span>
          <Button onClick={handleLogout} text = '⎋' className="logout-icon" />
        </div>
      </div>

      <div className="navbar__user-desktop">
        <span className='navbar_username'>{username}</span>
        <Button onClick={handleLogout} text='Cerrar sesión' className='navbar-button'/>
      </div>
    </nav>
  );
};
/*
      <div className="navbar__user-desktop">
        <span className='navbar_username'>{username}</span>
        <Button onClick={handleLogout} text='Cerrar sesión' className='navbar-button'/>
      </div>

      <div className={window.innerWidth < 768 ? 'navbar__user-mobile' : 'navbar__user-desktop'}>
        <span className='navbar_username'>{username}</span>
        <Button 
          onClick={handleLogout} 
          text = {window.innerWidth < 768 ? '⎋' : 'Cerrar sesión'} 
          className={window.innerWidth < 768 ? 'logout-icon' : 'navbar-button' } 
        />
      </div>
*/

export default Navbar;
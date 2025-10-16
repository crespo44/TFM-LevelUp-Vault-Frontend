import './Preloader.css';
import logo from '/LUVLogo.webp';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-logo"><img src={logo} alt="Logo" /></div>
      <div className="preloader-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="preloader-text">Cargando página...</p>
    </div>
  );
};

export default Preloader;
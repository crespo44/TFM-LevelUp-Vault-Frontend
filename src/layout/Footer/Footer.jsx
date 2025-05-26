import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} LevelUpVault. Todos los derechos reservados.</p>
        <p>Diseñado para gamers. Inspirado en lo mejor del universo gaming.</p>
      </div>
    </footer>
  );
};

export default Footer;
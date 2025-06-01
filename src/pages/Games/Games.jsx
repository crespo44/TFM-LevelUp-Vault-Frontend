import Card from '../../components/Card/Card';
import CreateGameForm from '../../components/CreateGameForm/CreateGameForm';
import './Games.css';

const Games = () => {
  return (
    <div className="add-game-page">
      <h1 className="add-game-title">🎮Añadir nuevo juego a tu colección</h1>
      <p className="add-game-subtitle">Rellena los campos y añade juegos a tu biblioteca personal</p>
      <Card className="wide-card">
        <CreateGameForm />
      </Card>
    </div>
  );
};

export default Games;
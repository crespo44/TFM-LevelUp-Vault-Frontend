import axios from 'axios';

const BASE_GAME_URL= import.meta.env.VITE_APP_BASE_GAME_URL

const gameAPI = axios.create({
  baseURL: BASE_GAME_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

gameAPI.interceptors.request.use((config) => {
  const auth = sessionStorage.getItem('auth');
  const token = auth ? JSON.parse(auth).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const gameService = {
  getUserGames: () => gameAPI.get('/'),
  createGame: (gameData) => gameAPI.post('/', gameData),
  updateGame: (id, updatedData) => gameAPI.put(`/${id}`, updatedData),
  deleteGame: (id) => gameAPI.delete(`/${id}`),

  getAllGames: () => gameAPI.get('/admin/all'),
  adminDeleteGame: (id) => gameAPI.delete(`/admin/${id}`)
};

export default gameService;
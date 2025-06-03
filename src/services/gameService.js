import axios from 'axios';
import store from '../store';
import { logout } from '../slices/authSlice';

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
  getFilteredGames: (params) => gameAPI.get('/', { params }),
  getAllGames: (params) => gameAPI.get('/admin/all', { params }),
  adminDeleteGame: (id) => gameAPI.delete(`/admin/${id}`)
};

gameAPI.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 || message === "Token expirado") {
      store.dispatch(logout());
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default gameService;
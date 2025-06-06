import axios from 'axios';
import store from '../store';
import { logout } from '../slices/authSlice';

const BASE_IMAGE_URL = import.meta.env.VITE_APP_BASE_IMAGE_URL;

const imageAPI = axios.create({
  baseURL: BASE_IMAGE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

imageAPI.interceptors.request.use((config) => {
  const auth = sessionStorage.getItem('auth');
  const token = auth ? JSON.parse(auth).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

imageAPI.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 || message === "Token expirado") {
      store.dispatch(logout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const imageService = {
  uploadImage: (gameId, formData) => imageAPI.post(`/upload/${gameId}`, formData),
  listImages: (gameId) => imageAPI.get(`/list/${gameId}`),
  deleteImage: (publicId) => imageAPI.delete(`/delete`, { params: { publicId } }),
  downloadImage: (gameId, filename) => imageAPI.get(`/download/${gameId}/${filename}`, { responseType: 'blob' })
};

export default imageService;
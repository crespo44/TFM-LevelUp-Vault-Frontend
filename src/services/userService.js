import axios from 'axios';

const BASE_URL = 'http://localhost:3000/users';

const userAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

userAPI.interceptors.request.use((config) => {
 const auth = sessionStorage.getItem('auth');
 const token = auth ? JSON.parse(auth).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
const userService = {
  login: (credentials) => userAPI.post('/login', credentials),

  validateToken: () => userAPI.get('/verify-token'),

  getUserById: (id) => userAPI.get(`/${id}`),

  createUser: (newUser) => userAPI.post('/', newUser),

  updateUser: (id) => userAPI.put(`/${id}`),

  deleteUser: (id) => userAPI.delete(`/${id}`),

  logout: () => {
    sessionStorage.removeItem('auth');
    window.location.href = '/';
  }
};

export default userService;
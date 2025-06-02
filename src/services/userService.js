import axios from 'axios';

const BASE_USER_URL= import.meta.env.VITE_APP_BASE_USER_URL

const userAPI = axios.create({
  baseURL: BASE_USER_URL,
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

  search: (params) => userAPI.get('/search', { params }),

  updateUser: (id, userData) => userAPI.put(`/${id}`, userData),

  deleteUser: (id) => userAPI.delete(`/${id}`),

  logout: () => sessionStorage.removeItem('auth')
};

export default userService;
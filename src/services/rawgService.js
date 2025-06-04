import axios from 'axios';

const RAWG_API_KEY = import.meta.env.VITE_APP_API_KEY_RAWG;
const RAWG_BASE_URL = import.meta.env.VITE_APP_RAWG_BASE_URL;

const rawgApi = axios.create({
  baseURL: RAWG_BASE_URL,
  params: {
    key: RAWG_API_KEY,
  }
});
const titleToSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "") 
    .trim()
    .replace(/\s+/g, "-");

const rawgService = {
  searchGame: async (title) => {
    try {
      const slug = titleToSlug(title);
      const response = await rawgApi.get(`/games/${slug}`);
      return response.data?.background_image || null;
    } catch (error) {
      console.error("Error fetching game from RAWG:", error);
      return null;
    }
  },
};

export default rawgService;
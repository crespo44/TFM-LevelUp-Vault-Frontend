import axios from 'axios';

const GNEWS_API_KEY = import.meta.env.VITE_APP_API_KEY_GNEWS;
const GNEWS_BASE_URL = import.meta.env.VITE_APP_GNEWS_BASE_URL;

const gnewsAPI = axios.create({
  baseURL: GNEWS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const gnewsService = {
  getNews: async () => {
    try {
      const response = await gnewsAPI.get(`/search`, {
        params: {
          q: '"nuevo videojuego" OR "lanzamiento videojuego" OR "ps5" OR "xbox series x" OR "nintendo switch" OR "Android videojuegos" OR "steam game" OR "tráiler videojuego" OR "demo jugable"',
          lang: 'es',
          max: 4,
          token: GNEWS_API_KEY
        }
      });
      return Array.isArray(response.data.articles) ? response.data.articles : [];
    } catch (error) {
      console.error('Error fetching GNews:', error);
      return [];
    }
  }
};

export default gnewsService;
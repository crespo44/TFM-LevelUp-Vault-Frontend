import axios from 'axios';

const NEWSDATA_API_KEY = import.meta.env.VITE_APP_API_KEY_NEWSDATA;
const NEWSDATA_BASE_URL = import.meta.env.VITE_APP_NEWSDATA_BASE_URL;

const newsDataAPI = axios.create({
  baseURL: NEWSDATA_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const newsDataService = {
  getNews: async () => {
    try {
      const response = await newsDataAPI.get(`/latest`, {
        params: {
          apikey: NEWSDATA_API_KEY,
          qInTitle: 'videojuegos OR ps5 OR Android OR Steam OR xbox OR nintendo',
          language: 'es',
          category: 'entertainment',
          size: 4
        }
      });
      console.log('Respuesta completa de NewsData:', response.data);
      return Array.isArray(response.data.results) ? response.data.results : [];
    } catch (error) {
      console.error('Error fetching newsData:', error);
      return [];
    }
  }
};

export default newsDataService;
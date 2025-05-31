import axios from 'axios';

const BASE_EMAIL_URL= import.meta.env.VITE_APP_BASE_EMAIL_URL

const emailAPI = axios.create({
  baseURL: BASE_EMAIL_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const emailService = {
  sendEmail: (newUser) => emailAPI.post('/send-email', newUser),
  sendContactEmail: (contactData) => emailAPI.post('/contact', contactData)
};

export default emailService;
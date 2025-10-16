import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./slices/authSlice";
import './App.css'
import MainLayout from './layout/MainLayout/MainLayout';


import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Games from './pages/Games/Games';
import Contact from './pages/Contact/Contact';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import emailService from './services/emailService';

function App() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth) {
      const { token, username, rol } = JSON.parse(auth);
      dispatch(setCredentials({ token, username, rol }));
    }
  }, [dispatch]);

  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await emailService.uploadPage();
      } catch (error) {
        console.warn("No se pudo conectar con el backend en la carga inicial", error);
      } finally {
        setReady(true);
      }
    };

    wakeUpBackend();
  }, []);

  if (!ready) return <Preloader />;

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App

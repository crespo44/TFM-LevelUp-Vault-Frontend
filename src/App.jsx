import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./slices/authSlice";
import './App.css'
import MainLayout from './layout/MainLayout/MainLayout';


import Login from './pages/Login/Login';
//import Home from './pages/Home/Home';
import AddGame from './pages/AddGame/AddGame';
import Contact from './pages/Contact/Contact';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth) {
      const { token, username, role } = JSON.parse(auth);
      dispatch(setCredentials({ token, username, role }));
    }
  }, [dispatch]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/addGame" element={<AddGame />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App

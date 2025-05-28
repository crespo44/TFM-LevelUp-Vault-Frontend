import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer/Footer";

import Login from './pages/Login/Login';
//import Home from './pages/Home/Home';
import AddGame from './pages/AddGame/AddGame';
import Contact from './pages/Contact/Contact';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {

  return (
      <Router>
        <div className="app-container">
          <Navbar />
        <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addGame" element={<AddGame />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
        <Footer />
        </div>
      </Router>
  )
}

export default App

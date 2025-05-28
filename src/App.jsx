import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MainLayout from './layout/MainLayout/MainLayout';


import Login from './pages/Login/Login';
//import Home from './pages/Home/Home';
import AddGame from './pages/AddGame/AddGame';
import Contact from './pages/Contact/Contact';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {

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

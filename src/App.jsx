import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from './pages/Login/Login';
/*import Home from './pages/Home/Home';
import AddGame from './pages/AddGame/AddGame';
import Contact from './pages/Contact/Contact';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';*/

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePlant from './pages/CreatePlant';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/createplant">Add New Plant</Link>
        <Link to="/login">Log Into Your Account</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createplant" element={<CreatePlant />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;

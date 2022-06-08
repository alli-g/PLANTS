import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePlant from './pages/CreatePlant';
import UserPage from './pages/UserPage'
import { useState } from 'react';
import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };
  return (
    <Router>
      <nav>
        <Link to="/"> Home</Link>
        {isAuth && <Link to="/createplant">Add New Plant</Link> &&<Link to="/yourplants">Your Plants</Link>}
        {!isAuth ? (
          <Link to="/login">Log Into Your Account</Link>
        ) : (
          <button onClick={signUserOut}> LogOut</button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createplant" element={<CreatePlant isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/yourplants" element={<UserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

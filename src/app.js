import 'bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePlant from './pages/CreatePlant';
import UserPage from './pages/UserPage';
import { auth } from './firebase-config';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };
  return (
    <Router>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Treat yo plants right</Navbar.Brand>
        <Nav.Link href="/"> Home</Nav.Link>
        {isAuth && <Nav.Link href="/yourplants">Your Plants</Nav.Link>}
        {isAuth && <Nav.Link href="/createplant">Add New Plant</Nav.Link>}
        {!isAuth ? (
          <Nav.Link href="/login">Log Into Your Account</Nav.Link>
        ) : (
          <Button variant="outline-secondary" onClick={signUserOut}>
            {' '}
            LogOut
          </Button>
        )}
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createplant" element={<CreatePlant isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/yourplants" element={<UserPage isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;

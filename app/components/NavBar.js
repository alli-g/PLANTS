import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav id="navbar" className="row">
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/robots">Robots</Link>
    </nav>
  );
};

export default Navbar;

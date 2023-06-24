import React from "react";
import { Link } from "react-router-dom";



const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link className="navbar-brand" to="/home">PokeApp</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favoritos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

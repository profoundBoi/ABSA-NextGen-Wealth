import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import absaLogo from "../assets/AB.png";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">

      <div className="logo">
        <img src={absaLogo} alt="ABSA Logo" />
      </div>

      <button
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link className={isActive("/")} to="/" onClick={closeMenu}>
          Dashboard
        </Link>

        <Link className={isActive("/snapshot")} to="/snapshot" onClick={closeMenu}>
          Moneysnapshot
        </Link>

        <Link className={isActive("/tracks")} to="/tracks" onClick={closeMenu}>
          Strategy Tracks
        </Link>

        <Link className={isActive("/simulation")} to="/simulation" onClick={closeMenu}>
          Simulation Lab
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;

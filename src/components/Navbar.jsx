import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import absaLogo from "../assets/AB.png";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function isActive(path) {
    return location.pathname === path ? "active" : "";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  // Get first name only for display
  const firstName = session?.name?.split(" ")[0] || "Account";

  return (
    <nav className="navbar">

      <div className="logo">
        <img src={absaLogo} alt="ABSA Logo" />
      </div>

      <button
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(p => !p)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link className={isActive("/")} to="/" onClick={closeMenu}>Dashboard</Link>
        <Link className={isActive("/snapshot")} to="/snapshot" onClick={closeMenu}>Moneysnapshot</Link>
        <Link className={isActive("/tracks")} to="/tracks" onClick={closeMenu}>Strategy Tracks</Link>
        <Link className={isActive("/simulation")} to="/simulation" onClick={closeMenu}>Simulation Lab</Link>
        <button className="nav-logout mobile-only" onClick={() => { closeMenu(); handleLogout(); }}>Sign out</button>
      </div>

      <div className="nav-user">
        <div className="nav-avatar">{firstName.charAt(0).toUpperCase()}</div>
        <span className="nav-name">{firstName}</span>
        <button className="nav-logout" onClick={handleLogout}>Sign out</button>
      </div>

    </nav>
  );
}

export default Navbar;

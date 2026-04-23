import { Link, useLocation } from "react-router-dom";
import absaLogo from "../assets/AB.png";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={absaLogo} alt="ABSA Logo" />
      </div>

      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Dashboard
        </Link>

        <Link className={location.pathname === "/snapshot" ? "active" : ""} to="/snapshot">
          Moneysnapshot
        </Link>

        <Link className={location.pathname === "/tracks" ? "active" : ""} to="/tracks">
          Strategy Tracks
        </Link>

        <Link className={location.pathname === "/simulation" ? "active" : ""} to="/simulation">
          Simulation Lab
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
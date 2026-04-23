import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="logo">YTAutomation</div>

      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Home
        </Link>
        <Link
          className={location.pathname === "/studio" ? "active" : ""}
          to="/studio"
        >
          Studio
        </Link>
      </div>
    </div>
  );
} 
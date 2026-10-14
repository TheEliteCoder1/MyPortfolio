import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

// format each link inside the navbar
export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand"><Logo /><span>Raphael Julian</span></NavLink>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end className={({ isActive }) => (isActive ? "active" : "")}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

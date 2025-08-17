import "./Navbar.css";
import { NavLink } from "react-router";

export function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

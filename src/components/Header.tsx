import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between ">
      <NavLink to="/">Collab Hub</NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

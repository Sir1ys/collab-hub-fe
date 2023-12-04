import Link from "./Link";

export default function Header() {
  return (
    <header className="p-10 flex flex-row justify-between border-b-4 border-sky-700 bg-sky-100">
      <Link text="Collab Hub" path="/" />
      <nav>
        <ul className="flex gap-7">
          <li>
            <Link text="Projects" path="/" />
          </li>
          <li>
            <Link text="Login" path="/login" />
          </li>
          <li>
            <Link text="Profile" path="/profile" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

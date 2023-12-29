import { useState } from "react";
import { useUserDispatch, useUserSelector } from "../store/hooks";
import { removeUser } from "../store/userSlice";
import Link from "./Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

export default function Header() {
  const [open, setOpen] = useState(false);

  const user = useUserSelector((state) => state.user);

  const dispatch = useUserDispatch();

  let links = [
    {
      text: "Projects",
      path: "/",
    },
    {
      text: user.user_id !== 0 ? "Log Out" : "Log In",
      path: user.user_id !== 0 ? "/logout" : "/login",
    },
    {
      text: user.user_id !== 0 ? "Profile" : "",
      path: user.user_id !== 0 ? "/profile": ""
    },
  ];

  const handleLogOut = () => {
    dispatch(removeUser());
  };

  return (
    <header className="p-10 md:flex md:flex-row md:justify-between border-b-4 border-sky-700 bg-sky-50">
      <div className="flex items-center gap-2">
        <WorkspacesIcon color="primary" />
        <Link text="Collab Hub" path="/" />
      </div>
      <nav>
        <div
          className="absolute right-8 top-9 cursor-pointer md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? (
            <MenuIcon fontSize="large" color="primary" />
          ) : (
            <CloseIcon fontSize="large" color="primary" />
          )}
        </div>
        <ul
          className={`md:flex gap-7 absolute md:static bg-sky-50 md:bg-inherit md:z-auto z-[2] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
            open
              ? "top-20 opacity-100 border-b-4 border-sky-700 h-screen overflow-hidden"
              : "left-[-490px] opacity-0"
          } md:opacity-100 md:border-none`}
        >
          {links.map(({ text, path }, index) => {
            return path !== "/logout" ? (
              <li
                key={index}
                className="md:my-0 my-7 md:last:my-0 p-2 hover:bg-sky-100 md:hover:bg-inherit rounded-md"
              >
                <Link text={text} path={path}></Link>
              </li>
            ) : (
              <button
                key={index}
                onClick={() => {
                  handleLogOut();
                }}
                className="text-sky-500 text-2xl font-medium hover:text-sky-700 md:my-0 my-7 md:last:my-0 p-2 hover:bg-sky-100 md:hover:bg-inherit rounded-md"
              >
                Log Out
              </button>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

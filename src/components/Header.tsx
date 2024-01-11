import { useState, useEffect } from "react";
import { useUserDispatch, useUserSelector } from "../store/hooks";
import { removeUser } from "../store/userSlice";
import Link from "./Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { setUser } from "../store/userSlice";
import { type User } from "../types/types";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const user = useUserSelector((state) => state.user);
  const dispatch = useUserDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== "undefined" && savedUser !== null) {
      const savedUser: User = JSON.parse(`${localStorage.getItem("user")}`);
      dispatch(setUser(savedUser));
    }
  }, []);

  let mainLinks = [
    {
      text: "Projects",
      path: "/",
    },
    {
      text: "My Projects",
      path: "/projects/myprojects/created",
    },
    {
      text: user.user_id !== 0 ? "Log Out" : "Log In",
      path: user.user_id !== 0 ? "/logout" : "/login",
    },
    {
      text: user.user_id !== 0 ? "Profile" : "",
      path: user.user_id !== 0 ? "/profile": ""
    }
  ];

  let secondaryLinks = [
    {
      text: "Created",
      path: "/projects/myprojects/created",
    },
    {
      text: "Involved",
      path: "/projects/myprojects/involved",
    },
    {
      text: "Requested",
      path: "/projects/myprojects/requested",
    },
  ];

  const handleLogOut = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate("/");

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
          {mainLinks.map(({ text, path }, index) => {
            return path !== "/logout" ? (
              <li
                key={index}
                className="md:my-0 my-7 md:last:my-0 md:hover:bg-inherit rounded-md"
              >
                {text !== "My Projects" ? (
                  <Link text={text} path={path} styles="p-2" />
                ) : (
                  <>
                    <Link
                      text={text}
                      path={path}
                      styles={"hidden md:block"}
                      onMouseOver={() => setDropDown(true)}
                    />
                    <ul
                      className={`w-48 z-10 flex flex-col gap-7 md:p-3 md:bg-sky-50 md:absolute rounded-xl md:border md:border-sky-200 md:shadow-xl ${
                        dropdown ? "md:flex" : "md:hidden"
                      }`}
                      onClick={() => setDropDown(false)}
                      onMouseLeave={() => setDropDown(false)}
                    >
                      {secondaryLinks.map(({ text, path }, index) => {
                        return (
                          <li key={index}>
                            <Link text={text} path={path} styles="p-2" />
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </li>
            ) : (
              <button
                key={index}
                onClick={() => {
                  handleLogOut();
                }}
                className="text-sky-500 text-2xl font-medium hover:text-sky-700 md:my-0 pl-2 md:pl-0"
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

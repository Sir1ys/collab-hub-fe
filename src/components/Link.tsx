import { NavLink } from "react-router-dom";

type Props = {
  text: string;
  path: string;
};

export default function Link({ text, path }: Props) {
  return (
    <NavLink
      to={path}
      className="text-sky-500 text-2xl font-medium hover:text-sky-700"
    >
      {text}
    </NavLink>
  );
}

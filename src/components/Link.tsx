import { NavLink } from "react-router-dom";
import { ComponentPropsWithRef } from "react";

type Props = {
  text: string;
  path: string;
  styles?: string;
} & ComponentPropsWithRef<"a">;

export default function Link({ text, path, styles, ...props }: Props) {
  return (
    <NavLink
      {...props}
      to={path}
      className={`text-sky-500 text-2xl font-medium hover:text-sky-700 ${styles}`}
    >
      {text}
    </NavLink>
  );
}

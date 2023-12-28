import { useUserSelector } from "../../store/hooks";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "../Link";

type Props = {};

export default function MyProjects({}: Props) {
  const user = useUserSelector((state) => state.user);

  return user.user_id === 0 ? (
    <h2 className="text-sky-700 text-xl font-semibold md:text-2xl">
      Log In to see your projects
      <ArrowRightAltIcon className="m-2" />
      <Link text="Log In" path="/login" styles="text-xl md:text-2xl" />
    </h2>
  ) : (
    <></>
  );
}

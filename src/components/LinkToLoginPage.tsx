import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "./Link";

export default function LinkToLoginPage() {
  return (
    <h2 className="text-sky-700 text-xl font-semibold md:text-2xl flex flex-col items-center md:block">
      Log In to see your projects
      {window.innerWidth >= 768 ? (
        <ArrowRightAltIcon className="m-2" />
      ) : (
        <ArrowDownwardIcon className="m-2" />
      )}
      <Link text="Log In" path="/login" styles="text-xl md:text-2xl" />
    </h2>
  );
}

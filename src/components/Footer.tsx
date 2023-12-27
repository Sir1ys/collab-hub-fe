import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Link from "./Link";

export default function Footer() {
  return (
    <footer className="p-7 border-t-4 border-sky-700 bg-sky-50 ">
      <div className=" hidden md:w-max md:flex items-center gap-2 m-auto">
        <WorkspacesIcon color="primary" />
        <Link text="Collab Hub" path="/" />
      </div>
    </footer>
  );
}

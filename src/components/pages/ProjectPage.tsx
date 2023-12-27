import { useLocation } from "react-router-dom";
import { Project } from "../../types/types";

type LocationState = {
  state: Project;
};

export default function ProjectPage() {
  const location = useLocation();
  const { state: project } = location as LocationState;
  console.log(project);

  return <article></article>;
}

import { type Project } from "../types/types";
import ProjectComponent from "./ProjectComponent";

type Props = {
  projects: Project[];
  numberOfProjects?: number;
};

export default function ProjectsList({ projects, numberOfProjects }: Props) {
  return projects
    .map((project: Project, index: number) => {
      return <ProjectComponent key={index} project={project} />;
    })
    .slice(0, numberOfProjects);
}

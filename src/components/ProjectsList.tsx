import { type Project } from "../types/types";
import ProjectComponent from "./ProjectComponent";

type Props = {
  projects: Project[];
  numberOfProjects?: number;
  projectStyles?: string;
};

export default function ProjectsList({
  projects,
  numberOfProjects,
  projectStyles,
}: Props) {
  return projects
    .map((project: Project, index: number) => {
      return (
        <ProjectComponent
          key={index}
          project={project}
          styles={projectStyles}
        />
      );
    })
    .slice(0, numberOfProjects);
}

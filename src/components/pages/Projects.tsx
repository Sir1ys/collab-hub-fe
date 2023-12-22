import { useEffect, useState } from "react";
import { getProjects } from "../../utils/projects_api";
import { type Project } from "../../types/types";
import ProjectComponent from "../ProjectComponent";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then((projects: Project[]) => setProjects(projects));
  }, []);

  return (
    <div className="gap-8 p-5 flex flex-wrap">
      {projects.map((project: Project) => {
        return <ProjectComponent project={project} />;
      })}
    </div>
  );
}

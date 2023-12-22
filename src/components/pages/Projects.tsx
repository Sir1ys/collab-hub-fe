import { useEffect, useState } from "react";
import { getProjects } from "../../utils/projects_api";
import { type Project } from "../../types/types";
import ProjectComponent from "../ProjectComponent";
import Loader from "../Loader";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjects().then((projects: Project[]) => {
      setProjects(projects);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="gap-8 p-5 flex flex-wrap">
        {projects.map((project: Project, index: number) => {
          return <ProjectComponent key={index} project={project} />;
        })}
      </div>
      {isLoading ? <Loader /> : null}
    </>
  );
}

import { useEffect, useState } from "react";
import { getProjects } from "../../utils/projects_api";
import { type Project } from "../../types/types";
import ProjectsList from "../ProjectsList";
import Loader from "../Loader";
import Button from "../Button";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [numberOfProjects, setNumberOfProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjects().then((projects: Project[]) => {
      setProjects(projects);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="flex flex-col gap-5 mb-5">
      <div className="gap-8 p-5 flex flex-wrap">
        <ProjectsList projects={projects} numberOfProjects={numberOfProjects} />
      </div>
      <Button
        styles="w-40 self-center"
        onClick={() =>
          setNumberOfProjects((prevNumber) => {
            return prevNumber + 3;
          })
        }
        disabled={numberOfProjects >= projects.length ? true : false}
        text="see more"
      />
      {isLoading ? <Loader /> : null}
    </section>
  );
}

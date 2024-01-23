import { useEffect, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import LinkToLoginPage from "../LinkToLoginPage";
import { getProjectsParticipatedByUser } from "../../utils/users_api";
import { type Project } from "../../types/types";
import ProjectComponent from "../ProjectComponent";

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const user = useUserSelector((state) => state.user);

  useEffect(() => {
    if (user.user_id !== 0) {
      getProjectsParticipatedByUser(user.user_id).then((response: Project[]) =>
        setProjects(response)
      );
    }
  }, []);

  return user.user_id === 0 ? (
    <LinkToLoginPage />
  ) : (
    <>
      <div className="md:w-8/12 gap-8 p-5 flex flex-col justify-center items-center">
        {projects.length === 0 ? (
          <h2 className="text-sky-700 font-semibold text-2xl">
            There are no projects yet
          </h2>
        ) : (
          <>
            {projects.map((project: Project, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  project={project}
                  styles="w-full"
                  involved={true}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

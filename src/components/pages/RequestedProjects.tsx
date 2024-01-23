import { useEffect, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import { getProjectsRequestedByUser } from "../../utils/users_api";
import LinkToLoginPage from "../LinkToLoginPage";
import { type Project } from "../../types/types";
import ProjectsList from "../ProjectsList";

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const user = useUserSelector((state) => state.user);

  useEffect(() => {
    if (user.user_id !== 0) {
      getProjectsRequestedByUser(user.user_id).then((response: Project[]) =>
        setProjects(response)
      );
    }
  }, []);

  return user.user_id === 0 ? (
    <LinkToLoginPage />
  ) : (
    <>
      <div className="md:w-8/12 gap-8 p-5 flex items-center justify-center flex-col ">
        {projects.length === 0 ? (
          <h2 className="text-sky-700 font-semibold text-2xl">
            There are no projects yet
          </h2>
        ) : (
          <>
            <ProjectsList
              projects={projects}
              projectStyles="w-full hover:bg-sky-200"
            />
          </>
        )}
      </div>
    </>
  );
}

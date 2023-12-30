import { useEffect, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import LinkToLoginPage from "../LinkToLoginPage";
import { getProjectsCreatedByUser } from "../../utils/users_api";
import { type Project } from "../../types/types";
import ProjectsList from "../ProjectsList";

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const user = useUserSelector((state) => state.user);

  useEffect(() => {
    if (user.user_id !== 0) {
      getProjectsCreatedByUser(user.user_id).then((response: Project[]) =>
        setProjects(response)
      );
    }
  }, []);

  return user.user_id === 0 ? (
    <LinkToLoginPage />
  ) : (
    <ProjectsList projects={projects} />
  );
}

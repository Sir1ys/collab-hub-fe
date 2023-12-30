import { useEffect, useRef, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import LinkToLoginPage from "../LinkToLoginPage";
import {
  getProjectsCreatedByUser,
  getProjectsParticipatedByUser,
  getProjectsRequestedByUser,
} from "../../utils/users_api";
import { type Project } from "../../types/types";
import ProjectComponent from "../ProjectComponent";
import Form, { type FormHandle } from "../Form";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import Modal from "../Modal";
import Button from "../Button";

type Props = {
  request: "Created" | "Participated" | "Requested";
};

export default function MyProjects({ request }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(false);
  const user = useUserSelector((state) => state.user);
  const createProjectForm = useRef<FormHandle>(null);

  function handleCreateProject(data: unknown) {
    const extractedData = data as {
      email: string;
      password: string;
      name: string;
      username: string;
      avatar_url: string;
      bio: string;
    };

    createProjectForm.current?.clear();
  }

  const handleCreate = () => {
    setActive(true);
  };

  useEffect(() => {
    if (user.user_id !== 0) {
      switch (request) {
        case "Created":
          getProjectsCreatedByUser(user.user_id).then((response: Project[]) =>
            setProjects(response)
          );
          break;
        case "Participated":
          getProjectsParticipatedByUser(user.user_id).then(
            (response: Project[]) => setProjects(response)
          );
          break;
        case "Requested":
          getProjectsRequestedByUser(user.user_id).then((response: Project[]) =>
            setProjects(response)
          );
          break;
        default:
          getProjectsRequestedByUser(user.user_id).then((response: Project[]) =>
            setProjects(response)
          );
      }
    }
  }, [request]);

  return user.user_id === 0 ? (
    <LinkToLoginPage />
  ) : (
    <>
      <div className="gap-8 p-5 flex  flex-col">
        {projects.length === 0 ? (
          <h2 className="text-sky-700 font-semibold text-2xl">
            There are no projects yet
          </h2>
        ) : (
          <>
            {request === "Created" ? (
              <Button
                text="Create"
                styles="self-end w-24"
                onClick={handleCreate}
              />
            ) : (
              <></>
            )}
            {projects.map((project: Project, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  project={project}
                  styles="hover:scale-100"
                />
              );
            })}
          </>
        )}
      </div>
      <Modal active={active} setActive={setActive}>
        <Form
          onSave={handleCreateProject}
          ref={createProjectForm}
          styles={"flex flex-col gap-4"}
        >
          <Input type="text" id="projectName" label="Project Name" required />
          <TextArea
            id="projectDescription"
            label="Project Description"
            placeholder="Write the description here..."
            required
          />
          <Input
            type="number"
            id="membersRequired"
            label="Members Required"
            required
          />
          <div className="flex gap-4">
            <Button text="Create" styles="w-24" />
            <Button text="Cancel" styles="w-24" />
          </div>
        </Form>
      </Modal>
    </>
  );
}

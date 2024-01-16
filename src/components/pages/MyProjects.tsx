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
      projectName: string;
      projectDescription: string;
      membersRequired: number;
    };

    console.log(extractedData);

    createProjectForm.current?.clear();
  }

  const handleCancel = () => {
    createProjectForm.current?.clear();
    setActive(false);
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
                onClick={() => setActive(true)}
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
      <Modal active={active} setActive={setActive} styles="h-84 opacity-100">
        <Form
          onSave={handleCreateProject}
          ref={createProjectForm}
          styles={"flex flex-col gap-8"}
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
          <div className="flex gap-4 justify-end">
            <Button type="submit" text="Create" styles="p-4" />
            <Button
              text="Cancel"
              styles="p-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-stone-50 hover:text-stone-50 active:text-stone-50 border-red-700 hover:border-red-300 active:border-red-300"
              onClick={() => {
                handleCancel();
              }}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
}

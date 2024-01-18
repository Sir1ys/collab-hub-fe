import { useEffect, useRef, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import { getProjectsCreatedByUser } from "../../utils/users_api";
import { createProject } from "../../utils/projects_api";
import ProjectComponent from "../ProjectComponent";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import Modal from "../Modal";
import Button from "../Button";
import Form, { type FormHandle } from "../Form";
import LinkToLoginPage from "../LinkToLoginPage";
import { type Project } from "../../types/types";

export default function CreatedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(false);
  const user = useUserSelector((state) => state.user);
  const createProjectForm = useRef<FormHandle>(null);

  function handleCreateProject(data: unknown) {
    const extractedData = data as {
      projectName: string;
      projectDescription: string;
      membersRequired: string;
    };

    const projectInfo = {
      project_author: user.user_id,
      project_name: extractedData.projectName,
      project_description: extractedData.projectDescription,
      project_created_at: 1669852800000,
      required_members: parseInt(extractedData.membersRequired),
    };

    createProject(projectInfo)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    createProjectForm.current?.clear();
  }

  const handleCancel = () => {
    createProjectForm.current?.clear();
    setActive(false);
  };

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
    <>
      <div className="gap-8 p-5 flex flex-col items-center justify-center">
        {projects.length === 0 ? (
          <h2 className="text-sky-700 font-semibold text-2xl">
            There are no projects yet
          </h2>
        ) : (
          <>
            <Button
              text="Create"
              styles="self-end w-24"
              onClick={() => setActive(true)}
            />
            {projects.map((project: Project, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  project={project}
                  styles="w-8/12 hover:scale-100"
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

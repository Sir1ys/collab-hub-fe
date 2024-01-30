import { useEffect, useRef, useState } from "react";
import { useUserSelector } from "../../store/hooks";
import { getProjectsCreatedByUser } from "../../utils/users_api";
import {
  addProjectSkill,
  createProject,
  postProjectStatus,
} from "../../utils/projects_api";
import ProjectComponent from "../ProjectComponent";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import Modal from "../modals/Modal";
import Button from "../Button";
import Form, { type FormHandle } from "../Form";
import { getAllSkills } from "../../utils/skills_api";
import LinkToLoginPage from "../LinkToLoginPage";
import {
  type Skill,
  type Project,
  type SelectOptions,
  type StatusObject,
} from "../../types/types";
import SelectElement from "../SelectElement";
import { getStatuses } from "../../utils/status";

export default function CreatedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [statuses, setStatuses] = useState<SelectOptions[]>([]);
  const [selectValues, setSelectValues] = useState<SelectOptions[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<SelectOptions>();
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
      .then((projectDetails: Project) => {
        setProjects((prevProjects) => {
          return [...prevProjects, projectDetails];
        });
        setActive(false);
        return projectDetails;
      })
      .then((projectDetails) => {
        if (selectedStatus !== undefined) {
          postProjectStatus(projectDetails.project_id, selectedStatus.label);
        }
        return projectDetails;
      })
      .then(async (projectDetails) => {
        const promises = [...selectValues].map((value) => {
          return addProjectSkill(projectDetails.project_id, value.label);
        });
        await Promise.all(promises);
        setSelectValues([]);
      })

      .catch((err) => console.log(err));

    createProjectForm.current?.clear();
  }

  const handleCancel = () => {
    createProjectForm.current?.clear();
    setSelectValues([]);
    setSelectedStatus({ label: "", value: 3 });
    setActive(false);
  };

  useEffect(() => {
    if (user.user_id !== 0) {
      getProjectsCreatedByUser(user.user_id).then((response: Project[]) =>
        setProjects(response)
      );
      getAllSkills().then((response: Skill[]) => {
        const updatedSkills = response.map((skill) => ({
          label: skill.skill_name,
          value: skill.skill_id,
        }));
        setOptions(updatedSkills);
      });
      getStatuses().then((response: StatusObject[]) => {
        const updatedStatuses = response.map((status) => ({
          label: status.status_name,
          value: status.status_id,
        }));
        setStatuses(updatedStatuses);
      });
    }
  }, []);

  return user.user_id === 0 ? (
    <LinkToLoginPage />
  ) : (
    <>
      <div className="md:w-8/12 gap-8 p-5 flex flex-col items-center justify-center">
        {projects.length === 0 ? (
          <>
            {" "}
            <h2 className="text-sky-700 font-semibold text-2xl">
              There are no projects yet!
            </h2>
            <Button
              text="Create"
              cancel={false}
              styles={`w-48 self-center`}
              onClick={() => setActive(true)}
            />
          </>
        ) : (
          <>
            <Button
              text="Create"
              cancel={false}
              styles={`w-48 self-end`}
              onClick={() => setActive(true)}
            />
            {projects.map((project: Project, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  project={project}
                  styles="w-full"
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
          <h3 className="text-sky-800 font-semibold text-xl mb-2">
            Create Project Form
          </h3>
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
          <SelectElement
            value={selectValues}
            onChange={(o) => setSelectValues(o)}
            options={options}
            multiple={true}
            title="skills"
          />
          <SelectElement
            value={selectedStatus}
            onChange={(o) => setSelectedStatus(o)}
            options={statuses}
            title="status"
          />
          <div className="flex gap-4 justify-end">
            <Button type="submit" text="Create" styles="p-4" cancel={false} />
            <Button
              text="Cancel"
              styles={"p-4"}
              cancel={true}
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

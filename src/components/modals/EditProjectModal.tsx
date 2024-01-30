import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import {
  type Project,
  type Skill,
  type SelectOptions,
  type StatusObject,
} from "../../types/types";
import { getProjectSkills, updateProject } from "../../utils/projects_api";
import SelectElement from "../SelectElement";
import { getAllSkills } from "../../utils/skills_api";
import { getStatuses } from "../../utils/status";

type Props = {
  project: Project;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectState: React.Dispatch<React.SetStateAction<Project>>;
};

export default function EditProjectModal({
  project,
  active,
  setActive,
  setProjectState,
}: Props) {
  const editProjectForm = useRef<FormHandle>(null);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [statuses, setStatuses] = useState<SelectOptions[]>([]);
  const [selectValues, setSelectValues] = useState<SelectOptions[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<SelectOptions>();

  const handleEditProject = (data: unknown) => {
    const extractedData = data as {
      projectName: string;
      projectDescription: string;
      membersRequired: string;
    };

    const updatedProject = {
      project_name:
        extractedData.projectName !== ""
          ? extractedData.projectName
          : project.project_name,
      project_description:
        extractedData.projectDescription !== ""
          ? extractedData.projectDescription
          : project.project_description,
      required_members:
        extractedData.membersRequired !== ""
          ? +extractedData.membersRequired
          : +project.required_members,
    };

    updateProject(project.project_id, updatedProject)
      .then((response) => {
        setProjectState(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setActive(false);

    editProjectForm.current?.clear();
  };

  const handleCancel = () => {
    editProjectForm.current?.clear();
    setActive(false);
  };

  const formatSkills = (skills: Skill[]) => {
    return skills.map((skill) => ({
      label: skill.skill_name,
      value: skill.skill_id,
    }));
  };

  const formatStatuses = (statuses: StatusObject[]) => {
    return statuses.map((status) => ({
      label: status.status_name,
      value: status.status_id,
    }));
  };

  useEffect(() => {
    getAllSkills().then((response: Skill[]) => {
      const updatedSkills = formatSkills(response);
      setOptions(updatedSkills);
    });
    getProjectSkills(project.project_id).then((response: Skill[]) => {
      const updatedProjectSkills = formatSkills(response);
      setSelectValues(updatedProjectSkills);
    });
    getStatuses().then((response: StatusObject[]) => {
      const updatedStatuses = formatStatuses(response);
      setStatuses(updatedStatuses);
    });
  }, []);

  return (
    <Modal active={active} setActive={setActive}>
      <Form
        onSave={handleEditProject}
        ref={editProjectForm}
        styles={"flex flex-col gap-8"}
      >
        <h3 className="text-sky-800 font-semibold text-xl mb-2">
          Edit Project Form
        </h3>
        <Input
          type="text"
          id="projectName"
          label="Project Name"
          styles="w-full"
        />
        <TextArea
          id="projectDescription"
          label="Project Description"
          placeholder="Write the description here..."
          styles="w-full"
        />
        <Input
          type="number"
          id="membersRequired"
          label="Members Required"
          styles="w-full"
        />
        <SelectElement
          value={selectValues}
          onChange={(o) => setSelectValues(o)}
          options={options}
          multiple={true}
          title="skills"
        />
        <SelectElement
          title="status"
          value={selectedStatus}
          onChange={(o) => setSelectedStatus(o)}
          options={statuses}
        />
        <div className="flex gap-4 justify-end">
          <Button type="submit" text="Edit" styles="w-24" cancel={false} />
          <Button
            text="Cancel"
            type="button"
            styles="w-24 bg-red-600"
            onClick={() => {
              handleCancel();
            }}
          />
        </div>
      </Form>
    </Modal>
  );
}

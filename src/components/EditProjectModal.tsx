import { useRef } from "react";
import Modal from "./Modal";
import Form, { type FormHandle } from "./Form";
import Button from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { type Project } from "../types/types";
import { updateProject } from "../utils/projects_api";

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

  return (
    <Modal active={active} setActive={setActive}>
      <Form
        onSave={handleEditProject}
        ref={editProjectForm}
        styles={"flex flex-col gap-8"}
      >
        <Input type="text" id="projectName" label="Project Name" />
        <TextArea
          id="projectDescription"
          label="Project Description"
          placeholder="Write the description here..."
        />
        <Input type="number" id="membersRequired" label="Members Required" />
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

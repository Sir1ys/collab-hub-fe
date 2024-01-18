import { useRef } from "react";
import Modal from "./Modal";
import Form, { type FormHandle } from "./Form";
import Button from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProjectModal({ active, setActive }: Props) {
  const editProjectForm = useRef<FormHandle>(null);

  const handleEditProject = () => {};

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

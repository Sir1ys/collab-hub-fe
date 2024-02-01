import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addUserSkill, deleteUserSkill } from "../../utils/users_api";
import { type Skill, type SelectOptions } from "../../types/types";
import { RootState } from "../../store/store";
import { formatSkills } from "../../utils/formatting";
import Form from "../Form";
import Button from "../Button";
import SelectElement from "../SelectElement";
import { addProjectSkill, deleteProjectSkill } from "../../utils/projects_api";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  allSkills: Skill[];
  setAllSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  currentSkills: Skill[];
  setCurrentSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  type: "profile" | "project";
  projectId?: number;
};

type NewSkill = {
  user_id: number;
  skill_id: number;
};

type ProjectSkill = {
  project_id: number;
  skill_id: number;
};

export default function UpdateSkillModal({
  setActive,
  allSkills,
  currentSkills,
  setCurrentSkills,
  type,
  projectId,
}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [addSkillOptions, setAddSKillOptions] = useState<SelectOptions[]>([]);
  const [selectSkillToAdd, setSelectSkillToAdd] = useState<SelectOptions>();
  const [deleteSkillOptions, setDeleteSKillOptions] = useState<SelectOptions[]>(
    []
  );
  const [selectSkillToDelete, setSelectSkillToDelete] =
    useState<SelectOptions>();

  const handleAddSkill = () => {
    const skillToAdd = selectSkillToAdd?.value;
    if (skillToAdd) {
      if (type === "profile") {
        addUserSkill(user.user_id, +skillToAdd)
          .then((response: NewSkill) => {
            const newSkill = allSkills.find(
              (skill) => skill.skill_id === response.skill_id
            );
            if (newSkill) {
              setCurrentSkills((prevSkills) => [...prevSkills, newSkill]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (projectId) {
        addProjectSkill(projectId, selectSkillToAdd.label)
          .then((response: ProjectSkill) => {
            const newSkill = allSkills.find(
              (skill) => skill.skill_id === response.skill_id
            );
            if (newSkill) {
              setCurrentSkills((prevSkills) => [...prevSkills, newSkill]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setActive(false);
      setSelectSkillToAdd(undefined);
    }
  };

  const handleDeleteSkill = () => {
    const skillToDelete = selectSkillToDelete?.value;
    if (skillToDelete) {
      if (type === "profile") {
        deleteUserSkill(user.user_id, +skillToDelete).then(() => {
          setCurrentSkills((prevSkills) =>
            prevSkills.filter((skill) => skill.skill_id !== skillToDelete)
          );
        });
      } else if (projectId) {
        deleteProjectSkill(projectId, `${skillToDelete}`).then(() => {
          setCurrentSkills((prevSkills) =>
            prevSkills.filter((skill) => skill.skill_id !== skillToDelete)
          );
        });
      }
      setActive(false);
      setSelectSkillToDelete(undefined);
    }
  };

  useEffect(() => {
    setDeleteSKillOptions(formatSkills(currentSkills));
    const newSkills = allSkills.filter((s) => {
      const userSkill = currentSkills.find(
        (skill) => skill.skill_id === s.skill_id
      );
      if (userSkill === undefined) return s;
    });
    setAddSKillOptions(formatSkills(newSkills));
  }, [user, allSkills, currentSkills]);

  return (
    <>
      <Form className="w-full p-2 flex flex-col gap-4" onSave={handleAddSkill}>
        <h2 className="text-sky-800 font-semibold text-2xl p-2">
          Do you want to update your skills?
        </h2>
        <div className="flex flex-col gap-4">
          <h3 className="text-sky-500 text-left font-semibold text-lg">
            Add skill:
          </h3>
          <SelectElement
            value={selectSkillToAdd}
            onChange={(o) => setSelectSkillToAdd(o)}
            options={addSkillOptions}
            title="skills"
          />
          <Button text="Add" cancel={false} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sky-500 text-left font-semibold text-lg">
            Delete skill:
          </h3>
          <SelectElement
            value={selectSkillToDelete}
            onChange={(o) => setSelectSkillToDelete(o)}
            options={deleteSkillOptions}
            title="skills"
          />
          <Button
            type="button"
            text="Delete"
            cancel={true}
            onClick={handleDeleteSkill}
          />
        </div>
      </Form>
    </>
  );
}

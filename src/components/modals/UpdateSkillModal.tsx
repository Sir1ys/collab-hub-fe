import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addSkill, deleteUserSkill } from "../../utils/users_api";
import { type Skill, type SelectOptions } from "../../types/types";
import { RootState } from "../../store/store";
import { formatSkills } from "./EditProjectModal";
import Form from "../Form";
import Button from "../Button";
import SelectElement from "../SelectElement";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  allSkills: Skill[];
  setAllSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  userSkills: Skill[];
  setUserSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

type NewSkill = {
  user_id: number;
  skill_id: number;
};

export default function UpdateSkill({
  setActive,
  allSkills,
  userSkills,
  setUserSkills,
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
    if (selectSkillToAdd?.value) {
      addSkill(user.user_id, +selectSkillToAdd.value)
        .then((response: NewSkill) => {
          const newSkill = allSkills.find(
            (skill) => skill.skill_id === response.skill_id
          );
          if (newSkill) {
            setUserSkills((prevSkills) => [...prevSkills, newSkill]);
          }
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
      setActive(false);
      setSelectSkillToAdd(undefined);
    }
  };

  const handleDeleteSkill = () => {
    if (selectSkillToDelete?.value) {
      deleteUserSkill(user.user_id, +selectSkillToDelete.value).then(() => {
        setUserSkills((prevSkills) =>
          prevSkills.filter(
            (skill) => skill.skill_id !== selectSkillToDelete?.value
          )
        );
        setActive(false);
        setSelectSkillToDelete(undefined);
      });
    }
  };

  useEffect(() => {
    setDeleteSKillOptions(formatSkills(userSkills));
    const newSkills = allSkills.filter((s) => {
      const userSkill = userSkills.find(
        (skill) => skill.skill_id === s.skill_id
      );
      if (userSkill === undefined) return s;
    });
    setAddSKillOptions(formatSkills(newSkills));
  }, [user, allSkills, userSkills]);

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

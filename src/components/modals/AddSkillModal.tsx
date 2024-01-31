import { useSelector } from "react-redux";
import { addSkill } from "../../utils/users_api";
import Button from "../Button";
import { type Skill, type SelectOptions } from "../../types/types";
import { RootState } from "../../store/store";
import Form from "../Form";
import SelectElement from "../SelectElement";
import { useEffect, useState } from "react";
import { getAllSkills } from "../../utils/skills_api";
import { formatSkills } from "./EditProjectModal";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

type NewSkill = {
  user_id: number;
  skill_id: number;
};

export default function AddSkill({ setActive, setSkills }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [allSkils, setAllSkills] = useState<Skill[]>([]);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [selectValue, setSelectValue] = useState<SelectOptions>();

  const handleAddSkill = () => {
    if (selectValue?.value) {
      addSkill(user.user_id, +selectValue.value)
        .then((response: NewSkill) => {
          const newSkill = allSkils.find(
            (skill) => skill.skill_id === response.skill_id
          );
          if (newSkill) {
            setSkills((prevSkills) => [...prevSkills, newSkill]);
          }
        })
        .catch((err) => console.log(err));
      setActive(false);
    }
  };

  useEffect(() => {
    getAllSkills()
      .then((skills: Skill[]) => {
        setAllSkills(skills);
        setOptions(formatSkills(skills));
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <>
      <Form className="w-full p-2 flex flex-col gap-4" onSave={handleAddSkill}>
        <h2 className="text-sky-800 font-semibold text-2xl p-2">
          Do you want to add a skill?
        </h2>
        <SelectElement
          value={selectValue}
          onChange={(o) => setSelectValue(o)}
          options={options}
          title="skills"
        />
        <Button text="Add" cancel={false} />
      </Form>
    </>
  );
}

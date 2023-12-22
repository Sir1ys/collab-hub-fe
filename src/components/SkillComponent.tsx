import { Skill } from "../types/types";

type Props = {
  skill: Skill;
};

export default function SkillComponent({ skill }: Props) {
  return (
    <li>
      <img
        className="w-14 h-14 rounded-lg p-1.5 bg-sky-600"
        src={skill.skill_avatar}
        alt={skill.skill_name + "icon"}
      />
    </li>
  );
}

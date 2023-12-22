import { useEffect, useState } from "react";
import { type Project, type Skill } from "../types/types";
import { getProjecSkill } from "../utils/projects_api";
import SkillComponent from "./Skill";

type Props = {
  project: Project;
};

export default function Project({ project }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getProjecSkill(project.project_id).then((skills: Skill[]) => {
      setSkills(skills);
    });
  }, []);

  return (
    <div className="p-2.5 bg-sky-100">
      <h2>{project.project_name}</h2>
      <ul>
        {skills.map((skill: Skill) => {
          return <SkillComponent />;
        })}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Project, type Skill } from "../types/types";
import { getProjectSkills } from "../utils/projects_api";
import SkillComponent from "./SkillComponent";
import { dateFromTimestamp } from "../utils/dates";

type Props = {
  project: Project;
  styles?: string;
};

export default function ProjectComponent({ project, styles }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    getProjectSkills(project.project_id).then((skills: Skill[]) => {
      setSkills(skills);
    });
  }, []);

  return (
    <article
      className={`p-3 bg-sky-100 flex md:flex-[1_0_47%] 2xl:flex-[1_0_31%] flex flex-col gap-3 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl transition ${styles}`}
      onClick={() => {
        navigate(`/projects/${project.project_id}`, { state: project });
      }}
    >
      <h2 className="text-sky-800 text-xl font-medium text-center">
        {project.project_name}
      </h2>
      <p className="text-right text-sky-600">
        {`${dateFromTimestamp(project.project_created_at.toString())}`}
      </p>
      <h3 className="text-sky-600 text-lg font-medium">
        Description:{" "}
        <p className="text-sky-400 line-clamp-3">
          {project.project_description}
        </p>
      </h3>
      <h3 className="text-sky-600 text-lg font-medium">Skills required: </h3>
      <ul className="flex gap-2 items-center justify-start flex-wrap">
        {skills.map((skill: Skill, index: number) => {
          return <SkillComponent key={index} skill={skill} />;
        })}
      </ul>
      <p className="text-sky-600 text-lg font-medium">
        People required: {project.required_members}
      </p>
    </article>
  );
}

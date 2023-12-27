import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dateFromTimestamp } from "../../utils/dates";
import { Project, Skill, Status } from "../../types/types";
import { getProjectSkills, getProjectStatus } from "../../utils/projects_api";
import SkillComponent from "../SkillComponent";

type LocationState = {
  state: Project;
};

export default function ProjectPage() {
  const location = useLocation();
  const { state: project } = location as LocationState;
  const [skills, setSkills] = useState<Skill[]>([]);
  const [status, setStatus] = useState<Status>("open");

  useEffect(() => {
    getProjectSkills(project.project_id).then((skills: Skill[]) => {
      setSkills(skills);
    });
    getProjectStatus(project.project_id).then((status: Status) => {
      setStatus(status);
    });
  }, []);

  return (
    <article className="m-5 p-3 bg-sky-100 flex flex-col gap-3">
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

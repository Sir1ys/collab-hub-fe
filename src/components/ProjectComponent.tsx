import { useEffect, useState } from "react";
import { type Project, type Skill } from "../types/types";
import { getProjecSkill } from "../utils/projects_api";
import SkillComponent from "./SkillComponent";

type Props = {
  project: Project;
};

export default function ProjectComponent({ project }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getProjecSkill(project.project_id).then((skills: Skill[]) => {
      setSkills(skills);
    });
  }, []);

  return (
    <div className="p-2.5 bg-sky-100 flex-[1_0_35%] md:flex-[1_0_21%] flex flex-col gap-3 rounded-xl border-2 border-sky-500 cursor-pointer">
      <h2 className="text-sky-800 text-xl font-medium text-center">
        {project.project_name}
      </h2>
      <h3 className="text-sky-600 text-lg font-medium">
        Description:{" "}
        <p className="text-sky-400 line-clamp-3">
          Seeking talented developers eager to join a transformative journey!
          Our Android app venture is in search of skilled tech enthusiasts ready
          to shape the next big thing in travel networking, where your expertise
          will craft an innovative platform connecting wanderlust-driven
          individuals, revolutionizing how we explore the world—let's build this
          adventure together!
        </p>
      </h3>
      <h3 className="text-sky-600 text-lg font-medium">Skills required: </h3>
      <ul className="flex gap-2 items-center justify-start flex-wrap">
        {skills.map((skill: Skill) => {
          return <SkillComponent skill={skill} />;
        })}
      </ul>
    </div>
  );
}

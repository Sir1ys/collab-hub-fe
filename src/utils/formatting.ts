import { type Skill, StatusObject } from "../types/types";

export const formatSkills = (skills: Skill[]) => {
  return skills.map((skill) => ({
    label: skill.skill_name,
    value: skill.skill_id,
  }));
};

export const formatStatuses = (statuses: StatusObject[]) => {
  return statuses.map((status) => ({
    label: status.status_name,
    value: status.status_id,
  }));
};

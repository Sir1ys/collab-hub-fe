import axios from "axios";

const skillsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/skills",
});

export const getAllSkills = () => {
  return skillsAPI.get(`/`).then((response) => {
    return response.data.skills;
  });
};

export const getSkillsById = (user_id: any) => {
  return skillsAPI.get(`/${user_id}`).then((response) => {
    return response.data.skills;
  });
};

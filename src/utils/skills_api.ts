import axios from "axios";

const skillsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/skills",
});

export const getAllSkills = () => {
  return skillsAPI.get(`/`).then((response) => {
    return response.data.skills;
  });
};

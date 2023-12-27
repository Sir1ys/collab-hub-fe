import axios from "axios";

const projectsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/projects",
});

export const getProjects = () => {
  return projectsAPI.get(`/`).then((response) => {
    return response.data.projects;
  });
};

export const getProjecSkill = (projectId: number) => {
  return projectsAPI.get(`${projectId}/skills`).then((response) => {
    return response.data.skills;
  });
};

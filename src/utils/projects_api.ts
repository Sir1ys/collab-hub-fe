import axios from "axios";

const projectsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/projects",
});

export const getProjects = () => {
  return projectsAPI.get(`/`).then((response) => {
    return response.data.projects;
  });
};

export const getProjectSkills = (projectId: number) => {
  return projectsAPI.get(`${projectId}/skills`).then((response) => {
    return response.data.skills;
  });
};

export const getProjectStatus = (prjectId: number) => {
  return projectsAPI.get(`${prjectId}/status`).then((response) => {
    return response.data.status;
  });
};

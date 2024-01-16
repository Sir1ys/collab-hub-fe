import axios from "axios";

const projectsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/projects",
});

export const getProjects = () => {
  return projectsAPI.get(`/`).then((response) => {
    return response.data.projects;
  });
};

export const createProject = (project: any) => {
  return projectsAPI.post("/", project).then((response) => {
    return response.data.project;
  });
};

export const getProjectSkills = (projectId: number) => {
  return projectsAPI.get(`${projectId}/skills`).then((response) => {
    return response.data.skills;
  });
};

export const getProjectStatus = (projectId: number) => {
  return projectsAPI.get(`${projectId}/status`).then((response) => {
    return response.data.status;
  });
};

export const getMemberRequestsByProjectId = (projectId: number) => {
  return projectsAPI
    .get(`${projectId}/member-request`)
    .then((response) => response.data.memberRequests);
};

export const postMemberRequest = (projectId: number, userId: any) => {
  return projectsAPI
    .post(`${projectId}/member-request`, userId)
    .then((response) => response.data);
};

export const deleteMemberRequest = (projectId: number, userId: any) => {
  return projectsAPI.delete(`${projectId}/member-request/${userId}`);
};

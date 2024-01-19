import axios from "axios";
import { type CreatedProject, type UpdatedProject } from "../types/types";

const projectsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/projects",
});

export const getProjects = () => {
  return projectsAPI.get(`/`).then((response) => {
    return response.data.projects;
  });
};

export const createProject = (newProject: CreatedProject) => {
  return projectsAPI.post("/", { project: newProject }).then((response) => {
    return response.data.project;
  });
};

export const updateProject = (
  projectId: number,
  updatedProject: UpdatedProject
) => {
  return projectsAPI
    .patch(`/${projectId}`, { project: updatedProject })
    .then((response) => {
      return response.data.project;
    });
};

export const deleteProject = (projectId: number) => {
  return projectsAPI.delete(`/${projectId}`);
};

export const getProjectSkills = (projectId: number) => {
  return projectsAPI.get(`${projectId}/skills`).then((response) => {
    return response.data.skills;
  });
};

export const addProjectSkill = (projectId: number, skillName: string) => {
  return projectsAPI.post(`${projectId}`, { skill: { skill_name: skillName } });
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

export const postMemberRequest = (projectId: number, userId: number) => {
  return projectsAPI
    .post(`${projectId}/member-request`, {
      memberRequest: {
        user_id: userId,
      },
    })
    .then((response) => response.data);
};

export const deleteMemberRequest = (projectId: number, userId: number) => {
  return projectsAPI.delete(`${projectId}/member-request/${userId}`);
};

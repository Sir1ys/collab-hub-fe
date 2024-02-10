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
  return projectsAPI
    .post(`${projectId}/skills`, {
      skill: { skill_name: skillName },
    })
    .then((response) => {
      return response.data;
    });
};

export const deleteProjectSkill = (projectId: number, skillId: string) => {
  return projectsAPI.delete(`${projectId}/skills/${skillId}`);
};

export const getProjectStatus = (projectId: number) => {
  return projectsAPI.get(`${projectId}/status`).then((response) => {
    return response.data.status;
  });
};

export const postProjectStatus = (projectId: number, projectStatus: string) => {
  return projectsAPI.post(`${projectId}/status`, {
    status: { status: projectStatus },
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

export const getProjectMembers = (projectId: number) => {
  return projectsAPI
    .get(`${projectId}/members`)
    .then((response) => response.data.members);
};

export const postMember = (projectId: number, userId: number) => {
  return projectsAPI.post(`${projectId}/members`, {
    member: {
      user_id: userId,
      decision: "accepted",
      feedback: "Great addition to the team",
    },
  });
};

export const deleteProjectMember = (projectId: number, user_id: number) => {
  return projectsAPI.delete(`/${projectId}/members/${user_id}`);
};

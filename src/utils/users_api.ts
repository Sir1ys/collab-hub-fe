import axios from "axios";
import { CreatedUser } from "../types/types";
import { UserData } from "../components/SignUpForm";

const usersAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/users",
});

export const getAllUsers = () => {
  return usersAPI.get(`/`).then((response) => {
    return response.data.skills;
  });
};
export const getUserById = (user_id: number) => {
  return usersAPI.get(`/${user_id}`).then((response) => {
    return response.data.user;
  });
};

export const getUserByEmail = (email: string) => {
  return usersAPI.get(`/signin/${email}`).then((response) => {
    return response.data.user;
  });
};

export const createUser = (user: UserData) => {
  return usersAPI.post(`/`, { user }).then((response) => {
    return response.data.user;
  });
};

export const getProjectsCreatedByUser = (userId: number) => {
  return usersAPI
    .get(`${userId}/my-projects`)
    .then((response) => response.data.projects);
};

export const getProjectsParticipatedByUser = (userId: number) => {
  return usersAPI
    .get(`${userId}/project-associate`)
    .then((response) => response.data.projects);
};

export const getProjectsRequestedByUser = (userId: number) => {
  return usersAPI
    .get(`${userId}/my-requests`)
    .then((response) => response.data.projects);
};
export const getSkillsById = (user_id: number) => {
  return usersAPI.get(`/${user_id}/skills`).then((response) => {
    return response.data.skills;
  });
};

export const addUserSkill = (user_id: number, skill_id: number) => {
  return usersAPI
    .post(`/${user_id}/skills`, { skill_id: skill_id })
    .then((response) => {
      return response.data.skill;
    });
};

export const patchUser = (user_id: number, updatedUser: CreatedUser) => {
  return usersAPI
    .patch(`/${user_id}`, { user: updatedUser })
    .then((response) => {
      return response.data.user;
    });
};

export const deleteUserSkill = (user_id: number, skill_id: number) => {
  return usersAPI.delete(`/${user_id}/skills/${skill_id}`).then((response) => {
    return response.data.skill;
  });
};

export const deleteUser = (user_id: number) => {
  return usersAPI.delete(`/${user_id}`).then((response) => {
    return response;
  });
};

import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/users",
});

export const getAllUsers = () => {
  return usersAPI.get(`/`).then((response) => {
    return response.data.skills;
  });
};
export const getUserById = (user_id: any) => {
  return usersAPI.get(`/${user_id}`).then((response) => {
    return response.data.skills;
  });
};

export const getUserByEmail = (email: string) => {
  return usersAPI.get(`/signin/${email}`).then((response) => {
    return response.data.user;
  });
};

export const createUser = (user: any) => {
  return usersAPI.post(`/`, user).then((response) => {
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

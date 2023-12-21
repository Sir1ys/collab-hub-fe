import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/users",
});

export const getUsers = () => {
  return usersAPI.get(`/`).then((response) => {
    return response.data.users;
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

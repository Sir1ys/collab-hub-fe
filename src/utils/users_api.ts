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

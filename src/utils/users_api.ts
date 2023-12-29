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

export const getSkillsById = (user_id: any) => {
  return usersAPI.get(`/${user_id}/skills`).then((response) => {
    return response.data.skills;
  });
};

export const addSkill = (user_id: any, skill: any) => {
  return usersAPI.post(`/${user_id}/skills`, skill).then((response) => {
    console.log(response, " <RESPONSE")
    return response.data.skill;
  });
}

export const patchUser = (user_id: any, user: any) => {
  return usersAPI.patch(`/${user_id}`, user).then((response) => {
    return response.data.user;
  });
}

export const deleteUserSkill = (user_id: number, skill_id: number) => {
  return usersAPI.delete(`/${user_id}/skills/${skill_id}`).then((response) => {
    return response.data.skill;
  });
}

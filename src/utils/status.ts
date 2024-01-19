import axios from "axios";

const statusAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/status",
});

export const getStatuses = () => {
  return statusAPI.get(`/`).then((response) => response.data.status);
};

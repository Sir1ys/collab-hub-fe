import axios from "axios";

const projectsAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/projects",
});

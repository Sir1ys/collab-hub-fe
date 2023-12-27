import axios from "axios";

const statusAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/status",
});

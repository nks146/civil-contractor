import api from "../api/axios";

export const getProjects = async () => {
  const res = await api.get("/api/project");
  return res.data;
};

export const createProject = async (payload) => {
  return api.post("/api/project/add", payload);
};

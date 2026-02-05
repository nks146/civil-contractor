import api from "../api/axios";

export const getProjects = async () => {
  const res = await api.get("/api/project");
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(`/api/project/${id}`);
  return res.data;
};

export const createProject = async (payload) => {
  return api.post("/api/project", payload);
};

export const updateProject = async (id, payload) => {
  return api.put(`/api/project/${id}`, payload);
};

export const deleteProject = async (id) => {
  return api.delete(`/api/project/${id}`);
};

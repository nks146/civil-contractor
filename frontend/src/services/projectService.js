import api from "../api/axios";

export const getProjects = async () => {
  const res = await api.get("/api/project");
  return res.data;
};

export const getRootProjects = async () => {
  const res = await api.get("/api/project/root-projects");
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(`/api/project/${id}`);
  return res.data;
};

export const createProject = async (payload) => {
  return api.post("/api/project/add", payload);
};

export const updateProject = async (id, payload) => {
  return api.put(`/api/project/${id}/edit`, payload);
};

export const deleteProject = async (id) => {
  return api.delete(`/api/project/${id}/delete`);
};

/* ---------- POSTS ---------- */
export const getLatestPost = async (projectId) => {
  const res = await api.get(`/api/project/${projectId}/latest-post`); 
  return res.data;
};

export const getProjectPosts = async (projectId) => {
  const res = await api.get(`/api/project/${projectId}/get-all-posts`);
  return res.data;
};

/* ---------- WORKERS ---------- */
export const getProjectWorkers = async (projectId) => {
  return api.get(`/api/project/${projectId}/workers`);
}

/* ---------- MATERIALS ---------- */
export const getProjectUsedMaterials = async (projectId) => {
  return api.get(`/api/project/${projectId}/used-materials`);
}

/* ---------- EXPENSES ---------- */
export const getProjectExpenses = async (projectId) => {
  return api.get(`/api/project/${projectId}/other-expenses`);
}

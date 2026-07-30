import api from "../api/axios";

/*-------------Active Projects ----------------*/
export const getProjects = async () => {
  const res = await api.get("/api/project/active-projects");
  return res.data;
}
import api from "../api/axios";

/*-------------Active Projects ----------------*/
export const getProjects = async () => {
  const res = await api.get("/api/attendance/active-projects");
  return res.data;
}

/*-------------Attendance ----------------*/  
export const getAttendance = async (projectId, attendanceDate) => {
  const res = await api.get(`/api/attendance/project/${projectId}/working-date/${attendanceDate}`);
  return res.data;
}

/*-------------Attendance ----------------*/
export const saveAttendance = async (payload) => { 
  return api.post("/api/attendance/save-attendance", payload);
};

/*-------------get single attendance by id ----------------*/
export const getAttendanceById = async (id) => {
  const res = await api.get(`/api/attendance/${id}`);
  return res.data;
}

/*-------------update attendance by id ----------------*/
export const updateAttendance = async (id, payload) => {
  return api.put(`/api/attendance/${id}`, payload);
};

/*-------------total labour cost by project id ----------------*/
export const getTotalLabourCost = async (projectId) => {
  const res = await api.get(`/api/attendance/project/${projectId}/total-labour-cost`);
  return res.data;
};
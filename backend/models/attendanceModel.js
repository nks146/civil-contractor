const pool = require('../config/db');

// Get Active projects (status != 'Deleted' and status != 'Completed') for the logged-in user
exports.getAllActiveProjects = async (userId) => {
  const [rows] = await pool.query(
    `SELECT id, project_name, location, start_date, status
     FROM projects
     WHERE user_id = ? AND status != ? AND status != ?
     ORDER BY created_on DESC`,
    [userId, 'Deleted', 'Completed']
  );
  return rows;
};

// 1. Validate project ownership
const validateProjectOwnership = async (userId, projectId) => {
    const query = `SELECT id FROM projects WHERE id = ? AND user_id = ?`;
    const [rows] = await pool.query(query, [projectId, userId]);
    return rows.length > 0;
};

// Step 1
// Try to load already saved attendance
async function getSavedAttendance(projectId, attendanceDate) {
    try {
        const savedAttendance = `SELECT wa.worker_id, w.worker_name, w.expertise, wa.rate_per_day, wa.attendance, wa.comment FROM worker_attendance wa INNER JOIN workers w ON wa.worker_id = w.id WHERE wa.project_id = ? AND wa.working_date = ? ORDER BY w.worker_name`;
        const [attendanceRows] = await pool.query(savedAttendance, [projectId, attendanceDate]);
        return attendanceRows;
    } catch (error) {
        throw error;
    }
}

// Generate default attendance
async function generateDefaultAttendance(projectId) {
    try {
        const query = `SELECT wp.worker_id, w.worker_name, w.expertise, wp.rate_per_day,'FULL' AS attendance,'' AS comment FROM worker_projects wp INNER JOIN workers w ON wp.worker_id = w.id WHERE wp.project_id = ? AND wp.status = 'Assigned' ORDER BY w.worker_name`;
        const [defaultAttendanceRows] = await pool.query(query, [projectId]);
        return defaultAttendanceRows;
    } catch (error) {
        throw error;
    }
}

exports.getAllWorkerAttendanceByDate = async (userId, projectId, attendanceDate) => {
    // Validate project ownership
    const isOwner = await validateProjectOwnership(userId, projectId);
    if (!isOwner) {
        return {
            isSaved: false,
            status: "Unauthorized",
            rows: [],
            message: "You are not authorized to access this project's attendance."
        };
    }

    // Try to load already saved attendance
    const attendanceRows = await getSavedAttendance(projectId, attendanceDate);

    // Attendance already saved
        if (attendanceRows.length > 0) {
            return {
                isSaved: true,
                status: "Saved",
                rows: attendanceRows
            };
        }

     // Attendance not found
     const today = new Date().toISOString().split("T")[0];

     // Past date
    // Do NOT generate attendance

    /*if (attendanceDate < today) {
        return {
            isSaved: false,
            status: "Not Recorded",
            rows: [],
            message: "Attendance not found."
        };
    }*/

    // Generate default attendance
    const defaultAttendanceRows = await generateDefaultAttendance(projectId);
    return {
        isSaved: false,
        status: "Not Recorded",
        rows: defaultAttendanceRows,
        message: "Attendance not found. Default attendance generated."
    };
};
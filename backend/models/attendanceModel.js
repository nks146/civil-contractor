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
        const savedAttendance = `SELECT wa.worker_id, w.worker_name, w.expertise, wa.rate_per_day, wa.attendance_type, wa.comment FROM worker_attendance wa INNER JOIN workers w ON wa.worker_id = w.id WHERE wa.project_id = ? AND wa.working_date = ? ORDER BY w.worker_name`;
        const [attendanceRows] = await pool.query(savedAttendance, [projectId, attendanceDate]);
        return attendanceRows;
    } catch (error) {
        throw error;
    }
}

// Generate default attendance
async function generateDefaultAttendance(projectId) {
    try {
        const query = `SELECT wp.worker_id, w.worker_name, w.expertise, wp.rate_per_day,'FULL' AS attendance_type,'' AS comment FROM worker_projects wp INNER JOIN workers w ON wp.worker_id = w.id WHERE wp.project_id = ? AND wp.status = 'Assigned' ORDER BY w.worker_name`;
        const [defaultAttendanceRows] = await pool.query(query, [projectId]);
        return defaultAttendanceRows;
    } catch (error) {
        throw error;
    }
}

// Validate assigned worker Ids for the project
const validateAssignedWorkerIds = async (projectId, workerIds) => {
    const query = `SELECT worker_id FROM worker_projects WHERE project_id = ? AND worker_id IN (?) AND status = 'Assigned'`;
    const [rows] = await pool.query(query, [projectId, workerIds]);
    return rows.map(row => row.worker_id);
};

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
        status: "Pending Attendance Entry",
        rows: defaultAttendanceRows,
        message: "Attendance not found. Default attendance generated."
    };
};

// Get all assigned workers for a project
const assignedWorkersForProject = async (projectId) => {
    const query = `SELECT worker_id FROM worker_projects WHERE project_id = ? AND status = 'Assigned' ORDER BY worker_id`;
    const [rows] = await pool.query(query, [projectId]);
    return rows;
};

// Save worker attendance   
exports.saveWorkerAttendance = async (userId, projectId, workingDate, attendanceData) => {
    // Validate project ownership
    const isOwner = await validateProjectOwnership(userId, projectId);
    if (!isOwner) {
        return {
            success: false,
            message: "You are not authorized to save attendance for this project."
        };
    }

    // Validate assigned worker Ids
    const assignedWorkers = await assignedWorkersForProject(projectId);
    const assignedWorkerIds = new Set(assignedWorkers.map(worker => worker.worker_id)); 
    for (const record of attendanceData) {
        if (!assignedWorkerIds.has(record.workerId)) {
            return {
                success: false,
                message: `Worker with ID ${record.workerId} is not assigned to this project.`
            };
        }
    }

    // Save attendance 
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        for (const worker of attendanceData) {
            await connection.query(
                `INSERT INTO worker_attendance (worker_id, project_id, working_date, attendance_type, rate_per_day, comment, created_on, updated_on, created_by, updated_by)
                 VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`, [worker.workerId, projectId, workingDate, worker.attendanceType, worker.ratePerDay, worker.comment || "", userId, userId]);
        }
        await connection.commit();
        return {
            success: true,
            message: "Attendance saved successfully."
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
const { validationResult } = require('express-validator');
const { getAllActiveProjects, getAllWorkerAttendanceByDate, saveWorkerAttendance } = require('../models/attendanceModel');

// Get all active projects for the logged-in user
exports.getAllActiveProjects = async (req, res) => {
  try {
    const projects = await getAllActiveProjects(req.user.id);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching active projects',
      error: err.message
    });
  }
};

exports.getAllWorkerAttendanceByDate = async (req, res) => { console.log(req.body);
    try {
        const userId = req.user.id;         
        const { projectId, attendanceDate } = req.body;
        if (!projectId || !attendanceDate) {
            return res.status(400).json({
                success: false,
                message: "Project and Attendance Date are required."
            });
        }

        const today = new Date().toISOString().split("T")[0];
        // Future date validation
        if (attendanceDate > today) {
            return res.status(400).json({
                success: false,
                message: "Future attendance cannot be loaded."
            });
        }

        const attendance = await getAllWorkerAttendanceByDate(
                userId,
                projectId,
                attendanceDate
            );

        return res.status(200).json({
            success: true,
            ...attendance
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message
        });

    }
};

exports.saveWorkerAttendance = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId, workingDate, attendanceData } = req.body;

        if (!projectId || !workingDate || !attendanceData) {
            return res.status(400).json({
                success: false,
                message: "Project, Working Date, and Attendance Data are required."
            });
        }

        const result = await saveWorkerAttendance(userId, projectId, workingDate, attendanceData);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message || "Failed to save attendance."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attendance saved successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving attendance.",
            error: error.message
        });
    }
};
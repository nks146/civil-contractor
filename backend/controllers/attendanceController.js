const { validationResult } = require('express-validator');
const { getAllActiveProjects, getAllWorkerAttendanceByDate, saveWorkerAttendance, getAttendanceById, editWorkerAttendance, getTotalLabourCost } = require('../models/attendanceModel');

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

exports.getAllWorkerAttendanceByDate = async (req, res) => { 
    try {
        const userId = req.user.id;                 
        const { projectId, workingDate } = req.params;
        if (!projectId || !workingDate) {
            return res.status(400).json({
                success: false,
                message: "Project and Working Date are required."
            });
        }

        const today = new Date().toISOString().split("T")[0];
        // Future date validation
        if (workingDate > today) {
            return res.status(400).json({
                success: false,
                message: "Future attendance cannot be loaded."
            });
        }

        const attendance = await getAllWorkerAttendanceByDate(
                userId,
                projectId,
                workingDate
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

// Get attendance by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const userId = req.user.id;
        const attendanceId = req.params.attendanceId;

        if (!attendanceId) {
            return res.status(400).json({
                success: false,
                message: "Attendance ID is required."
            });
        }

        const attendance = await getAttendanceById(userId, attendanceId);
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found."
            });
        }

        return res.status(200).json({
            success: true,
            attendance
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching attendance.",
            error: error.message
        });
    }
};

//Edit worker attendance
exports.editWorkerAttendance = async (req, res) => { console.log("Editing worker attendance: ", req.body);
    try {
        const userId = req.user.id;
        const attendanceId = req.params.attendanceId;
        const { attendanceType, comment } = req.body;

        if (!attendanceId || !attendanceType) {
            return res.status(400).json({
                success: false,
                message: "Attendance ID and Attendance Type are required."
            });
        }

        const result = await editWorkerAttendance(userId, attendanceId, attendanceType, comment);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message || "Failed to edit attendance."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attendance updated successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while editing attendance.",
            error: error.message
        });
    }
};

// Get total labour cost for a project
exports.getTotalLabourCost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required."
            });
        }

        const totalCost = await getTotalLabourCost(projectId);
        return res.status(200).json({
            success: true,
            totalCost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while calculating total labour cost.",
            error: error.message
        });
    }
};
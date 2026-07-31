const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllActiveProjects, getAllWorkerAttendanceByDate, saveWorkerAttendance } = require('../controllers/attendanceController');


router.use(auth);

router.get('/active-projects', getAllActiveProjects);
router.post('/get-attendance-by-date', getAllWorkerAttendanceByDate);
router.post('/save-attendance', saveWorkerAttendance);
module.exports = router;
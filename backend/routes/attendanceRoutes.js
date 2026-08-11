const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllActiveProjects, getAllWorkerAttendanceByDate, saveWorkerAttendance, getAttendanceById, editWorkerAttendance, getTotalLabourCost } = require('../controllers/attendanceController');


router.use(auth);

router.get('/active-projects', getAllActiveProjects);
router.get('/project/:projectId/working-date/:workingDate', getAllWorkerAttendanceByDate);
router.post('/save-attendance', saveWorkerAttendance);
router.get('/:attendanceId', getAttendanceById);
router.put('/:attendanceId', editWorkerAttendance);
router.get('/project/:projectId/total-labour-cost', getTotalLabourCost);
module.exports = router;
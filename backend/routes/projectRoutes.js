const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addProject,allProject,getProjectDetails,rootProjects,postOnProject,addMorePostImages,
        deleteImages, editProject, editPostContent, 
        getAssignedWorkersByProjectController, addWorkerAttendanceController } = require('../controllers/projectController');

router.use(auth);

router.get('/', allProject);
router.get('/root-projects', rootProjects);
router.post('/add', addProject);
router.get('/:id', getProjectDetails);
router.put('/:id/edit', editProject);
router.post('/:id/post', postOnProject);
//router.post('/:id/post/add-images', addMorePostImages);
//router.delete('/image/:imageId', deleteSingleImage);
router.delete('/images', deleteImages);
router.post('/add-images/post/:id', addMorePostImages);
router.put('/post/:id/edit', editPostContent);
router.get('/:project_id/workers', getAssignedWorkersByProjectController);
router.post('/:project_id/workers_attendance', addWorkerAttendanceController);

module.exports = router;
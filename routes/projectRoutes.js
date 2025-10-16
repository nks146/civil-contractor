const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addProject,allProject,postOnProject,addMorePostImages,
        deleteImages, editProject, editPostContent, 
        getAssignedWorkersByProjectController, addWorkerAttendanceController } = require('../controllers/projectController');

router.use(auth);

router.get('/', allProject);
router.post('/add', addProject);
router.post('/:id/post', postOnProject);
//router.post('/:id/post/add-images', addMorePostImages);
//router.delete('/image/:imageId', deleteSingleImage);
router.delete('/images', deleteImages);
router.put('/:id/edit', editProject);
router.post('/add-images/post/:id', addMorePostImages);
router.put('/post/:id/edit', editPostContent);
router.get('/:project_id/workers', getAssignedWorkersByProjectController);
router.post('/:project_id/workers_attendance', addWorkerAttendanceController);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addProject,allProject,getProjectDetails,deleteProject,rootProjects,postOnProject,addMorePostImages,
        deleteImages, editProject, editPostContent, 
        getAssignedWorkersByProjectController, addWorkerAttendanceController,getAllPostsByProject, addOtherExpenses, editOtherExpenses, getOtherExpenses, getOtherExpensesById, getAllExpensesName } = require('../controllers/projectController');

router.use(auth);

router.get('/', allProject);
router.get('/root-projects', rootProjects);
router.post('/add', addProject);
router.get('/:id', getProjectDetails);
router.put('/:id/edit', editProject);
router.delete('/:id/delete', deleteProject);
router.post('/:id/post', postOnProject);
router.get('/:id/get-all-posts', getAllPostsByProject);
//router.post('/:id/post/add-images', addMorePostImages);
//router.delete('/image/:imageId', deleteSingleImage);
router.delete('/images', deleteImages);
router.post('/add-images/post/:id', addMorePostImages);
router.put('/post/:id/edit', editPostContent);
router.get('/:project_id/workers', getAssignedWorkersByProjectController);
router.post('/:project_id/workers_attendance', addWorkerAttendanceController);
router.post('/:project_id/add-other-expenses', addOtherExpenses);
router.get('/:project_id/other-expenses', getOtherExpenses);
router.get('/other-expenses/expenses-name', getAllExpensesName); //for auto suggestion of expenses name in frontend
router.get('/other-expenses/expense-id/:expense_id', getOtherExpensesById);
router.put('/edit-other-expenses/:expense_id', editOtherExpenses);



module.exports = router;
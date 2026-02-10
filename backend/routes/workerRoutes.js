const express = require('express');
const router = express.Router();
const { addWorkerController, editWorkerController, deleteWorkerController, 
    workerListController, assignProjectToWorkerController,
    deleteAssignedProjectFromWorkerController } = require('../controllers/workerController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', workerListController);
router.post('/add', addWorkerController);
router.put('/:id/edit', editWorkerController);
router.delete('/:id', deleteWorkerController);
router.post('/:id/assign-project', assignProjectToWorkerController);
router.delete('/:worker_id/assignment/:assignment_id', deleteAssignedProjectFromWorkerController);

module.exports = router;
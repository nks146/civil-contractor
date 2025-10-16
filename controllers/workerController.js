const { validationResult } = require('express-validator');
const { addWorker, editWorker, deleteWorker, getWorkerlist, assignProjectToWorker, deleteAssignedProjectFromWorker } = require('../models/workerModel');

// Validation helpers
const isValidStatus = (status) => ['Active', 'Inactive', 'Engaged'].includes(status);

exports.addWorkerController = async (req, res) => {
  const { user_id, worker_name, address, contact, status, base_rate, expertise } = req.body;
  if (!user_id || !worker_name || !status) {
    return res.status(400).json({ message: 'user_id, worker_name, and status are required' });
  }
  if (!isValidStatus(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  if (contact && !/^\d{10,13}$/.test(contact)) {
    return res.status(400).json({ message: 'Contact must be 10-13 digits' });
  }
  try {
    const now = new Date();
    const worker = {
      user_id,
      worker_name,
      address,
      contact,
      status,
      base_rate,
      expertise,
      created_on: now,
      updated_on: now
    };
    const workerId = await addWorker(worker);
    res.status(201).json({ message: 'Worker added successfully', workerId });
  } catch (err) {
    res.status(500).json({ message: 'Error adding worker', error: err.message });
  }
};

exports.editWorkerController = async (req, res) => {
  const { id } = req.params;
  const { worker_name, address, contact, status, base_rate, expertise } = req.body;
  if (!worker_name || !status) {
    return res.status(400).json({ message: 'worker_name and status are required' });
  }
  if (!isValidStatus(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  if (contact && !/^\d{10,13}$/.test(contact)) {
    return res.status(400).json({ message: 'Contact must be 10-13 digits' });
  }
  try {
    const worker = {
      worker_name,
      address,
      contact,
      status,
      base_rate,
      expertise,
      updated_on: new Date()
    };
    await editWorker(id, worker);
    res.status(200).json({ message: 'Worker updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating worker', error: err.message });
  }
};

exports.deleteWorkerController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteWorker(id);
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting worker', error: err.message });
  }
};

// Get all projects
exports.workerListController = async (req, res) => {
  const userId = req.user.id; 
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const workers = await getWorkerlist(userId);
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

// Assign project to worker
exports.assignProjectToWorkerController = async (req, res) => {
  const { id } = req.params; // worker ID
  const { project_id,rate_per_day,work_start_date } = req.body;
  if (!project_id||!rate_per_day||!work_start_date) {
    return res.status(400).json({ message: 'project id, rate per day, work start date are required' });
  }
  try {
    // Assuming a function assignProjectToWorker exists in the model
    const newAssign = {
      worker_id: id,
      project_id,
      rate_per_day,
      work_start_date: new Date(work_start_date),
      assigned_on: new Date()
    }
    await assignProjectToWorker(newAssign);
    res.status(200).json({ message: 'Project assigned to worker successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning project', error: err.message });
  }
};

// Delete assigned project from worker and update status to Active
exports.deleteAssignedProjectFromWorkerController = async (req, res) => {
  const { worker_id, assignment_id } = req.params;
  if (!worker_id || !assignment_id) {
    return res.status(400).json({ message: 'worker id and assignment id are required' });
  }
  try {
    await deleteAssignedProjectFromWorker(worker_id, assignment_id);
    res.status(200).json({ message: 'Project assignment deleted and worker status updated to Active' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting assignment', error: err.message });
  }
};


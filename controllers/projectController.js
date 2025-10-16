const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAllProjects, createProject, updateProject, 
        getProjectById, createPost, savePostImages, 
        deleteMultipleImages, deleteImage, getImageById,
        getImageByIds, updatePostContent, getAssignedWorkersByProject,
        addWorkerAttendance } = require('../models/projectModel');
const { validationResult } = require('express-validator');
const { toDDMMYYYY,formatDate } = require('../helpers/dateFormateHelper');

// Get all projects
exports.allProject = async (req, res) => {
  const userId = req.user.id;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const projects = await getAllProjects(userId);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

// Create a new project
exports.addProject = async (req, res) => { 
    const userId = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try { 
    const { project_name, parent_project, location, start_date, end_date, status, hold_reason } = req.body;
    if (!project_name || !location || !start_date ) {
      return res.status(400).json({ message: 'Project Name, Location, and Start Date are required' });
    }
    const newProject = {
      user_id: userId,
      project_name,
      parent_project: parent_project || 0,
      location,
      start_date: formatDate(start_date),
      end_date: end_date,
      status: status || 'Pending',
      hold_reason: hold_reason || null,
      created_on: new Date(),
      updated_on: new Date()
    };
    const createdProject = await createProject(newProject);
    res.status(201).json({ message: 'Project created successfully', projectId: createdProject.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //const dir = '../public/uploads/images/projects';
    const dir = path.join(__dirname, '../public/uploads/projects');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).array('images', 10); // up to 10 images

console.log("Upload Middleware:", upload);
exports.postOnProject = (req, res) => { 
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const projectId = req.params.id; 
    try { 
      const { post_comment } = req.body; // <-- Now req.body is populated!
      
      if (!post_comment) {
        return res.status(400).json({ message: 'please write some text in comment section' });
      }
      const newPost = {
        project_id: projectId,
        post_comment: post_comment,
        created_on: new Date(),
        updated_on: new Date()
      };
      const createdPost = await createPost(newPost);
      const postId = createdPost.insertId;
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const imagePaths = req.files.map(file => file.path);
      const created_on = new Date();
      const updated_on = new Date();
      await savePostImages(postId, imagePaths, created_on, updated_on);
      res.status(200).json({  message: 'Post created successfully', postId: postId });
    } catch (err) {
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  });
};

exports.addMorePostImages = (req, res) => { 
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }
    const postId = req.params.id; 
    //const { images } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
    // Save file paths to DB
    const imagePaths = req.files.map(file => file.path);
    const created_on = new Date();
    const updated_on = new Date();
    try {
      await savePostImages(postId, imagePaths, created_on, updated_on);
      res.status(200).json({ message: 'Images uploaded successfully', images: imagePaths });
    } catch (dbErr) {
      res.status(500).json({ message: 'Error saving image info', error: dbErr.message });
    }
  });
};

// Edit project details
exports.editProject = async (req, res) => {
  const projectId = req.params.id;
  const { project_name, parent_project, location, start_date, end_date, status, hold_reason } = req.body;
  if (!project_name || !location || !start_date) {
    return res.status(400).json({ message: 'Project Name, Location, and Start Date are required' });
  }
  try {
    const updated_on = new Date();
    const updatedProject = {
      project_name,
      parent_project: parent_project || 0,
      location,
      start_date,
      end_date,
      status,
      hold_reason,
      updated_on
    };
    await updateProject(projectId, updatedProject);
    const project = await getProjectById(projectId);
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

// particular project by id
exports.getProjectDetails = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Format dates to 'DD-MM-YYYY'
    project.start_date = toDDMMYYYY(project.start_date);
    project.end_date = toDDMMYYYY(project.end_date);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project details', error: err.message });
  }
};

// Delete a single image
/*const deleteSingleImage = async (req, res) => {
  const { imageId } = req.params; 
  try {
    // Optionally: Get image path from DB and delete file from disk
    const image = await getImageById(imageId);
    console.log("Image to delete:", image[0].image_path);
    if (!image || !image[0].image_path) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // Delete file from disk if it exists
    if (fs.existsSync(image[0].image_path)) {
      fs.unlinkSync(image[0].image_path);
    }
    await deleteImage(imageId);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
};*/

// Delete multiple images
exports.deleteImages = async (req, res) => {
  const { imageIds } = req.body; // expects: { "imageIds": [1,2,3] }
  if (!Array.isArray(imageIds) || imageIds.length === 0) {
    return res.status(400).json({ message: 'No image IDs provided' });
  }
  try {
    // Get image records from DB
    const images = await getImageByIds(imageIds);
    // Delete each file from disk if it exists
    console.log("Images to delete:", images);
    images.forEach(image => {
      if (image.image_path && fs.existsSync(image.image_path)) {
        try {
          fs.unlinkSync(image.image_path);
        } catch (err) {
          // Optionally log or handle file delete errors
          console.error(`Failed to delete file: ${image.image_path}`, err);
        }
      }
    });
    await deleteMultipleImages(imageIds);
    res.status(200).json({ message: 'Images deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting images', error: err.message });
  }
};

exports.editPostContent = async (req, res) => {
  const { id } = req.params; // postId
  const { post_comment } = req.body;
  if (!post_comment) {
    return res.status(400).json({ message: 'Post comment is required' });
  }
  try {
    const updated_on = new Date();
    await updatePostContent(id, post_comment, updated_on);
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

// Get assigned workers by project ID
exports.getAssignedWorkersByProjectController = async (req, res) => {
  const { project_id } = req.params;
  try {
    const workers = await getAssignedWorkersByProject(project_id);
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assigned workers', error: err.message });
  }
};

// Add worker attendance
exports.addWorkerAttendanceController = async (req, res) => {
  const { attendance } = req.body; // expects: { attendance: [ {...}, {...} ] }
  console.log("Attendance Data:", attendance);
  const { project_id } = req.params;
  console.log("Project ID for attendance:", project_id);
  if (!Array.isArray(attendance) || attendance.length === 0) {
    return res.status(400).json({ message: 'Attendance data is required' });
  }
  try {
    await addWorkerAttendance(project_id,attendance);
    res.status(201).json({ message: 'Attendance submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting attendance', error: err.message });
  }
};



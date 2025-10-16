const pool = require('../config/db');

// Get all projects
exports.getAllProjects = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE user_id = ? ORDER BY created_on DESC', [userId]);
  return rows;
};

// Create a new project
exports.createProject = async (project) => {  
  const sql = `
    INSERT INTO projects (user_id, project_name, parent_project, location, start_date, end_date, status, hold_reason, created_on, updated_on)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [    
    project.user_id,
    project.project_name,
    project.parent_project,
    project.location,
    project.start_date,
    project.end_date,
    project.status,
    project.hold_reason,
    project.created_on,
    project.updated_on
  ];
  
  const [result] = await pool.query(sql, values);
  return result;
};

// Get project by ID
exports.getProjectById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  return rows[0];
};

// Save project images
exports.savePostImages = async (postId, imagePaths, created_on, updated_on) => {
  const sql = 'INSERT INTO project_images (post_id, image_path, created_on, updated_on) VALUES ?';
  const values = imagePaths.map(path => [postId, path]);
  [values.forEach(v => { v.push(created_on); v.push(updated_on); })];
  const[result] = await pool.query(sql, [values]);
  return result;  
};

// Update project details
exports.updateProject = async (id, project) => {
  const sql = `
    UPDATE projects SET
      project_name = ?,
      parent_project = ?,
      location = ?,
      start_date = ?,
      end_date = ?,
      status = ?,
      hold_reason = ?,
      updated_on = ?
    WHERE id = ?
  `;
  const values = [
    project.project_name,
    project.parent_project,
    project.location,
    project.start_date,
    project.end_date,
    project.status,
    project.hold_reason,
    project.updated_on,
    id
  ];
  const [result] = await pool.query(sql, values);
  return result;
};

exports.createPost = async (post) => {  
  const sql = `
    INSERT INTO post_on_project (project_id, post_comment, created_on, updated_on)
    VALUES (?, ?, ?, ?)`;
  const values = [post.project_id, post.post_comment, post.created_on, post.updated_on];
  const [result] = await pool.query(sql, values);
  return result;
};

// Delete a single image by image ID and post ID
exports.deleteImage = async (imageId) => { console.log("Image ID to delete inside model:", imageId);
  const sql = 'DELETE FROM project_images WHERE id = ?';
  const [result] = pool.query(sql, [imageId]);
  return result;
};

// Delete multiple images by image IDs and post ID
exports.deleteMultipleImages = async (imageIds) => {
  if (imageIds.length === 0) return;
  const placeholders = imageIds.map(() => '?').join(',');
  const sql = `DELETE FROM project_images WHERE id IN (${placeholders})`;
  const [result] = await pool.query(sql, [...imageIds]);
  return result;
};

// Get image by ID
exports.getImageById = async (imageId) => { 
  const [result] = pool.query('SELECT * FROM project_images WHERE id = ?', [imageId]);
  return result;
};

// Get multiple images by array IDs
exports.getImageByIds = async (imageIds) => {
  if (!Array.isArray(imageIds)) imageIds = [imageIds];
  const placeholders = imageIds.map(() => '?').join(',');
  const [result] = await pool.query(`SELECT * FROM project_images WHERE id IN (${placeholders})`, imageIds);
  return result;
};

// update post content
exports.updatePostContent = async (postId, post_comment, updated_on) => {
  const sql = `
    UPDATE post_on_project
    SET post_comment = ?, updated_on = ?
    WHERE id = ?
  `;
  const [result] = await pool.query(sql, [post_comment, updated_on, postId]);
  return result;
};

// Get all workers list by project
exports.getAssignedWorkersByProject = async (project_id) => {
  const sql = `
    SELECT w.*, wp.rate_per_day, wp.work_start_date, wp.assigned_on
    FROM workers w
    INNER JOIN worker_projects wp ON w.id = wp.worker_id
    WHERE wp.project_id = ?
    ORDER BY w.worker_name
  `;
  const [rows] = await pool.query(sql, [project_id]);
  return rows;
};

// Add worker attendance records in bulk
exports.addWorkerAttendance = async (project_id,attendanceList) => {
  if (!Array.isArray(attendanceList) || attendanceList.length === 0) return;

  const sql = `
    INSERT INTO worker_attendance 
      (worker_id, project_id, working_date, half_day, full_day, rate_per_day, notes, created_on, updated_on)
    VALUES ?
  `;
  const now = new Date();
  const values = attendanceList.map(a => [
    a.worker_id,
    project_id,
    a.working_date,
    a.half_day || 0,
    a.full_day || 0,
    a.rate_per_day,
    a.notes || '',
    now,
    now
  ]);
  const [result] = await pool.query(sql, [values]);
  return result;
};
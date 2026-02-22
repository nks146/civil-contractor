const pool = require('../config/db');

// Get all projects
exports.getAllProjects = async (userId) => {  
  const [rows] = await pool.query('SELECT p1.*,p2.project_name as root_project FROM `projects` p1 left join projects p2 on p1.parent_project = p2.id where p1.user_id=? order by p1.created_on desc', [userId]);
  return rows;
};

// Get all root projects (projects with parent_project = 0)
exports.getRootProjects = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE user_id = ? AND parent_project = 0 ORDER BY created_on DESC', [userId]);
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
exports.getProjectById = async (id, userId) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ? AND user_id = ?', [id, userId]);
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

// Soft delete project
exports.softDeleteProject = async (id, project) => {
  const sql = `
    UPDATE projects SET      
      status = ?,
      updated_on = ?
    WHERE id = ?
  `;
  const values = [    
    project.status,
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
  /*const sql = `
    SELECT w.*, wp.rate_per_day, wp.work_start_date, wp.assigned_on
    FROM workers w
    INNER JOIN worker_projects wp ON w.id = wp.worker_id
    WHERE wp.project_id = ?
    ORDER BY w.worker_name
  `;*/

  const sql = `SELECT 
    w.*,
    wp.rate_per_day,
    wp.work_start_date,
    wp.assigned_on,
    IFNULL(SUM(wa.full_day + (wa.half_day * 0.5)), 0) AS total_working_days,
    ROUND(IFNULL(SUM(wa.full_day + (wa.half_day * 0.5)), 0) * wp.rate_per_day, 2) AS total_wage
FROM 
    workers w
JOIN 
    worker_projects wp ON wp.worker_id = w.id
LEFT JOIN 
    worker_attendance wa ON wa.worker_id = w.id AND wa.project_id = wp.project_id
WHERE 
    wp.project_id = ?
GROUP BY 
    w.id, w.user_id, w.worker_name, w.address, w.contact, w.status, w.base_rate, 
    w.expertise, w.created_on, w.updated_on, wp.rate_per_day, wp.work_start_date, wp.assigned_on
ORDER BY 
    w.worker_name;`;
    
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

// Get all posts by project ID
exports.getPostsByProjectId = async (projectId) => {
  const sql = ` SELECT p.*, GROUP_CONCAT(pi.image_path) AS images
    FROM post_on_project p
    LEFT JOIN project_images pi ON pi.post_id = p.id
    WHERE p.project_id = ?
    GROUP BY p.id
    ORDER BY p.created_on DESC`;
  const [rows] = await pool.query(sql, [projectId]);
  return rows; 
}

// Add other expenses for a project
exports.createOtherExpenses = async (newExpense) => {
  const sql = `
    INSERT INTO other_expenses 
      (project_id, expense_name, amount, expense_date, notes, created_on)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const now = new Date();
  const values = [
    newExpense.project_id,
    newExpense.expense_name,
    newExpense.amount,
    newExpense.expense_date,
    newExpense.notes || '',
    now
  ];
  const [result] = await pool.query(sql, values);
  return result;
};

// Update other expenses for a project
exports.updateOtherExpenses = async (expenseId, updatedExpense) => {
  const sql = `
    UPDATE other_expenses 
    SET project_id = ?, expense_name = ?, amount = ?, expense_date = ?, notes = ?, updated_on = ?
    WHERE id = ?
  `;
  const now = new Date();
  const values = [
    updatedExpense.project_id,
    updatedExpense.expense_name,
    updatedExpense.amount,
    updatedExpense.expense_date,
    updatedExpense.notes || '',
    now,
    expenseId
  ];
  const [result] = await pool.query(sql, values);
  return result;
};

// Get other expenses by project ID
exports.getAllOtherExpenses = async (projectId) => {
  const sql = 'SELECT * FROM other_expenses WHERE project_id = ? ORDER BY created_on DESC';
  const [rows] = await pool.query(sql, [projectId]);
  return rows;
};

// Get other expenses by expense ID
exports.getExpensesById = async (expenseId) => { 
  const sql = 'SELECT * FROM other_expenses WHERE id = ?';
  const [rows] = await pool.query(sql, [expenseId]);
  return rows[0]; // Return the first (and only) row
};

// Get all distinct expense names 
exports.getAllDistinctExpensesName = async () => {
  const sql = 'SELECT DISTINCT expense_name FROM other_expenses';
  const [rows] = await pool.query(sql);
  return rows;
};
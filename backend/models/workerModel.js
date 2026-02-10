const pool = require('../config/db');

// Add worker
exports.addWorker = async (worker) => {
  const sql = `
    INSERT INTO workers (user_id, worker_name, address, contact, status, base_rate, expertise, created_on, updated_on)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    worker.user_id,
    worker.worker_name,
    worker.address,
    worker.contact,
    worker.status,
    worker.base_rate,
    worker.expertise,
    worker.created_on,
    worker.updated_on 
  ];
  const [result] = await pool.query(sql, values);
  return result.insertId;
};

// Edit worker
exports.editWorker = async (id, worker) => {
  const sql = `
    UPDATE workers SET
      worker_name = ?,
      address = ?,
      contact = ?,
      status = ?,
      base_rate = ?,
      expertise = ?,
      updated_on = ?
    WHERE id = ?
  `;
  const values = [
    worker.worker_name,
    worker.address,
    worker.contact,
    worker.status,
    worker.base_rate,
    worker.expertise,
    worker.updated_on,
    id
  ];
  const [result] = await pool.query(sql, values);
  return result;
};

// Delete worker
exports.deleteWorker = async (id) => {
  const sql = 'DELETE FROM workers WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result;
};

// Get workers list
exports.getWorkerlist = async (userId) => { 
  const [rows] = await pool.query('SELECT * FROM workers WHERE user_id = ? ORDER BY created_on DESC', [userId]);
  return rows;
};

// Assign project to worker
exports.assignProjectToWorker = async (assigning) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
  const sql = `
    INSERT INTO worker_projects (worker_id, project_id, rate_per_day, work_start_date, assigned_on)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    assigning.worker_id,
    assigning.project_id,
    assigning.rate_per_day,
    assigning.work_start_date,
    assigning.assigned_on
  ];
  await connection.query(sql, values);
  
  // 2. Update worker status to 'Engaged' in workers table
  const updateSql = `UPDATE workers SET status = 'Engaged' WHERE id = ?`;
  await connection.query(updateSql, [assigning.worker_id]);

  await connection.commit();
  return { success: true };
}  catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release(); 
  }
  
}

// Remove assigned project from worker
exports.deleteAssignedProjectFromWorker = async (worker_id, assignment_id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Delete the assignment
    const deleteSql = `DELETE FROM worker_projects WHERE id = ?`;
    await connection.query(deleteSql, [assignment_id]);

    // 2. Update worker status to 'Active'
    const updateSql = `UPDATE workers SET status = 'Active' WHERE id = ?`;
    await connection.query(updateSql, [worker_id]);

    await connection.commit();
    return { success: true };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
  
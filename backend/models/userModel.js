//const db = require('../config/db');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

/*
// Find user by email (callback style)
exports.findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// Create a new user
exports.createUser = async (userData) => {
  const { name, email, mobile, password, role, parent_id } = userData;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users 
    (name, email, mobile, password, role, parent_id, created_on, updated_on) 
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [name, email, mobile, hashedPassword, role, parent_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Find user by email
exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); // first result
    });
  });
};

// Find user by mobile number
exports.findByMobile = (mobile) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE mobile = ?", [mobile], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
*/

// Find user by email 
exports.findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Create a new user
exports.createUser = async (userData) => {
  const { name, email, mobile, password, role, parent_id } = userData;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users 
    (name, email, mobile, password, role, parent_id, created_on, updated_on) 
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  const [result] = await pool.query(query, [name, email, mobile, hashedPassword, role, parent_id]);
  return result.insertId;  
};

// Find user by mobile number
exports.findByMobile = async (mobile) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE mobile = ?', [mobile]);
  return rows[0];
};

const pool = require('../config/db');

// Create a new material order
exports.createOrder = async (orderData) => {
  const sql = `
    INSERT INTO material_orders 
    (user_id, material_type, supplier_name, supplier_contact, address, quantity, 
     unit_type, unit_price, delivery_date, project_id, comment, remaining_stock, 
     transportation_cost, invoice, used_in_projects) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    orderData.user_id,
    orderData.material_type,
    orderData.supplier_name,
    orderData.supplier_contact,
    orderData.address,
    orderData.quantity,
    orderData.unit_type,
    orderData.unit_price,
    orderData.delivery_date,
    orderData.project_id,
    orderData.comment,
    orderData.remaining_stock,
    orderData.transportation_cost,
    orderData.invoice,
    orderData.used_in_projects
  ];
  const [result] = await pool.query(sql, values);
  return result;
};      

// Get all orders
exports.getAllOrders = async () => {
  const [rows] = await pool.query('SELECT * FROM material_orders ORDER BY id DESC');
  return rows;
};

// Get orders by user ID
exports.getOrdersByUserId = async (user_id) => {
  const [rows] = await pool.query('SELECT * FROM material_orders WHERE user_id = ? ORDER BY id DESC', [user_id]);
  return rows;
};

// Get orders by project ID
exports.getOrdersByProjectId = async (project_id) => {
  const [rows] = await pool.query('SELECT * FROM material_orders WHERE project_id = ? ORDER BY id DESC', [project_id]);
  return rows;
};

// Get a single order by ID
exports.getOrderById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM material_orders WHERE id = ?', [id]);
  return rows[0];
};

// Update order
exports.updateOrder = async (id, orderData) => {
  const sql = `
    UPDATE material_orders 
    SET material_type = ?, supplier_name = ?, supplier_contact = ?, 
        address = ?, quantity = ?, unit_type = ?, unit_price = ?, 
        delivery_date = ?, project_id = ?, comment = ?, remaining_stock = ?, 
        transportation_cost = ?, invoice = ?, used_in_projects = ?
    WHERE id = ?
  `;
  const values = [
    orderData.material_type,
    orderData.supplier_name,
    orderData.supplier_contact,
    orderData.address,
    orderData.quantity,
    orderData.unit_type,
    orderData.unit_price,
    orderData.delivery_date,
    orderData.project_id,
    orderData.comment,
    orderData.remaining_stock,
    orderData.transportation_cost,
    orderData.invoice,
    orderData.used_in_projects,
    id
  ];
  const [result] = await pool.query(sql, values);
  return result;
};

// Delete order
exports.deleteOrder = async (id) => {
  const [result] = await pool.query('DELETE FROM material_orders WHERE id = ?', [id]);
  return result;
};

// Get orders by project id and material type
exports.getOrdersByMaterialType = async (project_id, material_type) => {
  const [rows] = await pool.query('SELECT * FROM material_orders WHERE project_id = ? AND material_type = ? ORDER BY id DESC', [project_id, material_type]);
  return rows;
};

// Update remaining stock
exports.updateRemainingStock = async (id, remaining_stock) => {
  const [result] = await pool.query('UPDATE material_orders SET remaining_stock = ? WHERE id = ?', [remaining_stock, id]);
  return result;
};

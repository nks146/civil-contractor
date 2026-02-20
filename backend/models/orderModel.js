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

// Get material type
exports.getMaterialType = async (userId) => {
  const [rows] = await pool.query('SELECT DISTINCT material_type FROM material_orders WHERE user_id = ?', [userId]);
  return rows;
};

// Get available stock materials
exports.getAvailableMaterials = async (user_id) => {
  const [rows] = await pool.query(`
    SELECT o.id,o.material_type, o.project_id,p.project_name,o.remaining_stock, o.unit_type
    FROM material_orders o
    JOIN projects p ON o.project_id = p.id
    WHERE o.user_id = ? AND o.remaining_stock > 0
  `, [user_id]);
  return rows;
};

// Update used in projects and remaining stock when material is used in project
exports.materialUsedIn = async (materialUsedInData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const sql = 'insert into material_used (order_id, project_id, material_type, quantity_used, unit_type, used_date) values (?, ?, ?, ?, ?, ?)';
    const values = [
      materialUsedInData.order_id,
      materialUsedInData.project_id,
      materialUsedInData.material_type,
      materialUsedInData.quantity_used,
      materialUsedInData.unit_type,
      materialUsedInData.used_date
    ];
    const [result] = await connection.query(sql, values);
    if(result.affectedRows > 0){
      const updateStockSql = 'UPDATE material_orders SET remaining_stock = remaining_stock - ?, used_in_projects = CASE WHEN used_in_projects IS NULL OR used_in_projects = "" THEN ? WHEN FIND_IN_SET(?, used_in_projects) = 0  THEN CONCAT(used_in_projects, ",", ?) ELSE used_in_projects END WHERE id = ? ';

      await connection.query(updateStockSql, [materialUsedInData.quantity_used, materialUsedInData.project_id, materialUsedInData.project_id, materialUsedInData.project_id, materialUsedInData.order_id]);
      await connection.commit();
      return result;
    }
  } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release(); 
    }
  
};
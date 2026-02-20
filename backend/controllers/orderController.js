const { toDDMMYYYY,formatDate } = require('../helpers/dateFormateHelper');
const {
  createOrder,
  getOrdersByUserId,
  getOrdersByProjectId,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByMaterialType,
  updateRemainingStock,
  getMaterialType,
  getAvailableMaterials,
  materialUsedIn
} = require('../models/orderModel');

// Create a new order
exports.createOrderController = async (req, res) => {
    const userId = req.user.id;
  try {
    const {
      material_type,
      supplier_name,
      supplier_contact,
      address,
      quantity,
      unit_type,
      unit_price,
      delivery_date,
      project_id,
      comment,
      remaining_stock,
      transportation_cost,
      invoice,
      used_in_projects
    } = req.body;
    // Validate required fields
    if (
      !material_type ||
      !supplier_name ||
      !supplier_contact ||
      !quantity ||
      !unit_type ||
      !unit_price ||
      !project_id ||
      !remaining_stock ||
      !transportation_cost
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const orderData = {
      user_id: userId,
      material_type,
      supplier_name,
      supplier_contact,
      address,
      quantity,
      unit_type,
      unit_price,
      delivery_date: formatDate(delivery_date),
      project_id,
      comment,
      remaining_stock,
      transportation_cost,
      invoice,
      used_in_projects
    };
    const result = await createOrder(orderData);
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId, data: result });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get orders of a user
exports.getAllOrdersController = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserId(userId);
    res.json({ message: 'Orders retrieved successfully', data: orders });
  } catch (err) {
    console.error('Get Orders by User ID Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get orders by project ID
exports.getOrdersByProjectIdController = async (req, res) => {
  try {
    const { project_id } = req.params;

    if (!project_id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const orders = await getOrdersByProjectId(project_id);
    res.json({ message: 'Orders retrieved successfully', data: orders });
  } catch (err) {
    console.error('Get Orders by Project ID Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single order by ID
exports.getOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order retrieved successfully', data: order });
  } catch (err) {
    console.error('Get Order by ID Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update order
exports.updateOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    orderData.delivery_date = formatDate(orderData.delivery_date);
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Check if order exists
    const existingOrder = await getOrderById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const result = await updateOrder(orderId, orderData);
    res.json({ message: 'Order updated successfully', data: result });
  } catch (err) {
    console.error('Update Order Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete order
exports.deleteOrderController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Check if order exists
    const existingOrder = await getOrderById(id);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await deleteOrder(id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Delete Order Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get orders by project id and material type
exports.getOrdersByMaterialTypeController = async (req, res) => {
  try {
    const { material_type } = req.params;
    const { project_id } = req.params;

    if (!material_type || !project_id) {
      return res.status(400).json({ message: 'Material type and project ID are required' });
    }

    const orders = await getOrdersByMaterialType(project_id, material_type);
    res.json({ message: 'Orders retrieved successfully', data: orders });
  } catch (err) {
    console.error('Get Orders by Material Type Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update remaining stock
exports.updateRemainingStockController = async (req, res) => {
  try {
    const id = req.params.id;
    const { remaining_stock } = req.body;

    if (!id || remaining_stock === undefined) {
      return res.status(400).json({ message: 'Order ID and remaining stock are required' });
    }

    // Check if order exists
    const existingOrder = await getOrderById(id);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await updateRemainingStock(id, remaining_stock);
    res.json({ message: 'Stock updated successfully' });
  } catch (err) {
    console.error('Update Stock Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all material type
exports.getMaterialTypeController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const orders = await getMaterialType(userId);
    res.json({ message: 'Material types retrieved successfully', data: orders });
  } catch (err) {
    console.error('Get Material Types Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get stocks of materials (available stock) remaining_stock > 0 in material_orders table
exports.getAvailableMaterialController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const orders = await getAvailableMaterials(userId);
    res.json({ message: 'Material retrieved successfully', data: orders });
  } catch (err) {
    console.error('Get Material Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update used in projects and remaining stock when material is used in project
exports.materialUsedInController = async (req, res) => {
  try {
    const materialUsedInData = req.body;
    materialUsedInData.used_date = formatDate(materialUsedInData.used_date);

    if (!materialUsedInData.order_id || materialUsedInData.quantity_used === undefined) {
      return res.status(400).json({ message: 'Order ID and quantity used are required' });
    }
    const result = await materialUsedIn(materialUsedInData);
    res.json({ message: 'Material used in project updated successfully', data: result });
  } catch (err) {
    console.error('Update Material Used In Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

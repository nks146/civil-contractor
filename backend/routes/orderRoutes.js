const express = require('express');
const router = express.Router();
const {
  createOrderController,
  getAllOrdersController,
  getOrdersByProjectIdController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
  getOrdersByMaterialTypeController,
  updateRemainingStockController
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

// Routes
router.post('/add', createOrderController);                           // Create
router.get('/', getAllOrdersController);                             // Read all
router.get('/id/:id', getOrderByIdController);                       // Read by ID
router.get('/project/:project_id', getOrdersByProjectIdController);  // Read by project ID
router.get('/project/:project_id/material/:material_type', getOrdersByMaterialTypeController); // Read by material type
router.put('/id/:id', updateOrderController);                        // Update
router.delete('/id/:id', deleteOrderController);                     // Delete
router.patch('/id/:id/stock', updateRemainingStockController);       // Update stock

module.exports = router;
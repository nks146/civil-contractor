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
  updateRemainingStockController,
  getMaterialTypeController,
  getAvailableMaterialController,
  materialUsedInController
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

// Routes
router.post('/add', createOrderController);                           // Create
router.get('/', getAllOrdersController);                             // Read all
router.get('/id/:id', getOrderByIdController);                       // Read by ID
router.get('/project/:project_id', getOrdersByProjectIdController);  // Read by project ID
router.get('/project/:project_id/material/:material_type', getOrdersByMaterialTypeController); // Read by material type
router.put('/:id/edit', updateOrderController);                        // Update
router.delete('/:id/delete', deleteOrderController);                     // Delete
router.patch('/:id/stock', updateRemainingStockController);       // Update stock
router.get('/material-types', getMaterialTypeController); // Get all material types name
router.get('/available-materials', getAvailableMaterialController); // Get available materials stocks
router.post('/material-used-in', materialUsedInController); // Update used in projects and remaining stock when material is used in project

module.exports = router;
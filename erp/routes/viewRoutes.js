const express = require('express');
const router = express.Router();

//Import Statement to load Controllers
const processController = require('../controllers/process.controller');
const finalProductController = require('../controllers/final_product.controller');

//Import Statement to load Middleware
const auth = require('../middleware/auth')

//Process Routes
router.get('/', auth, processController.getProcesses);
router.get('/:id',auth, processController.getProcessById);
//Final Product Routes
router.get('/', auth, finalProductController.getFinalProducts);

module.exports = router;
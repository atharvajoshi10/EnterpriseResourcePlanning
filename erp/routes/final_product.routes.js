const express = require('express');
const router = express.Router();

//Import Statement to load Controllers
const fpController = require('../controllers/final_product.controller');

//Import Statement to load Middleware
const auth = require('../middleware/auth')

//Process Api Routes


//Process View Routes
router.get('/', auth, fpController.getFinalProducts);
router.get('/:id',auth, fpController.getFinalProductById);

module.exports = router;
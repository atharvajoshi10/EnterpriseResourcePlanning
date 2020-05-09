const express = require('express');
const router = express.Router();

//Import Statement to load Controllers
const processController = require('../controllers/process.controller');
const raw_materialController = require('../controllers/raw_material.controller');
const itemsController = require('../controllers/items.controller');
const finalProductController = require('../controllers/final_product.controller');

//Import Statement to load Middleware
const auth = require('../middleware/auth')

//Process Routes
router.get('/process/', auth, processController.getProcesses);
router.get('/process/:id',auth, processController.getProcessById);

//Raw Material Routes
router.get('/raw_material/', auth, raw_materialController.getRawMaterials);
router.get('/raw_material/:id',auth, raw_materialController.getRawMaterialById);

//Items Routes
router.get('/items/', auth, itemsController.getItems);
router.get('/items/:id',auth, itemsController.getItemById);
router.post('/items/uploadPdf/:id', auth, itemsController.uploadDrawingPdf, itemsController.saveDrawingLocation);
//router.delete('/items/deletePdf/:id',auth,itemsController.deleteDrawingPdf, itemsController.deleteDrawingLocation);

//Final Product Routes
//router.get('/final_product/', auth, finalProductController.getFinalProducts);
//router.get('/final_product/:id', auth, finalProductController.getFinalProductById);

module.exports = router;



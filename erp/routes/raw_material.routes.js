const express = require('express');
const router = express.Router();

//Import Statement to load Controllers
const raw_materialController = require('../controllers/raw_material.controller');

//Import Statement to load Middleware
const auth = require('../middleware/auth')

//Process Api Routes
router.patch('/api/update/:id',auth, raw_materialController.updateRawMaterialApi);
router.post('/api/add',auth, raw_materialController.addRawMaterialApi);
router.delete('/api/delete/:id',auth, raw_materialController.deleteRawMaterialApi);
router.post('/api/uploadImage', auth, raw_materialController.uploadImage, raw_materialController.getImageLocation);

//Raw Material Routes
router.get('/', auth, raw_materialController.getRawMaterials);
// router.get('/add',auth, raw_materialController.addRawMaterial);
router.get('/:id',auth, raw_materialController.getRawMaterialById);
// router.get('/update/:id',auth, raw_materialController.updateRawMaterial);

module.exports = router;


const express = require('express');
const router = express.Router();

//Import Statement to load Controllerss
const itemsController = require('../controllers/items.controller');

//Import Statement to load Middleware
const auth = require('../middleware/auth')
//API
router.delete('/api/delete/:id',auth, itemsController.deleteItemApi);
router.post('/api/add',auth,itemsController.addItemApi);
router.post('/api/uploadImage', auth, itemsController.uploadImage, itemsController.getImageLocation);
router.patch('/api/update/:id',auth, itemsController.updateItemApi);
router.get('/api/loadSelectPicker/:id',auth, itemsController.loadSelectPicker);
//Process-List API
router.patch('/api/process/sort/:id',auth,itemsController.sortProcessList);
router.patch('/api/process/append/:id',auth,itemsController.appendProcessApi);
router.patch('/api/process/update/:id',auth,itemsController.updateProcessApi);
router.patch('/api/processList/update/:id',auth,itemsController.updateProcessListApi);
router.delete('/api/process/delete/:id',auth,itemsController.removeProcessApi);
//Pdf-list API
router.post('/api/uploadPdf', auth, itemsController.uploadDrawingPdf, itemsController.getDrawingLocation);
router.patch('/api/uploadPdf/:id', auth, itemsController.uploadDrawingPdf, itemsController.saveDrawingLocation);
router.delete('/api/deletePdf/:id',auth, itemsController.deleteDrawingLocation);

//Items Routes
router.get('/', auth, itemsController.getItems);
router.get('/:id',auth,itemsController.getItemById);


module.exports = router;



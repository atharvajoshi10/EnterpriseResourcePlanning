const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller')
//Import Statement to load Middleware
const auth = require('../middleware/auth')

router.post('/signup', employeeController.signup);
router.post('/login', employeeController.login);
router.post('/logout', auth, employeeController.logout);
router.get('/me',auth, employeeController.profile);
router.patch('/update/me',auth, employeeController.updateMe);
router.delete('/delete/me', auth, employeeController.deleteMe);

module.exports = router;
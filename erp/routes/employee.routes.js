const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller')
//Import Statement to load Middleware
const auth = require('../middleware/auth')
const isLoggedIn = require('../middleware/isLoggedIn')

//API Calls
router.post('/api/signup', employeeController.signupApi);
router.post('/api/login', employeeController.loginApi);
router.get('/api/logout', isLoggedIn, employeeController.logoutApi);
router.get('/api/me',auth, employeeController.profileApi);
router.patch('/api/update/me',auth, employeeController.updateMeApi);
router.delete('/api/delete/me', auth, employeeController.deleteMeApi);

//View Calls
router.get('/login', employeeController.login);
router.get('/dashboard',auth,employeeController.dashboard);

module.exports = router;
//Author - Megh Khaire

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
let Employee = require('../models/employee.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Employees
router.get('/viewAll',auth,(req,res) => {
    Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Employee
router.route('/addEmployee').post((req,res) => {
    const newEmployee = new Employee(req.body)
    newEmployee.save()
    .then(() => res.json('Employee Added'))
    .catch(err => res.status(400).json('Unable to add Employee' + err));
});

//Adding a route to login existing employees
router.post('/login', async (req,res) =>{
    try{
        const employee = await Employee.findByCredentials(req.body.e_username, req.body.e_password)
        const token = await employee.generateAuthToken()
        res.json({employee})
    }catch(e){
        res.status(400).json('Unable to Login!'+e)
    }
})

//Adding a route to logout existing employees from all devices
router.post('/logout', auth, async (req,res) =>{
    try{
        req.employee.tokens = []
        await req.employee.save()
        res.json('Logged out successfully!')
    }catch(e){
        res.status(500).json('Unable to Logout!'+e)
    }
})

//Adding route to search by ID
router.get('/:id', auth, (req,res) =>{
    Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.patch('/update/:id',auth, async (req,res) =>{
   try{
        const updates = Object.keys(req.body)
        const employee = await Employee.findById(req.params.id)
        updates.forEach((update) => employee[update] = req.body[update])
        await employee.save()

        if(!employee){
            return res.status(404).json('Invalid Id!')
        }
        res.json('Employee updated!')  
    }
    catch(e){
        res.status(400).json('Something went wrong!'+err)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id', auth, (req,res) => {
    try{
        Employee.findByIdAndDelete(req.params.id)
        .then(employee =>{
            if(!employee){
                res.status(404).json('Invalid Id!')
            }
            res.json('Employee Deleted!')
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+err)
    }
});

//Necessary export statement, do not change
module.exports = router;



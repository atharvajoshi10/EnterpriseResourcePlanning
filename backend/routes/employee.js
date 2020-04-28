//Author - Megh Khaire

//Import Statements to load the models
const router = require('express').Router();
const mongoose = require('mongoose')
let Employee = require('../models/employee.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Employees
router.route('/viewAll').get((req,res) => {
    Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add a Employee
router.route('/addEmployee').post((req,res) => {
    const e_name = req.body.e_name;
    const e_phone = req.body.e_phone;
    const e_address = req.body.e_address;
    const e_username = req.body.e_username;
    const e_password = req.body.e_password;
    const e_salary = Number(re.body.e_salary);
    const username_created = req.body.username_created;
    const newEmployee = new Employee({e_name,e_phone,e_address,e_username,e_password,e_salary,username_created});
    newEmployee.save()
    .then(() => res.json('Employee Added'))
    .catch(err => res.status(400).json('Unable to add Employee' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').post((req,res) =>{
    Employee.findById(req.params.id)
    .then(employee => {
        employee.e_name = req.body.c_name;
        employee.e_phone = req.body.c_phone;
        employee.e_address = req.body.c_address;
        employee.e_username = req.body.e_username;
        employee.e_salary = Number(re.body.e_salary);
        employee.username_created = req.body.username_created;
        employee.username_updated = req.body.username_updated;
        employee.save()
        .then(() => res.json('Employee updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Employee Details ' + err));
    })
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee Deleted"))
    .catch(err => res.status(400).json('Invalid Employee Id/ Deletion failed ' + err));
})

module.exports = router;
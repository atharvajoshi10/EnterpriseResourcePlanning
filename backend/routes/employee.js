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
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Employee
router.route('/addEmployee').post((req,res) => {
    const newEmployee = new Employee(req.body)
    newEmployee.save()
    .then(() => res.json('Employee Added'))
    .catch(err => res.status(400).json('Unable to add Employee' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').patch((req,res) =>{
    try{
        Employee.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(employee => {
            if(!employee){
                res.status(404).json('Invalid Id!')
            }
            res.json('Employee updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+err)
    }
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
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



//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
let Customer = require('../models/customer.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Customers
router.get('/viewAll', auth, (req,res) => {
    Customer.find()
    .then(customer => res.json(customer))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Customer
router.post('/addCustomer', auth, (req,res) => {
    const newCustomer = new Customer(req.body)
    newCustomer.save()
    .then(() => res.json('Customer Added'))
    .catch(err => res.status(400).json('Unable to add Customer' + err));
});

//Adding route to search by ID
router.get('/:id',auth,(req,res) =>{
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.patch('/update/:id', auth, (req,res) =>{
    try{
        Customer.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(customer => {
            if(!customer){
                res.status(404).json('Invalid Id!')
            }
            res.json('Customer updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id', auth, (req,res) => {
    try{
        Customer.findByIdAndDelete(req.params.id)
        .then(customer =>{
            if(!customer){
                res.status(404).json('Invalid Id!')
            }
            res.json('Customer Deleted!')
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Necessary export statement, do not change
module.exports = router;
//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const mongoose = require('mongoose')
let Customer = require('../models/customer.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Customers
router.route('/viewAll').get((req,res) => {
    Customer.find()
    .then(customer => res.json(customer))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Customer
router.route('/addCustomer').post((req,res) => {
    const newCustomer = new Customer(req.body)
    newCustomer.save()
    .then(() => res.json('Customer Added'))
    .catch(err => res.status(400).json('Unable to add Customer' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').patch((req,res) =>{
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
        res.status(400).json(e+err)
    }
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer Deleted"))
    .catch(err => res.status(404).json('Invalid Customer Id/ Deletion failed ' + err));
})

module.exports = router;
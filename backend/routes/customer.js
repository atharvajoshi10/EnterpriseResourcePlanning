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
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add a Customer
router.route('/addCustomer').post((req,res) => {
    const c_name = req.body.c_name;
    const c_phone = req.body.c_phone;
    const c_email = req.body.c_email;
    const c_address = req.body.c_address;
    const c_representative = req.body.c_representative;
    const c_billing_address = req.body.c_billing_address;
    const c_past_orders = req.body.c_past_orders;
    const c_current_orders = req.body.c_current_orders;
    const username_created = req.body.username_created;
    const newCustomer = new Customer({c_name,c_phone,c_email,c_address,c_representative,c_billing_address
        ,c_past_orders,c_current_orders,username_created,username_updated});
    newCustomer.save()
    .then(() => res.json('Customer Added'))
    .catch(err => res.status(400).json('Unable to add Customer' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').post((req,res) =>{
    Customer.findById(req.params.id)
    .then(customer => {
        customer.c_name = req.body.c_name;
        customer.c_phone = req.body.c_phone;
        customer.c_email = req.body.c_email;
        customer.c_address = req.body.c_address;
        customer.c_representative = req.body.c_representative;
        customer.c_billing_address = req.body.c_billing_address;
        customer.c_past_orders = req.body.c_past_orders;
        customer.c_current_orders = req.body.c_current_orders;
        customer.username_created = req.body.username_created;
        customer.username_updated = req.body.username_updated;
        customer.save()
        .then(() => res.json('Customer updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Customer Details ' + err));
    })
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer Deleted"))
    .catch(err => res.status(400).json('Invalid Customer Id/ Deletion failed ' + err));
})

module.exports = router;
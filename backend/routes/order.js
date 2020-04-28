//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
let Order = require('../models/order.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Orders
router.route('/viewAll').get((req,res) => {
    Order.find()
    .then(order => res.json(order))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add an Order
router.route('/addOrder').post((req,res) => {
    const newOrder = new Order(req.body)
    newOrder.save()
    .then(() => res.json('Order Added'))
    .catch(err => res.status(400).json('Unable to add Order ' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').patch((req,res) =>{
    try{
        Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(order => {
            if(!order){
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
    Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order Deleted"))
    .catch(err => res.status(404).json('Order Id/ Deletion failed ' + err));
})

//Necessary export statement, do not change
module.exports = router;
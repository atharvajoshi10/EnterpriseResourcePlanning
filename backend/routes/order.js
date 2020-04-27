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
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add an Order
router.route('/addOrder').post((req,res) => {
    const customer_id = req.body.customer_id;
    const po_number = req.body.po_number;
    const po_path = req.body.po_path;
    const so_number = req.body.so_number;
    const so_path = req.body.so_path;
    const invoice_type = req.body.invoice_type;
    const transporter = req.body.transporter;
    const fp_list = req.body.fp_list;
    const fp_cost = req.body.fp_cost;
    const item_list = req.body.item_list;
    const item_cost = req.body.item_cost;
    const tax_mapping = req.body.tax_mapping;
    const username_created = req.body.username_created;
    const username_updated = req.body.username_updated;
    const newOrder = new Order({customer_id,po_number,po_path,so_number,
        so_path,invoice_type,transporter,fp_list,fp_cost,item_list,item_cost
        ,tax_mapping,username_created,username_updated});
    newOrder.save()
    .then(() => res.json('Order Added'))
    .catch(err => res.status(400).json('Unable to add Order ' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').post((req,res) =>{
    Order.findById(req.params.id)
    .then(order => {
        order.customer_id = req.body.customer_id;
        order.po_number = req.body.po_number;
        order.po_path = req.body.po_path;
        order.so_number = req.body.so_number;
        order.so_path = req.body.so_path;
        order.invoice_type = req.body.invoice_type;
        order.transporter = req.body.transporter;
        order.fp_list = req.body.fp_list;
        order.fp_cost = req.body.fp_cost;
        order.item_list = req.body.item_list;
        order.item_cost = req.body.item_cost;
        order.tax_mapping = req.body.tax_mapping;
        order.username_created = req.body.username_created;
        order.username_updated = req.body.username_updated;
        order.save()
        .then(() => res.json('Final Product updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Order Details ' + err));
    })
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order Deleted"))
    .catch(err => res.status(400).json('Order Id/ Deletion failed ' + err));
})

//Necessary export statement, do not change
module.exports = router;
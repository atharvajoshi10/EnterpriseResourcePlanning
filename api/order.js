//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../erp/middleware/auth')
let Order = require('../erp/models/order.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Orders
router.get('/viewAll',auth,(req,res) => {
    Order.find()
    .then(order => res.json(order))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add an Order
router.post('/addOrder',auth,(req,res) => {
    const newOrder = new Order({
        ...req.body,
        username_created: req.employee.e_username
    })
    newOrder.save()
    .then(() => res.json('Order Added'))
    .catch(err => res.status(400).json('Unable to add Order ' + err));
});

//Adding route to search by ID
router.get('/:id',auth,(req,res) =>{
    Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.patch('/update/:id',auth,(req,res) =>{
    try{
        Order.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(order => {
            if(!order){
                res.status(404).json('Invalid Id!')
            }
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
            order.username_updated=req.employee.e_username;
            order.save()
            res.json('Order updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id',auth,(req,res) => {
    try{
        Order.findByIdAndDelete(req.params.id)
        .then(order =>{
            if(!order){
                res.status(404).json('Invalid Id!')
            }
            res.json('Order Deleted!'+order)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Necessary export statement, do not change
module.exports = router;
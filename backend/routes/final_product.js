//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
let FinalProduct = require('../models/final_product.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Final Products
router.route('/viewAll').get((req,res) => {
    FinalProduct.find()
    .then(finalproduct => res.json(finalproduct))
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add a Final Product
router.route('/addFinalProduct').post((req,res) => {
    const fp_name = req.body.fp_name;
    const fp_id = req.body.fp_id;
    const description = req.body.description;
    const items = req.body.items;
    const username_created = req.body.username_created;
    const username_updated = req.body.username_updated;
    const newFinalProduct = new FinalProduct({fp_name,fp_id,description,items
        ,username_created,username_updated});
    newFinalProduct.save()
    .then(() => res.json('Final Product Added'))
    .catch(err => res.status(400).json('Unable to add Final Product ' + err));
});

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    FinalProduct.findById(req.params.id)
    .then(finalproduct => res.json(finalproduct))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.route('/update/:id').post((req,res) =>{
    FinalProduct.findById(req.params.id)
    .then(finalproduct => {
        finalproduct.fp_name = req.body.fp_name;
        finalproduct.fp_id = req.body.fp_id;
        finalproduct.description = req.body.description;
        finalproduct.items = req.body.items;
        finalproduct.username_created = req.body.username_created;
        finalproduct.username_updated = req.body.username_updated;
        finalproduct.save()
        .then(() => res.json('Final Product updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Final Product Details ' + err));
    })
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    FinalProduct.findByIdAndDelete(req.params.id)
    .then(() => res.json("Final Product Deleted"))
    .catch(err => res.status(400).json('Invalid Final Product Id/ Deletion failed ' + err));
})

//Necessary export statement, do not change
module.exports = router;
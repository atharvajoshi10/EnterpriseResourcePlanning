//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../middleware/auth')
let FinalProduct = require('../models/final_product.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Final Products
router.get('/viewAll', auth, (req,res) => {
    FinalProduct.find()
    .then(finalproduct => res.json(finalproduct))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Final Product
router.post('/addFinalProduct', auth, (req,res) => {
    const newFinalProduct = new FinalProduct(req.body)
    newFinalProduct.save()
    .then(() => res.json('Final Product Added'))
    .catch(err => res.status(400).json('Unable to add Final Product ' + err));
});

//Adding route to search by ID
router.get('/:id', auth, (req,res) =>{
    FinalProduct.findById(req.params.id)
    .then(finalproduct => res.json(finalproduct))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding route to update by ID
router.patch('/update/:id', auth, (req,res) =>{
    try{
        FinalProduct.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(finalproduct => {
            if(!finalproduct){
                res.status(404).json('Invalid Id!')
            }
            res.json('Final Product updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+err)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id',auth,(req,res) => {
    try{
        FinalProduct.findByIdAndDelete(req.params.id)
        .then(finalproduct =>{
            if(!finalproduct){
                res.status(404).json('Invalid Id!')
            }
            res.json('Final Product Deleted!' + finalproduct)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+err)
    }
});

//Necessary export statement, do not change
module.exports = router;
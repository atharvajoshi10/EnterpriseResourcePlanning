//Author - Megh Khaire
//Import Statements to load the models
const router = require('express').Router();
let Raw_Material = require('../models/raw_material.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all Raw Materials
router.route('/viewAll').get((req,res) => {
    Raw_Material.find()
    .then(item => res.json(item))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add Raw Material
router.route('/addMaterial').post((req,res) => {
    const newRaw_Material = new Raw_Material(req.body)
    newRaw_Material.save()
    .then(() => res.json('Material Added'))
    .catch(err => res.status(400).json('Unable to add Material' + err));
});

//Adding a route to find by ID
router.route('/:id').get((req,res) =>{
    Raw_Material.findById(req.params.id)
    .then(raw_material => res.json(raw_material))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Raw_Material.findByIdAndDelete(req.params.id)
    .then(raw_material => res.json(raw_material))
    .catch(err => res.status(404).json('Invalid Material Id/ Deletion failed ' + err));
});

//Adding a route to update by ID
router.route('/update/:id').patch((req,res) =>{
    try{
        Raw_Material.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(raw_material => {
            if(!raw_material){
                res.status(404).json('Invalid Id!')
            }
            res.json('Customer updated!')
        })
    }
    catch(e){
        res.status(400).json(e+err)
    }
});

//Export statement, Do not change
module.exports = router;
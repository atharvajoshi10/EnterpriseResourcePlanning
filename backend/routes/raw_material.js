//Author - Megh Khaire
//Import Statements to load the models
const router = require('express').Router();
let Raw_Material = require('../models/raw_material.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all items
router.route('/viewAll').get((req,res) => {
    Raw_Material.find()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add Materials
router.route('/addMaterial').post((req,res) => {
    const raw_material_name = req.body.raw_material_name;
    const description = req.body.description;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const measurement = req.body.measurement;
    const unit = req.body.unit;
    const username_created = req.body.username_created;
    const newRaw_Material = new Raw_Material({raw_material_name,description,category,quantity,measurement,unit,username_created});
    newRaw_Material.save()
    .then(() => res.json('Material Added'))
    .catch(err => res.status(400).json('Unable to add Material' + err));
});

//Adding a route to find by ID
router.route('/:id').get((req,res) =>{
    Raw_Material.findById(req.params.id)
    .then(raw_material => res.json(raw_material))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Raw_Material.findByIdAndDelete(req.params.id)
    .then(raw_material => res.json(raw_material))
    .catch(err => res.status(400).json('Invalid Material Id/ Deletion failed ' + err));
});

//Adding a route to update by ID
router.route('/update/:id').post((req,res) => {
    Raw_Material.findById(req.params.id)
    .then(raw_material =>{
        raw_material.raw_material_name = req.body.raw_material_name;
        raw_material.description = req.body.description;
        raw_material.category = req.body.category;
        raw_material.quantity = Number(req.body.quantity);
        raw_material.measurement = req.body.measurement;
        raw_material.unit = req.body.unit;
        raw_material.username_created = req.body.username_created;
        raw_material.username_updated = req.body.username_updated;
        raw_material.save()
        .then(() => res.json('Material updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Material ' + err));
    })
    .catch(err => res.status(400).json('Error : Invalid ID'));
});

//Export statement, Do not change
module.exports = router;
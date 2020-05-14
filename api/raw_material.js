//Author - Megh Khaire
//Import Statements to load the models
const router = require('express').Router();
const auth = require('../erp/middleware/auth')
let Raw_Material = require('../erp/models/raw_material.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all Raw Materials
router.get('/viewAll',auth,(req,res) => {
    Raw_Material.find()
    .then(item => res.json(item))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add Raw Material
router.post('/addMaterial',auth,(req,res) => {
    const newRaw_Material = new Raw_Material({
        ...req.body,
        username_created: req.employee.e_username
    })
    newRaw_Material.save()
    .then(() => res.json('Material Added'))
    .catch(err => res.status(400).json('Unable to add Material' + err));
});

//Adding a route to find by ID
router.get('/:id',auth,(req,res) =>{
    Raw_Material.findById(req.params.id)
    .then(raw_material => res.json(raw_material))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding a route to update by ID
router.patch('/update/:id',auth,(req,res) =>{
    try{
        Raw_Material.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(raw_material => {
            if(!raw_material){
                res.status(404).json('Invalid Id!')
            }
            raw_material.raw_material_name = req.body.raw_material_name;
            raw_material.raw_material_id = req.body.raw_material_id;
            raw_material.description = req.body.description;
            raw_material.category = req.body.category;
            raw_material.quantity = req.body.quantity;
            raw_material.measurement = req.body.measurement;
            raw_material.unit = req.body.unit;
            raw_material.username_updated = req.employee.e_username;
            raw_material.save()
            res.json('Raw Material updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id',auth,(req,res) => {
    try{
        Raw_Material.findByIdAndDelete(req.params.id)
        .then(raw_material =>{
            if(!raw_material){
                res.status(404).json('Invalid Id!')
            }
            res.json('Raw Material Deleted!'+raw_material)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Export statement, Do not change
module.exports = router;
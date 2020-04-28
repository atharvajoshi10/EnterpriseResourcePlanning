//Author - Megh Khaire
//Import Statements to load the models
const router = require('express').Router();
let Item = require('../models/items.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all items
router.route('/viewAll').get((req,res) => {
    Item.find()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error:' + err));
});

//Adding a route to add Processes
router.route('/addItems').post((req,res) => {
    const item_name = req.body.item_name;
    const item_id = req.body.item_id;
    const description = req.body.description;
    const drawing_number = req.body.drawing_number;
    const drawing_location = req.body.drawing_location;
    const drawing_revision_number = Number(req.body.drawing_revision_number);
    const process_list = req.body.process_list;
    const attached_materials = req.body.attached_materials;
    const username_created = req.body.username_created;
    const newItem = new Item({item_name,item_id,description,drawing_number,drawing_location,drawing_revision_number,process_list,attached_materials,username_created});
    newItem.save()
    .then(() => res.json('Item Added'))
    .catch(err => res.status(400).json('Unable to add Item' + err));
});

//Adding a route to find by ID
router.route('/:id').get((req,res) =>{
    Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Invalid Item Id/ Deletion failed ' + err));
});

//Adding a route to update by ID
router.route('/update/:id').post((req,res) => {
    Item.findById(req.params.id)
    .then(item =>{
        item.item_name = req.body.item_name;
        item.item_id = req.body.item_id;
        item.description = req.body.description;
        item.drawing_number = req.body.drawing_number;
        item.drawing_location = req.body.drawing_location;
        item.drawing_revision_number = Number(req.body.drawing_revision_number);
        item.process_list = req.body.process_list;
        item.attached_materials = req.body.attached_materials;
        item.username_created = req.body.username_created;
        item.username_updated = req.body.username_updated;
        item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Item ' + err));
    })
    .catch(err => res.status(400).json('Error : Invalid ID'));
});

//Export statement, Do not change
module.exports = router;
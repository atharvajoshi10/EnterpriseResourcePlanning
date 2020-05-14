//Author - Megh Khaire
//Import Statements to load the models
const router = require('express').Router();
const auth = require('../erp/middleware/auth')
let Item = require('../erp/models/items.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all Items
router.get('/viewAll',auth,(req,res) => {
    Item.find()
    .then(item => res.json(item))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add an Item
router.post('/addItems',auth,(req,res) => {
    const newItem = new Item({
        ...req.body,
        username_created: req.employee.e_username
    })
    newItem.save()
    .then(() => res.json('Item Added'))
    .catch(err => res.status(400).json('Unable to add Item' + err));
});

//Adding a route to find by ID
router.get('/:id',auth, async (req,res) =>{
    try{
        const item = await Item.findById(req.params.id).populate('process_list.process').populate('attached_materials.material')
        if(!item){
            res.status(404).send('Invalid Id')
        }
        res.send(item)
    }catch(e){
        res.status(500).send('Error: '+e)
    }
});

//Adding a route to update by ID
router.patch('/update/:id', auth, (req,res) =>{
    try{
        Item.findById(req.params.id)
        .then(item => {
            if(!item){
                res.status(404).json('Invalid Id!')
            }
            item.item_name = req.body.item_name;
            item.item_id = req.body.item_id;
            item.description = req.body.description;
            item.drawing_number = req.body.drawing_number;
            item.drawing_revision_number = req.body.drawing_revision_number;
            item.process_list = req.body.process_list;
            item.attached_materials = req.body.attached_materials;
            item.username_updated=req.employee.e_username;
            item.save()
            res.json('Item updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id', auth ,(req,res) => {
    try{
        Item.findByIdAndDelete(req.params.id)
        .then(item =>{
            if(!item){
                res.status(404).json('Invalid Id!')
            }
            res.json('Item Deleted!'+item)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Export statement, Do not change
module.exports = router;
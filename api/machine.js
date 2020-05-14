//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../erp/middleware/auth')
let Machine = require('../erp/models/machine.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Machines
router.get('/viewAll',auth,(req,res) => {
    Machine.find()
    .then(machine => res.json(machine))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Machine
router.post('/addMachine',auth,(req,res) => {
    const newMachine = new Machine({
        ...req.body,
        username_created: req.employee.e_username
    })
    newMachine.save()
    .then(() => res.json('Machine Added'))
    .catch(err => res.status(400).json('Unable to add Machine ' + err));
})

//Adding route to search by ID
router.get('/:id',auth,(req,res) =>{
    Machine.findById(req.params.id)
    .then(machine => res.json(machine))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});


//Adding route to update by ID
router.patch('/update/:id',auth,(req,res) =>{
    try{
        Machine.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(machine => {
            if(!machine){
                res.status(404).json('Invalid Id!')
            }
            machine.m_name = req.body.m_name;
            machine.m_image_location = req.body.m_image_location;
            machine.m_status = req.body.m_status
            machine.m_operator = req.body.m_operator;
            machine.m_purchase_date = req.body.m_purchase_date;
            machine.m_maintainence = req.body.m_maintainence;
            machine.m_consumable = req.body.m_consumable;
            machine.m_cost = req.body.m_cost;
            machine.username_updated=req.employee.e_username;
            machine.save()
            res.json('Machine updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id',auth,(req,res) => {
    try{
        Machine.findByIdAndDelete(req.params.id)
        .then(machine =>{
            if(!machine){
                res.status(404).json('Invalid Id!')
            }
            res.json('Machine Deleted!'+machine)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Necessary export statement, do not change
module.exports = router;
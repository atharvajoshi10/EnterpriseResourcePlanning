//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../middleware/auth')
let Machine = require('../models/machine.model');

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
    const newMachine = new Machine(req.body)
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
            res.json('Machine updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+err)
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
        res.status(500).json('Something went wrong!'+err)
    }
});

//Necessary export statement, do not change
module.exports = router;
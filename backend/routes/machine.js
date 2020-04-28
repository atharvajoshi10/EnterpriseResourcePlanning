//Author - Atharva Joshi

//Import Statements to load the models
const router = require('express').Router();
let Machine = require('../models/machine.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Machines
router.route('/viewAll').get((req,res) => {
    Machine.find()
    .then(machine => res.json(machine))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to add a Machine
router.route('/addMachine').post((req,res) => {
    const newMachine = new Machine(req.body)
    newMachine.save()
    .then(() => res.json('Machine Added'))
    .catch(err => res.status(400).json('Unable to add Machine ' + err));
})

//Adding route to search by ID
router.route('/:id').get((req,res) =>{
    Machine.findById(req.params.id)
    .then(machine => res.json(machine))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});


//Adding route to update by ID
router.route('/update/:id').patch((req,res) =>{
    try{
        Machine.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(machine => {
            if(!machine){
                res.status(404).json('Invalid Id!')
            }
            res.json('Customer updated!')
        })
    }
    catch(e){
        res.status(400).json(e+err)
    }
});

//Adding a route to delete by ID
router.route('/delete/:id').delete((req,res) => {
    Machine.findByIdAndDelete(req.params.id)
    .then(() => res.json("Machine Deleted"))
    .catch(err => res.status(404).json('Machine Id/ Deletion failed ' + err));
})

//Necessary export statement, do not change
module.exports = router;
//Import Statements to load the models
const router = require('express').Router();
let Process = require('../models/process.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all products 
router.route('/viewAll').get((req,res) => {
    Process.find()
    .then(process => res.json(process))
    .catch(err => res.status(400).json('Error:' + err));
});


//Adding a route to add Processes
router.route('/addProcess').post((req,res) => {
    const process_name = req.body.process_name;
    const description = req.body.description;
    
    const newProcess = new Process({process_name,description});

    newProcess.save()
    .then(() => res.json('Process Added'))
    .catch(err => res.status(400).json('Unable to add Process' + err));
});

//Adding a route to find by ID
router.route('/:id').get((req,res) =>{
    Process.findById(req.params.id)
    .then(process => res.json(process))
    .catch(err => res.status(401).json('Invalid Id ' + err));
});
//Author - Atharva Joshi
//Adding a route to delete by ID
router.route('/:id').delete((req,res) => {
    Process.findByIdAndDelete(req.params.id)
    .then(process => res.json(process))
    .catch(err => res.status(400).json('Invalid Process Id/ Deletion failed ' + err));
})

//Adding a route to update by ID
router.route('/update/:id').post((req,res) => {
    Process.findById(req.params.id)
    .then(process =>{
        process.process_name = req.body.process_name;
        process.description = req.body.description;

        process.save()
        .then(() => res.json('Process updated!'))
        .catch(err => res.status(400).json('Error: Unable to save updated Process ' + err));
    })
    .catch(err => res.status(400).json('Error : Invalid ID'));
});

//Export statement, Do not change
module.exports = router;
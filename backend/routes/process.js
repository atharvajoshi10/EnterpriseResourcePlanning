//Import Statements to load the models
//Author - Atharva Joshi

const router = require('express').Router();
const auth = require('../middleware/auth')
let Process = require('../models/process.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error
//Adding a route to view all Processes
router.get('/viewAll',auth,(req,res) => {
    Process.find()
    .then(process => res.json(process))
    .catch(err => res.status(500).json('Error:' + err));
});


//Adding a route to add a Process
router.post('/addProcess',auth,(req,res) => {
    const newProcess = new Process({
        ...req.body,
        username_created: req.employee.e_username
    })
    newProcess.save()
    .then(() => res.json('Process Added'))
    .catch(err => res.status(400).json('Unable to add Process' + err));
});

//Adding a route to find by ID
router.get('/:id',auth,(req,res) =>{
    Process.findById(req.params.id)
    .then(process => res.json(process))
    .catch(err => res.status(404).json('Invalid Id ' + err));
});

//Adding a route to update by ID
router.patch('/update/:id',auth,(req,res) =>{
    try{
        Process.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        .then(process => {
            if(!process){
                res.status(404).json('Invalid Id!')
            }
            process.process_name = req.body.process_name;
            process.process_id = re.body.process_id;
            process.description = req.body.description;
            process.worker_id = req.body.worker_id;
            process.machine_id = req.body.machine_id;
            process.username_updated=req.employee.e_username;
            process.save()
            res.json('Process updated!')
        })
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete by ID
router.delete('/delete/:id',auth,(req,res) => {
    try{
        Process.findByIdAndDelete(req.params.id)
        .then(process =>{
            if(!process){
                res.status(404).json('Invalid Id!')
            }
            res.json('Process Deleted!'+process)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Export statement, Do not change
module.exports = router;
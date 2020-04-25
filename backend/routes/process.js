//Import Statements to load the models
const router = require('express').Router();
let Process = require('../models/process.model');

//To access any route localhost:PORT/route...

//Adding a route to view all products 
router.route('/viewAll').get((req,res) => {
    Process.find()
    .then(process => res.json(process))
    .catch(err => res.status(400).json('Error:' + err));
});


router.route('/addProcess').post((req,res) => {
    const process_name = req.body.process_name;
    const description = req.body.description;
    
    const newProcess = new Process({process_name,description});

    newProcess.save()
    .then(() => res.json('Process Added'))
    .catch(err => res.status(400).json('Unable to add Process' + err));
});

//Export statement, Do not change
module.exports = router;
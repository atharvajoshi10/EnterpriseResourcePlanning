//Import Statements to load the models
let Process = require('../models/process.model');

exports.getProcesses = async (req,res) => {
    try{
        const processes = await Process.find();
        res.render('processList',{
            title: 'Processes',
            processes
        });
    }catch(e){
        res.status(500).send('Error:' + e);
    }
};

exports.getProcessById = async (req,res) =>{
    try{
        const process = await Process.findById(req.params.id)
        if(!process){
            res.status(404).send('Error: Invalid ID'); 
        }
        res.render('process',{
            title: 'Process | ' + process.process_name,
            process
        });
    }catch(e){
        res.status(500).send('Error:' + e);
    }
};
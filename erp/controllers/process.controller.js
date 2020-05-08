//Import Statements to load the models
let Process = require('../models/process.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getProcesses = catchAsync(async (req,res,next) => {
    const processes = await Process.find().sort('-createdAt');
    res.render('processList',{
        title: 'Processes',
        processes
    });
});

exports.getProcessById = catchAsync(async (req,res,next) =>{
    const process = await Process.findById(req.params.id)
    if(!process){
        return next(new AppError('No Process found with that ID',404));
    }
    res.render('process',{
        title: 'Process | ' + process.process_name,
        process
    });
});

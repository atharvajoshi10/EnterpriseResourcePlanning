//Import Statements to load the models
let Process = require('../models/process.model');
let Item = require('../models/items.model');
let Raw_material = require('../models/raw_material.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

module.exports.processStatusChecker = catchAsync(async (req,res,next) =>{
    const process = Process.findById({_id:req.params._id}).select('isCompleted');
    if(!process.isCompleted){
        next();
    }else{
        return next(new AppError('This process cannot be modified or deleted',403))
    }
});

module.exports.itemStatusChecker = catchAsync(async (req,res,next) =>{
    const item = Item.findById({_id:req.params._id}).select('isCompleted');
    if(!item.isCompleted){
        next();
    }else{
        return next(new AppError('This item cannot be modified or deleted',403))
    }
});

module.exports.rawMaterialStatusChecker = catchAsync(async (req,res,next) =>{
    const raw_material = Raw_material.findById({_id:req.params._id}).select('isCompleted');
    if(!raw_material.isCompleted){
        next();
    }else{
        return next(new AppError('This raw material cannot be modified or deleted',403))
    }
});
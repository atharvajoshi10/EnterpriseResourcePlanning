//Import Statements to load the models
let Process = require('../models/process.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');

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

// exports.updateProcess = catchAsync(async (req,res,next) =>{
//     const process = await Process.findById(req.params.id)
//     if(!process){
//         return next(new AppError('No Process found with that ID',404));
//     }
//     res.render('editprocess',{
//         title: 'Edit Process | ' + process.process_name,
//         process
//     });
// })

// exports.addProcess = catchAsync(async (req, res, next) => {
//     res.render('createProcess',{
//         title: 'Create new Process'
//     });
// });

//##########API#########
exports.updateProcessApi = catchAsync(async (req,res,next) =>{
    const process = await Process.findById(req.params.id);
    if(!process){
        return next(new AppError('No Process found with that ID',404));
    }
    process.process_name = req.body.process_name;
    process.process_id = req.body.process_id;
    process.description = req.body.description;
    process.worker_id = req.body.worker_id;
    process.machine_id = req.body.machine_id;
    process.process_thumbnail_location = req.body.process_thumbnail_location;
    process.username_updated=req.employee.e_username;
    await process.save()
    res.json({status:'success'});
});

exports.saveNewProcessApi = catchAsync(async (req,res,next) =>{
    const newProcess = new Process({
        ...req.body,
        username_created: req.employee.e_username
    });
    const process = await newProcess.save()
    res.json({status:'success',id: process._id});
});

exports.deleteProcessApi = catchAsync(async(req,res,next) => {
    const process = await Process.findByIdAndDelete(req.params.id)
    if(!process){
        return next(new AppError('No Process found with that ID',404));
    }
    res.json({status:'success'});
});

/*##########Image Upload Controllers###########*/

const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/process');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const multerImgFilter = (req,file,cb) => {
    //Image FILES FILTERING
    if(!file.mimetype.startsWith('image')){
        cb(new AppError('Please upload an image!',400), false);
    }
    cb(null, true)
}

uploadImg = multer({
    storage: multerImgStorage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: multerImgFilter
});

exports.uploadImage = uploadImg.single('thumbnail');
exports.getImageLocation = catchAsync(async (req,res,next) =>{
    const location = '/img/process/'+req.file.originalname;
    res.json({
        status:'success',
        location: location
    });
});

// exports.saveImageLocation = catchAsync(async (req,res,next) =>{
//     const location = '/img/items/'+req.file.originalname;
//     const item = await Item.findById(req.params.id)
//     item.item_thumbnail_location = location;
//     await item.save()
// });
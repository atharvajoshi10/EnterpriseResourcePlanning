//Import Statements to load the models
let Process = require('../models/process.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');

//########## VIEWS CONTROLLERS ##########

//Render Process List View 
exports.getProcesses = catchAsync(async (req,res,next) => {
    const processes = await Process.find().sort('-createdAt');
    res.render('processList',{
        title: 'Processes',
        processes
    });
});

//Render Selected Process
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

//########## API CONTROLLERS ##########

//Api to update selected process
exports.updateProcessApi = catchAsync(async (req,res,next) =>{
    const process = await Process.findById(req.params.id);
    if(!process){
        return next(new AppError('No Process found with that ID',404));
    }
    const updates = Object.keys(req.body)
    updates.forEach((update) => process[update] = req.body[update])
    process.username_updated=req.employee.e_username;
    await process.save()
    res.json({status:'success'});
});

//Api to save new process
exports.saveNewProcessApi = catchAsync(async (req,res,next) =>{
    const newProcess = new Process({
        ...req.body,
        username_created: req.employee.e_username
    });
    const process = await newProcess.save()
    res.json({
        status:'success',
        id: process._id
    });
});

//Api to delete selected process
exports.deleteProcessApi = catchAsync(async(req,res,next) => {
    const process = await Process.findByIdAndDelete(req.params.id)
    if(!process){
        return next(new AppError('No Process found with that ID',404));
    }
    res.json({status:'success'});
});

//########## Image Upload Controllers ###########
//Function to set destination an filename of thumbnail image
const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/process');
    },
    filename: (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        const filename=file.originalname.split('.')[0];
        cb(null,`thumbnail-${filename}-${Date.now()}.${ext}`);
    }
});

//Function to filter uploaded file (Validation Check)
const multerImgFilter = (req,file,cb) => {
    //Image FILES FILTERING
    if(!file.mimetype.startsWith('image')){
        cb(new AppError('Please upload an image!',400), false);
    }
    cb(null, true)
}

//Function to upload Validated File
uploadImg = multer({
    storage: multerImgStorage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: multerImgFilter
});

//Api to upload image on local storage
exports.uploadImage = uploadImg.single('thumbnail');

//Api to get Location of uploaded image
exports.getImageLocation = catchAsync(async (req,res,next) =>{
    const location = `/img/process/${req.file.filename}`;
    res.json({
        status:'success',
        location: location
    });
});
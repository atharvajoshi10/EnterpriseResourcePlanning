//Author - Megh Khaire

//Import Statements to load the models
let Raw_material = require('../models/raw_material.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');

//########## VIEW CONTROLLERS ##########

//Render Material List View 
exports.getRawMaterials = catchAsync(async (req,res,next) => {
    const raw_materials = await Raw_material.find().sort('-createdAt');
    res.render('rawMaterialList',{
        title: 'Raw Materials',
        raw_materials
    });
});

//Render Selected Material
exports.getRawMaterialById = catchAsync(async (req,res,next) =>{
    const raw_material = await Raw_material.findById(req.params.id)
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    res.render('rawMaterial',{
        title: 'Raw Material | ' + raw_material.raw_material_name,
        raw_material
    });
});

//########## API CONTROLLERS #########

//Api to update selected Material
exports.updateRawMaterialApi = catchAsync(async (req,res,next) =>{
    const raw_material = await Raw_material.findById(req.params.id);
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    const updates = Object.keys(req.body)
    updates.forEach((update) => raw_material[update] = req.body[update])
    raw_material.username_updated=req.employee.e_username;
    await raw_material.save()
    res.json({status:'success'});
});

//Api to save new Raw Material
exports.saveNewRawMaterialApi = catchAsync(async (req,res,next) =>{
    const newRawMaterial = new Raw_material({
        ...req.body,
        username_created: req.employee.e_username
    });
    await newRawMaterial.save()
    res.json({status:'success'});
});

//Api to delete selected Raw Material
exports.deleteRawMaterialApi = catchAsync(async(req,res,next) => {
    const raw_material = await Raw_material.findByIdAndDelete(req.params.id)
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    res.json({status:'success'});
});


//########## Image Upload Controllers ###########

//Function to set destination an filename of thumbnail image
const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/raw_material');
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
    const location = `/img/raw_material/${req.file.filename}`;
    res.json({
        status:'success',
        location: location
    });
});
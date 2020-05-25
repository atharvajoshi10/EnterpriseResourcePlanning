//Import Statements to load the models
let Raw_material = require('../models/raw_material.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');

exports.getRawMaterials = catchAsync(async (req,res,next) => {
    const raw_materials = await Raw_material.find().sort('-createdAt');
    res.render('rawMaterialList',{
        title: 'Raw Materials',
        raw_materials
    });
});

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

// exports.updateRawMaterial = catchAsync(async (req,res,next) =>{
//     const raw_material = await Raw_material.findById(req.params.id)
//     if(!raw_material){
//         return next(new AppError('No Raw Material found with that ID',404));
//     }
//     res.render('editRawMaterial',{
//         title: 'Edit Raw Material | ' + raw_material.raw_material_name,
//         raw_material
//     });
// })

// exports.addRawMaterial = catchAsync(async (req, res, next) => {
//     res.render('createRawMaterial',{
//         title: 'Create new Raw_material'
//     });
// });

//##########API#########
exports.updateRawMaterialApi = catchAsync(async (req,res,next) =>{
    const raw_material = await Raw_material.findById(req.params.id);
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    raw_material.raw_material_name = req.body.raw_material_name;
    raw_material.raw_material_id = req.body.raw_material_id;
    raw_material.description = req.body.description;
    raw_material.category = req.body.category;
    raw_material.quantity = req.body.quantity;
    raw_material.measurement = req.body.measurement;
    raw_material.unit = req.body.unit;
    raw_material.raw_material_thumbnail_location = req.body.raw_material_thumbnail_location;
    raw_material.username_updated=req.employee.e_username;
    await raw_material.save()
    res.json({status:'success'});
});

exports.addRawMaterialApi = catchAsync(async (req,res,next) =>{
    const newRawMaterial = new Raw_material({
        ...req.body,
        username_created: req.employee.e_username
    });
    await newRawMaterial.save()
    res.json({status:'success'});
});

exports.deleteRawMaterialApi = catchAsync(async(req,res,next) => {
    const raw_material = await Raw_material.findByIdAndDelete(req.params.id)
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    res.json({status:'success'});
});


/*##########Image Upload Controllers###########*/

const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/raw_material');
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
    const location = '/img/raw_material/'+req.file.originalname;
    res.json({
        status:'success',
        location: location
    });
});
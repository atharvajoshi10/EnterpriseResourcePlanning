//Import Statements to load the models
let Raw_material = require('../models/raw_material.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getRawMaterials = catchAsync(async (req,res,next) => {
    const raw_materials = await Raw_material.find().sort('-createdAt');
    res.render('raw_materialList',{
        title: 'Raw Materials',
        raw_materials
    });
});

exports.getRawMaterialById = catchAsync(async (req,res,next) =>{
    const raw_material = await Raw_material.findById(req.params.id)
    if(!raw_material){
        return next(new AppError('No Raw Material found with that ID',404));
    }
    res.render('raw_material',{
        title: 'Raw Material | ' + raw_material.raw_material_name,
        raw_material
    });
});
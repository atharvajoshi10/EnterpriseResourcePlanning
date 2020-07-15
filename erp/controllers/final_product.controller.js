//Import Statement to load the models
let FinalProduct = require('../models/final_product.model');
let Item = require('../models/items.model');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//########## VIEWS CONTROLLERS ##########

//Controller to get all Products from database
exports.getFinalProducts = catchAsync(async (req, res, next) => {
    const final_products = await FinalProduct.find().sort('-createdAt');
    const items = await Item.find().sort('-createdAt');
    res.render('finalProductList', {
        title: 'Final Products',
        final_products,
        items
    });
});

//Controller to get selected Product from database
exports.getFinalProductById = catchAsync(async (req,res,next) =>{
    const final_product = await FinalProduct.findById(req.params.id)
    .populate('items_list.item')
    const itemsList = await Item.find().sort('-createdAt');
    if(!final_product){
        return next(new AppError('No Product found with that ID',404));
    }
    res.render('finalProduct',{
        title: 'Final Product | ' + final_product.fp_name,
        final_product,
        itemsList
    });
});

//########## API CONTROLLERS ##########
//Api to save new final product
exports.saveNewFinalProductApi = catchAsync(async (req,res,next) =>{
    const newFinalProduct = new FinalProduct({
        ...req.body,
        username_created: req.employee.e_username
    });
    const final_product = await newFinalProduct.save()
    res.json({
        status:'success',
        id: final_product._id
    });
});

//Api to delete selected finalproduct
exports.deleteFinalProductApi = catchAsync(async(req,res,next) => {
    const final_product = await FinalProduct.findByIdAndDelete(req.params.id)
    if(!final_product){
        return next(new AppError('No Product found with that ID',404));
    }
    res.json({status:'success'});
});

//########## Image Upload Controllers ###########

//Function to set destination an filename of thumbnail image
const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/final_product');
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
};

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
    const location = `/img/final_product/${req.file.filename}`;
    res.json({
        status:'success',
        location: location
    });
});

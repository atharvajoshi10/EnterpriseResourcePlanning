//Import Statements to load the models
let Item = require('../models/items.model');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Controller to get all Items from database
exports.getItems = catchAsync(async (req,res,next) => {
    const items = await Item.find().sort('-createdAt');
    res.render('itemsList',{
        title: 'Items',
        items
    });
});

//Controller to get Item by ID from database
exports.getItemById = catchAsync(async (req,res,next) =>{
    const item = await Item.findById(req.params.id)
    .populate('process_list.process')
    .populate('attached_materials.material')
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.render('items',{
        title: 'Item | ' + item.item_name,
        item
    });
});


/*##########PDF Upload Controllers###########*/

//Multer configuration
const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/drawings');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const multerFilter = (req,file,cb) => {
    //PDF FILES FILTERING
    if(!file.originalname.endsWith('.pdf')){
        return cb(new Error('Please upload a pdf file'),false)
    }
    cb(null, true)
}

upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: multerFilter
});

//Controller to upload pdf to file system
exports.uploadDrawingPdf = upload.single('drawing');

//Controller to save pdf location to database
exports.saveDrawingLocation =catchAsync( async (req,res,next) =>{
    const location = '/drawings/'+req.file.originalname;
    const item = await Item.findById(req.params.id)
    item.drawing_location = location;
    item.drawing_revision_number = item.drawing_revision_number+1;
    await item.save()
    res.json(item)
});

//Controller to remove pdf location from Database
exports.deleteDrawingLocation = catchAsync(async (req,res,next) =>{
    const item = await Item.findById(req.params.id)
    item.drawing_location = undefined;
    await item.save()
    res.json(item)
});


/*##########Image Upload Controllers###########*/

const multerImgStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/items');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const multerImgFilter = (req,file,cb) => {
    //Image FILES FILTERING
    if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
        cb(new Error('Please upload an image!'), false)
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

exports.uploadItemsImage = uploadImg.single('thumbnail');
exports.saveImageLocation = catchAsync(async (req,res,next) =>{
    const location = '/img/items/'+req.file.originalname;
    const item = await Item.findById(req.params.id)
    item.item_thumbnail_location = location;
    await item.save()
    res.json(item)
});

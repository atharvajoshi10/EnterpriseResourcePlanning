//Import Statements to load the models
let Item = require('../models/items.model');
let Process = require('../models/process.model');
let Raw_material = require('../models/raw_material.model');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Controller to get all Items from database
exports.getItems = catchAsync(async (req,res,next) => {
    const items = await Item.find().sort('-createdAt');
    const processes = await Process.find().sort('-createdAt');
    const raw_materials = await Raw_material.find().sort('-createdAt');
    res.render('itemsList',{
        title: 'Items',
        items,
        processes,
        raw_materials
    });
});

//Controller to get Item by ID from database
exports.getItemById = catchAsync(async (req,res,next) =>{
    const item = await Item.findById(req.params.id)
    .populate('process_list.process')
    .populate('attached_materials.material')
    const processList = await Process.find().sort('-createdAt');
    const materialList = await Raw_material.find().sort('-createdAt');
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.render('items',{
        title: 'Item | ' + item.item_name,
        item,
        processList,
        materialList
    });
});

// exports.updateItem = catchAsync(async (req,res,next) =>{
//     const item = await Item.findById(req.params.id)
//     if(!item){
//         return next(new AppError('No Process found with that ID',404));
//     }
//     res.render('editItem',{
//         title: 'Edit Item | ' + item.item_name,
//         item
//     });
// })

// exports.addItem = catchAsync(async (req, res, next) => {
//     res.render('createItem',{
//         title: 'Create new Item',
//         processes,
//         raw_materials
//     });
// });

//API
exports.sortProcessList = catchAsync(async (req,res,next) => {
    const item = await Item.findById(req.params.id).select('process_list');
    const start = req.body.start;
    const end = req.body.end;
    item.process_list.splice(end,0,item.process_list.splice(start,1)[0]);
    await item.save();
});

exports.updateProcessListApi = catchAsync(async (req,res,next) => {
    const item = await Item.updateOne({_id: req.params.id, 'process_list.process': req.body.Id}, {'$set': {
        'process_list.$.scheduled_date': req.body.date,
        'process_list.$.status': req.body.status
    }});
    console.log(item)
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'});
});

exports.appendProcessApi = catchAsync(async (req,res,next) => {
    const item = await Item.updateOne({_id: req.params.id}, {$push: {'process_list': {$each: req.body.process_list}}});
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'});
});

exports.updateProcessApi = catchAsync(async (req,res,next) => {
    const item = await Item.updateOne({_id: req.params.id, 'process_list.process': req.body.oldId}, {'$set': {
        'process_list.$.process': req.body.newId
    }});
    console.log(item)
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'});
})

exports.removeProcessApi = catchAsync(async(req,res,next) => {
    const item = await Item.updateOne({ _id: req.params.id }, { "$pull": { "process_list": { "process": req.body.process_id } }}, { safe: true});
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'})
});

exports.updateItemApi = catchAsync(async (req,res,next) =>{
    const item = await Item.findById(req.params.id);
    if(!item){
        return next(new AppError('No Process found with that ID',404));
    }
    item.item_name = req.body.item_name;
    item.item_id = req.body.item_id;
    item.description = req.body.description;
    item.item_thumbnail_location = req.body.item_thumbnail_location;
    item.username_updated=req.employee.e_username;
    await item.save()
    res.json({status:'success'});
});

exports.addItemApi = catchAsync(async (req,res,next) =>{
    const newItem = new Item({
        ...req.body,
        username_created: req.employee.e_username
    });
    await newItem.save();
    res.json({status:'success'});
});

exports.deleteItemApi = catchAsync(async(req,res,next) => {
    const item = await Item.findByIdAndDelete(req.params.id)
    if(!item){
        return next(new AppError('No Process found with that ID',404));
    }
    res.json({status:'success'});
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
    if(!file.originalname.endsWith('pdf')){
        cb(new AppError('Please upload a pdf file',400),false)
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
exports.getDrawingLocation =catchAsync( async (req,res,next) =>{
    const location = '/drawings/'+req.file.originalname;
    res.json({
        status:'success',
        location: location
    });
});

//Controller to remove pdf location from Database
exports.deleteDrawingLocation = catchAsync(async (req,res,next) =>{
    const item = await Item.updateOne({ _id: req.params.id }, { "$pull": { "drawing_list": { "_id": req.body.drawing_id } }}, { safe: true});
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'})
});

exports.saveDrawingLocation = catchAsync(async (req,res,next) =>{
    const item = await Item.updateOne({_id: req.params.id},{"$push": {"drawing_list": req.body.obj}});
    if(!item){
        return next(new AppError('No Item found with that ID',404));
    }
    res.json({status:'success'})
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
    const location = '/img/items/'+req.file.originalname;
    res.json({
        status:'success',
        location: location
    });
});


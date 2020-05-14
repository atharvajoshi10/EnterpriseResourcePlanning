//Import Statement to load the models
let FinalProduct = require('../models/final_product.model');
const catchAsync = require('../utils/catchAsync');

exports.getFinalProducts = catchAsync(async (req, res, next) => {
    res.render('editraw_material', {
        title: 'Edit'
    });
});

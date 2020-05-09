const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Middleware Function for Authorization
const restrict = catchAsync(async (req,res,next) => {
    // if(!req.employee.role === 'admin'){
    //     return next(new AppError("You don't have permission to perform this action!",403))
    // }
    next()
});

module.exports = restrict;
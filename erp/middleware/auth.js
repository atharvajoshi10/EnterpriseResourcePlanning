const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Middleware Function for Authorization
const auth = catchAsync(async (req,res,next) => {
    //     const token = req.header('Authorization').replace('Bearer ','')
    //     if(!token){
    //         return next(new AppError('You're not logged in. Please login to get access!',401))
    //     }
    //     const decoded = jwt.verify(token,process.env.JWT_SECRET)
    //     //Find user with the correct username who has that authentication token still stored
    //     const employee = await Employee.findOne({e_username:decoded.e_username, 'tokens.token':token})
    //     if(!employee){
    //         return next(new AppError('Token belonging to this user no longer exist!',401))
    //     }
    //     req.employee=employee
    //     req.token=token
    next()
});

module.exports = auth;
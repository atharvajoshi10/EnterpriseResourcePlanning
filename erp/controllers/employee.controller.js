const Employee = require('../models/employee.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Function to signup new employees
exports.signup = catchAsync(async(req,res,next) => {
    const newEmployee = Employee.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            employee: newEmployee
        }
    });
});

//Function to login existing employees
exports.login = catchAsync(async (req, res, next) =>{
    if(!req.body.e_password||!req.body.e_password){
        return next(new AppError('Please enter email and password', 400));
    }
    const employee = await Employee.findByCredentials(req.body.e_username, req.body.e_password);
    if(!employee){
        return next(new AppError('Incorrect email or password', 401));
    }
    const token = await employee.generateAuthToken();
    if(!token){
        return next(new AppError('Problem encountered while generating token', 500));
    }
    res.json({employee,token});
});

//Function to logout existing employees from all devices
exports.logout = catchAsync(async (req,res,next) =>{
    req.employee.tokens = []
    await req.employee.save()
    res.json('Logged out successfully!')
});

//Function to get profile info
exports.profile = catchAsync(async (req,res,next) =>{
    res.json(req.employee)
});

//Function to update profile
exports.updateMe = catchAsync(async (req,res,next) =>{
    const updates = Object.keys(req.body)
    updates.forEach((update) => req.employee[update] = req.body[update])
    await req.employee.save()
    res.send('Employee Updated\n'+req.employee)  
});

//Function to delete profile
exports.deleteMe = catchAsync(async (req,res,next) => {
    await Employee.findByIdAndDelete(req.employee._id)
});
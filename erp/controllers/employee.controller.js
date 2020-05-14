const Employee = require('../models/employee.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//API Controllers
//Function to signup new employees
exports.signupApi = catchAsync(async(req,res,next) => {
    const newEmployee = Employee.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            employee: newEmployee
        }
    });
});

//Function to login existing employees
exports.loginApi = catchAsync(async (req, res, next) =>{
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
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
        //secure: true, For  https
        httpOnly: true
    };
    res.cookie('jwt',token,cookieOptions);
    res.json({status: 'success', employee, token});
});

//Function to logout existing employees from all devices
exports.logoutApi = (req,res,next) =>{
    // req.employee.tokens = []
    // await req.employee.save()
    res.cookie('jwt','LoggedOut',{
        expires: new Date(Date.now() + 1*1000),
        httpOnly: true
    });
    res.status(200).json({status:'success'});
};

//Function to get profile info
exports.profileApi = catchAsync(async (req,res,next) =>{
    res.json(req.employee)
});

//Function to update profile
exports.updateMeApi = catchAsync(async (req,res,next) =>{
    const updates = Object.keys(req.body)
    updates.forEach((update) => req.employee[update] = req.body[update])
    await req.employee.save()
    res.send('Employee Updated\n'+req.employee)  
});

//Function to delete profile
exports.deleteMeApi = catchAsync(async (req,res,next) => {
    await Employee.findByIdAndDelete(req.employee._id)
});

//View Controllers
//Login
exports.login = catchAsync(async (req, res, next) => {
    res.render('login',{
        title: 'Login'
    });
});

//Dashboard
exports.dashboard = catchAsync(async (req, res, next) => {
    res.render('dashboard',{
        title: 'Dashboard'
    });
});


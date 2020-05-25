const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message  = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message,400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message,400);
}

const handleJWTError = (res) => {
    const message = 'Invalid token! Please login again';
    return new AppError(message,401);
}

const handleJWTExpiredError = (res) =>{
    const message = 'Your token has expired! Please login again.';
    return new AppError(message,401);
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error'
    if(err.name === 'CastError') err = handleCastErrorDB(err);
    if(err.code === 11000) err = handleDuplicateFieldsDB(err);
    if(err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if(err.name === 'JsonWebTokenError') err = handleJWTError(res);
    if(err.name === 'TokenExpiredError') err = handleJWTExpiredError(res);
    //Operational Error: Send to Client
    if(err.isOperational){
        console.error(err);
        return res.status(err.statusCode).render('error',{
            title: 'Something went wrong!',
            msg: err.message,
            statusCode: err.statusCode
        });
    }//Programming or other unknown error: don't leak error details    
    else{
        console.error(err);
        return res.status(500).render('error',{
            title: 'Oops! Something went wrong!',
            msg: 'Please try again later',
            statusCode: 'Something went wrong!'
        });
    }
};
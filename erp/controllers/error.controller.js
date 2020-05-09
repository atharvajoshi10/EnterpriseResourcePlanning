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

const handleJWTError = () => {
    const message = 'Invalid token! Please login again';
    return new AppError(message,401);
}

const handleJWTExpiredError = () =>{
    const message = 'Your token has expired! Please login again.';
    return new AppError(message,401);
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error'
    if(err.name === 'CastError') err = handleCastErrorDB(err);
    if(err.code === 11000) err = handleDuplicateFieldsDB(err);
    if(err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if(err.name === 'JsonWebTokenError') err = handleJWTError();
    if(err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    //Operational Error: Send to Client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            error:err,
            message: err.message,
            stack: err.stack,
        });
    }//Programming or other unknown error: don't leak error details    
    else{
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Oops! Something went wrong.'
        });
    }
};
const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message  = `Duplicate field value: value. Please use another value!`;
    return new AppError(message,400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message,400);
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error'
    let error = {...err};
    if(error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error);
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
    //Operational Error: Send to Client
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.status,
            error:error,
            message: error.message,
            stack: error.stack
        });
    }//Programming or other unknown error: don't leak error details    
    else{
        console.error('Error: ',error);
        res.status(500).json({
            status: 'error',
            message: 'Oops! Something went wrong.'
        });
    }
};
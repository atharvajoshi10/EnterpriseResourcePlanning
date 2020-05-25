/*
*Server script for Nodejs. Use nodemon server to start it.
*/

//Dependencies
const path = require('path')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//Depedencies for increasing security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//Error Handling Dependencies
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller')

//Handling Uncaught Exceptions
process.on('uncaughtException',err => {
    console.log('UnCaught Exception');
    console.log(err.name,' : ',err.message);
    console.log('\nClosing Server\nShutting down...')
    process.exit(1); //1: Uncaught Exception
});

//Importing Enviornment File
require('dotenv').config();

//Starting Express server on port 5000
const app = express()
const port = process.env.PORT || 5000;

//Ensuring Cors is used and server parses json files
app.use(cors());
app.use(express.json());
//Parses data from cookies
app.use(cookieParser());

//GLOBAL MIDDLEWARES
//Set security HTTP Headers
app.use(helmet());

//Middleware to for rate limiting
const limiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000,
    message: 'Too many requests from this IP, please try again in an hour'
});
app.use('*',limiter);

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp()); //pass an object to specify whitelist

//Establishing connection with the mongodb cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});


// Setting up Static routes
const publicDirectoryPath = path.join(__dirname,'public');
//Setting up pug engine
const viewPath = [path.join(__dirname,'views'),path.join(__dirname,'views/process'),path.join(__dirname,'views/raw_material'),
                path.join(__dirname,'views/employee'),path.join(__dirname,'views/customer'), path.join(__dirname,'views/order'), 
                path.join(__dirname,'views/machine'), path.join(__dirname,'views/final_product'), path.join(__dirname,'views/items')];
app.set('view engine','pug');
app.set('views',viewPath);

//Importing routes created for views
const itemsRouter = require('./routes/items.routes');
const raw_materialRouter = require('./routes/raw_material.routes');
const processRouter = require('./routes/process.routes');
const employeeRouter = require('./routes/employee.routes');
//const adminRouter = require('./routes/admin.routes');

//Making sure app uses the routes
//Static Routes
app.use(express.static(publicDirectoryPath));
app.get('/', function(req, res) {
    res.render('index.html');
});

//View Routes
app.use('/items',itemsRouter);
app.use('/process',processRouter);
app.use('/raw_material',raw_materialRouter);
app.use('/employee',employeeRouter);
//app.use('/admin/',adminRouter);

//##########Error Handling Routes##########//
//Undefined Routes Error
//Should be placed last!!!!
app.all('*',(req,res,next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

//Global Error Handler
app.use(globalErrorHandler);

//Bind the server to listen on port.
const server = app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});


//Handling Unhandled Promises
process.on('unhandledRejection',err => {
    console.log('Unhandled Rejection:\n');
    console.log(err.name,' : ',err.message);
    server.close(() => {
        console.log('\nClosing Server\nShutting down...')
        process.exit(1); //1: Uncaught Exception
    });   
});

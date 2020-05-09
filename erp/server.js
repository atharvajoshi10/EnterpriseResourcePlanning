/*
*Server script for Nodejs. Use nodemon server to start it.
*/

//Dependencies
const path = require('path')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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
app.use(cors())
app.use(express.json())

//GLOBAL MIDDLEWARES
//Set security HTTP Headers
app.use(helmet());

//Middleware to for rate limiting
const limiter = rateLimit({
    max: 200,
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
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Importing the routes created for api
const processApiRouter = require('./routes/process');
const itemsApiRouter = require('./routes/items');
const customerApiRouter = require('./routes/customer');
const employeeApiRouter = require('./routes/employee');
const raw_materialApiRouter = require('./routes/raw_material');
const finalproductApiRouter = require('./routes/final_product');
const orderApiRouter = require('./routes/order');
const machineApiRouter = require('./routes/machine');

//Importing routes created for views
const viewRouter = require('./routes/view.routes');
//Importing routes created for employee
const employeeRouter = require('./routes/employee.routes');
//Importing routes created for admin
const adminRouter = require('./routes/admin.routes');

//Making sure app uses the routes
//Static Routes
app.use(express.static(publicDirectoryPath));
app.get('/', function(req, res) {
    res.render('index.html');
});

//API Routes
app.use('/api/process',processApiRouter);
app.use('/api/items',itemsApiRouter);
app.use('/api/customer',customerApiRouter);
app.use('/api/employee',employeeApiRouter);
app.use('/api/raw_material',raw_materialApiRouter);
app.use('/api/finalproduct',finalproductApiRouter);
app.use('/api/order',orderApiRouter);
app.use('/api/machine',machineApiRouter);

//View Routes
app.use('/',viewRouter);
app.use('/',employeeRouter);
app.use('/admin/',employeeRouter);

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

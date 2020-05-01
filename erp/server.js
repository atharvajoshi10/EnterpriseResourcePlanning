/*
*Server script for Nodejs. Use nodemon server to start it.
*/

//Dependencies
const path = require('path')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Importing Enviornment File
require('dotenv').config();

//Starting Express server on port 5000
const app = express()
const port = process.env.PORT || 5000;

//Ensuring Cors is used and server parses json files
app.use(cors())
app.use(express.json())


//Establishing connection with the mongodb cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

//Setting up pug engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

//Importing the routes created for the server
const processRouter = require('./routes/process');
const itemsRouter = require('./routes/items');
const customerRouter = require('./routes/customer')
const employeeRouter = require('./routes/employee')
const raw_materialRouter = require('./routes/raw_material')
const finalproductRouter = require('./routes/final_product')
const orderRouter = require('./routes/order')
const machineRouter = require('./routes/machine')

// Setting up Static routes
const publicDirectoryPath = path.join(__dirname,'public')

//Making sure app uses the routes
//Static Routes
app.use(express.static(publicDirectoryPath))
//API Routes

app.use('/process',processRouter);
app.use('/items',itemsRouter);
app.use('/customer',customerRouter);
app.use('/employee',employeeRouter);
app.use('/raw_material',raw_materialRouter);
app.use('/finalproduct',finalproductRouter);
app.use('/order',orderRouter);
app.use('/machine',machineRouter);

//Pug Routes
app.use('/test',(req,res) => {
    res.render('test')
});

//Bind the server to listen on port.
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})

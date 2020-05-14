//Importing the routes created for api
const processApiRouter = require('./routes/process');
const itemsApiRouter = require('./routes/items');
const customerApiRouter = require('./routes/customer');
const employeeApiRouter = require('./routes/employee');
const raw_materialApiRouter = require('./routes/raw_material');
const finalproductApiRouter = require('./routes/final_product');
const orderApiRouter = require('./routes/order');
const machineApiRouter = require('./routes/machine');

//API Routes
app.use('/api/process',processApiRouter);
app.use('/api/items',itemsApiRouter);
app.use('/api/customer',customerApiRouter);
app.use('/api/employee',employeeApiRouter);
app.use('/api/raw_material',raw_materialApiRouter);
app.use('/api/finalproduct',finalproductApiRouter);
app.use('/api/order',orderApiRouter);
app.use('/api/machine',machineApiRouter);
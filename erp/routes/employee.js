//Author - Megh Khaire

//Import Statements to load the models
const router = require('express').Router();
const auth = require('../middleware/auth');
const restrict = require('../middleware/restrict');
let Employee = require('../models/employee.model');

//To access any route localhost:PORT/route...
//Note Make sure JSON response contains the same variable name
//eg for add process , variable `process_name` of the request
//should contain the the process name, any other variable will
//throw an error

//Adding a route to view all Employees
router.get('/viewAll',auth, restrict,(req,res) => {
    Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json('Error:' + err));
});

//Adding a route to login existing employees
router.post('/login', async (req,res) =>{
    try{
        const employee = await Employee.findByCredentials(req.body.e_username, req.body.e_password)
        const token = await employee.generateAuthToken()
        res.json({employee,token})
    }catch(e){
        res.status(400).json('Unable to Login!'+e)
    }
})

//Adding a route to logout existing employees from all devices
router.post('/logout', auth, async (req,res) =>{
    try{
        req.employee.tokens = []
        await req.employee.save()
        res.json('Logged out successfully!')
    }catch(e){
        res.status(500).json('Unable to Logout!'+e)
    }
})

router.get('/me',auth,async (req,res) =>{
    res.json(req.employee)
})

//Adding route to update profile
router.patch('/update/me',auth, async (req,res) =>{
   try{
        const updates = Object.keys(req.body)
        updates.forEach((update) => req.employee[update] = req.body[update])
        await req.employee.save()
        res.send('Employee Updated\n'+req.employee)  
    }
    catch(e){
        res.status(400).json('Something went wrong!'+e)
    }
});

//Adding a route to delete profile
router.delete('/delete/me', auth, (req,res) => {
    try{
        Employee.findByIdAndDelete(req.employee._id)
        .then(employee =>{
            res.send('Employee Deleted!\n'+employee)
        })
    }
    catch(e){
        res.status(500).json('Something went wrong!'+e)
    }
});

//Necessary export statement, do not change
module.exports = router;

//For Super-user

// Adding a route to add a Employee super-user
// router.post('/addEmployee', auth, restric, async (req,res) => {
//     const newEmployee = new Employee(req.body)
//     newEmployee.save()
//     .then(() => res.json('Employee Added'))
//     .catch(err => res.status(400).json('Unable to add Employee' + err));
// });

// Adding route to search by ID
// router.get('/:id', auth, restrict, (req,res) =>{
//     Employee.findById(req.params.id)
//     .then(employee => res.json(employee))
//     .catch(err => res.status(404).json('Invalid Id ' + err));
// });

// Adding route to delete by id
// router.delete('/delete/:id', auth, restrict, (req,res) => {
//     try{
//         Employee.findByIdAndDelete(req.params.id)
//         .then(employee =>{
//             if(!employee){
//                 res.status(404).json('Invalid Id!')
//             }
//             res.json('Employee Deleted!')
//         })
//     }
//     catch(e){
//         res.status(500).json('Something went wrong!'+err)
//     }
// });